// SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;
pragma experimental ABIEncoderV2;

contract Lucky7Escrow {
    struct Lucky7Number {
        string prng;
        string wrappedNumberEnvelope;
        string wrappedNumberValue;
        string testimony1Envelope;
        string testimony1Value;
        string testimony2Envelope;
        string testimony2Value;
    }

    mapping(address => mapping(uint256 => Lucky7Number))
        public AddressToLucky7Number;
    mapping(address => uint256) public AddressToNumberCounter;

    event AskForNumber1(address indexed owner, uint256 counter);
    event AskForNumber2(address indexed owner, uint256 counter);

    function askForNumber(string memory wrappedNumberEnvelope)
        public
        payable
        returns (uint256)
    {
        //        require(msg.value == 1 ether, "is not 1 ether");
        uint256 addressCounter = AddressToNumberCounter[msg.sender];
        AddressToLucky7Number[msg.sender][addressCounter]
            .wrappedNumberEnvelope = wrappedNumberEnvelope;
        AddressToNumberCounter[msg.sender] = addressCounter + 1;
        emit AskForNumber1(msg.sender, addressCounter);
        emit AskForNumber2(msg.sender, addressCounter);
        return addressCounter;
    }

  function publishTestimony(string memory testimony, address l7nOwner, uint l7nIndex){
    Lucky7Number storedL7N =  AddressToLucky7Number[l7nOwner][l7nIndex];
    require(storedL7N.testimony1Envelope||)
  }

    function getLucky7Number(address _owner, uint256 lucky7NumberIndex)
        public
        view
        returns (Lucky7Number memory)
    {
        return AddressToLucky7Number[_owner][lucky7NumberIndex];
    }
}
