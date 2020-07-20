// SPDX-License-Identifier: MIT
pragma solidity ^0.6.11;

contract TestContract {
  string x = '';
    function set(string memory _newValue) public{
      x = _newValue;
    }

  function get() public returns (string memory){
    return x;
  }
}
