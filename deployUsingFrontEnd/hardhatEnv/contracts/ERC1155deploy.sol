
    // SPDX-License-Identifier: MIT
    pragma solidity >=0.4.22 <0.9.0;

    import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
    import '@openzeppelin/contracts/access/Ownable.sol';

    contract ERC1155deploy is Ownable, ERC1155 {
        // Base URI
        string public name;

        constructor(string memory _baseUri, string memory _collectionName) ERC1155(_baseUri) {
            setName(_collectionName);
        }

        function setName(string memory _name) public onlyOwner {
            name = _name;
        }

        function mintBatch(uint256[] memory ids, uint256[] memory amounts) public onlyOwner{
            _mintBatch(msg.sender, ids, amounts, '');
        }

        // function setURI(string memory _newuri) public onlyOwner {
        //     _setURI(_newuri);
        // }

        // function mint(uint256 id, uint256 amount) public onlyOwner {
        //     _mint(msg.sender, id, amount, '');
        // }
    }
