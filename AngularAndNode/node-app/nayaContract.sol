// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract nayaContract is Ownable, ERC1155 {
   
    string public name;
    address public Owner;
    
    constructor(address _owner,string memory _uri,uint256[] memory ids,uint256[] memory amounts) ERC1155(_uri){   
        name='Appvent Bulk Deploy Collection';
        Owner = _owner;
        _mintBatch(Owner, ids, amounts, '');
    }

}
