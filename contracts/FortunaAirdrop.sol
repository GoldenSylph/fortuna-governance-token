// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./interfaces/IMintable.sol";

contract FortunaAirdrop is Ownable {
    error AlreadyClaimed(address);
    error ProofIsNotValid(address, bytes32);
    error CannotBeZeroBytes32();
    error CannotBeZeroAddress();

    event MerkleRootChanged(bytes32 indexed oldRoot, bytes32 indexed newRoot);
    event NewClaimingTokenSet(
        address indexed oldToken,
        address indexed newToken
    );

    IMintable public token;
    bytes32 public merkleRoot;

    mapping(address user => bool isClaimed) public claimed;

    constructor(address admin, address _token, bytes32 _merkleRoot) Ownable(admin) {
        token = IMintable(_token);
        merkleRoot = _merkleRoot;
    }

    function setNewMerkleRoot(bytes32 _newRoot) external onlyOwner {
        if (_newRoot == bytes32(0)) {
            revert CannotBeZeroBytes32();
        }
        emit MerkleRootChanged(merkleRoot, _newRoot);
        merkleRoot = _newRoot;
    }

    function setNewToken(address _newToken) external onlyOwner {
        if (_newToken == address(0)) {
            revert CannotBeZeroAddress();
        }
        emit NewClaimingTokenSet(address(token), _newToken);
        token = IMintable(_newToken);
    }

    function setClaimed(address who, bool status) external onlyOwner {
        claimed[who] = status;
    }

    function claim(
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) external {
        if (claimed[account]) revert AlreadyClaimed(account);
        bytes32 leaf = keccak256(
            abi.encodePacked(keccak256(abi.encode(account, amount)))
        );
        bool isValidProof = MerkleProof.verify(merkleProof, merkleRoot, leaf);
        if (!isValidProof) revert ProofIsNotValid(account, leaf);
        claimed[account] = true;
        token.mint(account, amount);
    }
}
