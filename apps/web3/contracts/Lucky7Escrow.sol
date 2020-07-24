// SPDX-License-Identifier: MIT
pragma solidity ^0.6.11;

contract Lucky7Escrow {
  uint public x = 0;
    function set(uint _newValue) public{
      x = _newValue;
    }

  function get() public view returns (uint){
    return x;
  }
}
