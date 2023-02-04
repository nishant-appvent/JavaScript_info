// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract nftContract is Ownable, ERC1155 {
    string public name;

    constructor(string memory _name,string memory _uri)
        ERC1155(_uri)
    {   
        name = _name;
    }
    
    function setURI(string memory _newuri) public onlyOwner {
        _setURI(_newuri);
    }

    function mintBatch(uint256[] memory ids, uint256[] memory amounts)
        public
        onlyOwner
    {
        _mintBatch(msg.sender, ids, amounts, '');
    }
}
