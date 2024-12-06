// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.7;

contract HelloWorld {
  string strVal = "Hello World";

// internal external private public
// view
  function sayHello() public view returns(string memory) {
    return addinfo(strVal);
  }

  function setHelloWorld(string memory newString) public {
    strVal = newString;
  }

  function addinfo(string memory helloWorldStr) internal pure returns(string memory) {
    return string.concat(helloWorldStr,'from iron contract');
  }
}