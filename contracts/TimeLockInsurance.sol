// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract TimeLockInsurance {
    // 状态变量
    mapping(address => uint256) public userDeposits;
    uint256 public constant MIN_DEPOSIT = 1 ether;
    uint256 public constant CLAIM_THRESHOLD = 2000 * 1e18; // 2000 USD
    
    AggregatorV3Interface public ethUsdFeed;
    address public insurer;
    uint256 public immutable lockEndTime;
    
    // 事件
    event DepositMade(address indexed user, uint256 amount);
    event ClaimProcessed(address indexed user, uint256 payout);
    event RefundIssued(address indexed user, uint256 amount);

    // 修饰器
    modifier onlyInsurer() {
        require(msg.sender == insurer, "Unauthorized");
        _;
    }

    constructor(address _dataFeed, uint256 _lockDuration) {
        ethUsdFeed = AggregatorV3Interface(_dataFeed);
        insurer = msg.sender;
        lockEndTime = block.timestamp + _lockDuration;
    }

    // 存款功能
    function deposit() external payable {
        require(block.timestamp < lockEndTime, "Deposit period closed");
        require(msg.value >= MIN_DEPOSIT, "Below minimum deposit");
        require(convertToUsd(msg.value) >= 100 * 1e18, "Deposit < $100"); // 最低$100
        
        userDeposits[msg.sender] += msg.value;
        emit DepositMade(msg.sender, msg.value);
    }

    // 索赔功能
    function claim() external {
        require(block.timestamp >= lockEndTime, "Lock period active");
        
        uint256 ethPrice = getEthPrice();
        uint256 depositValue = convertToUsd(userDeposits[msg.sender]);
        
        if(depositValue >= CLAIM_THRESHOLD) {
            _processPayout(msg.sender, userDeposits[msg.sender] * 120 / 100); // 20%奖励
            emit ClaimProcessed(msg.sender, userDeposits[msg.sender]);
        } else {
            _processRefund(msg.sender);
            emit RefundIssued(msg.sender, userDeposits[msg.sender]);
        }
    }

    // 内部函数
    function _processPayout(address user, uint256 amount) private {
        (bool success, ) = user.call{value: amount}("");
        require(success, "Payout failed");
        userDeposits[user] = 0;
    }

    function _processRefund(address user) private {
        uint256 amount = userDeposits[user];
        (bool success, ) = user.call{value: amount}("");
        require(success, "Refund failed");
        userDeposits[user] = 0;
    }

    // 工具函数
    function getEthPrice() public view returns(uint256) {
        (,int price,,,) = ethUsdFeed.latestRoundData();
        return uint256(price) * 1e10; // 转换为18位精度
    }

    function convertToUsd(uint256 ethAmount) public view returns(uint256) {
        return (ethAmount * getEthPrice()) / 1e18;
    }
}