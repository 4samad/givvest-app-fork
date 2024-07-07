// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IGivvestCause {
    /**
     * @notice Raise a specific amount for a cause identified by the tokenId.
     * @param tokenId The ID of the cause token.
     * @param amount The amount to raise for the cause.
     */
    function raiseAmount(uint256 tokenId, uint256 amount) external;

    /**
     * @notice Get the address of the fundraiser associated with a cause token.
     * @param tokenId The ID of the cause token.
     * @return The address of the fundraiser.
     */
    function getFundraiser(uint256 tokenId) external view returns (address);
}

interface IGivvestCoin {
    /**
     * @notice Mint Givvest coins to a specified address.
     * @param to The address to receive the minted coins.
     * @param amount The amount of coins to mint.
     */
    function mint(address to, uint256 amount) external;
}

/**
 * @title Givvest
 * @dev Main contract for the Givvest platform, which allows users to donate to causes and receive NFT representations of their donations.
 */
contract Givvest is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {

    IGivvestCause public givvestCauseContract;
    IGivvestCoin public givvestCoinContract;

    struct DonationNFT {
        uint256 amount;
        uint256 causeId;
        bool listedForRedemption;
    }

    uint256 private _nextTokenId;

    // Mapping from token ID to DonationNFT
    mapping(uint256 => DonationNFT) public donationNFTs;

    // Mapping from token ID to permanence status
    mapping(uint256 => bool) public isPermanent;

    // Events for logging important actions
    event DonationMinted(address indexed donor, uint256 tokenId, uint256 amount, uint256 causeId);
    event DonationPermanent(address indexed donor, uint256 tokenId, uint256 amount);
    event DonationListed(address indexed donor, uint256 tokenId);

    modifier onlyDonor(uint256 tokenId) {
        require(msg.sender == ownerOf(tokenId), "Not the donor");
        _;
    }

    modifier notPermanentNFT(uint256 tokenId) {
        require(!isPermanent[tokenId], "It is a permanent Donation");
        _;
    }

    modifier notZeroValue() {
        require(msg.value > 0, "Donation must be greater than zero");
        _;
    }

    /**
     * @dev Initializes the contract with the given addresses.
     * @param initialOwner The address of the initial owner.
     * @param givvestCoinAddress The address of the GivvestCoin contract.
     * @param givvestCauseAddress The address of the GivvestCause contract.
     */
    constructor(address initialOwner, address givvestCoinAddress, address givvestCauseAddress)
        ERC721("GivvestNFT", "GVNFT")
        Ownable(initialOwner)
    {
        givvestCauseContract = IGivvestCause(givvestCauseAddress);
        givvestCoinContract = IGivvestCoin(givvestCoinAddress);
    }

    /**
     * @dev Internal function to mint a new DonationNFT.
     * @param causeId The ID of the cause associated with the donation.
     */
    function _mintDonationNFT(uint256 causeId) internal {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        donationNFTs[tokenId] = DonationNFT({
            amount: msg.value,
            causeId: causeId,
            listedForRedemption: false
        });

        emit DonationMinted(msg.sender, tokenId, msg.value, causeId);
    }

    /**
     * @notice Donate to a specific cause and receive a DonationNFT.
     * @param causeId The ID of the cause to donate to.
     */
    function donateToCause(uint256 causeId) public payable notZeroValue {
        // Check
        try givvestCauseContract.raiseAmount(causeId, msg.value) {
            // Effects
            _mintDonationNFT(causeId);
            
            // Interactions
            address payable fundraiser = payable(givvestCauseContract.getFundraiser(causeId));
            (bool success, ) = fundraiser.call{value: msg.value}("");
            require(success, "Fund transfer failed");
        } catch Error(string memory reason) {
            revert(reason);
        } catch (bytes memory lowLevelData) {
            revert(string(abi.encodePacked("An unknown error occurred: ", lowLevelData)));
        }
    }

    /**
     * @notice Donate to an existing DonationNFT.
     * @param tokenId The ID of the DonationNFT to donate to.
     */
    function donateToDonationNFT(uint256 tokenId) public payable notZeroValue notPermanentNFT(tokenId) {
        // Check
        require(msg.value <= donationNFTs[tokenId].amount, "Donation amount is more than needed");
        
        // Effects
        donationNFTs[tokenId].amount -= msg.value;
        _mintDonationNFT(donationNFTs[tokenId].causeId);

        // Interactions
        address payable originalDonor = payable(ownerOf(tokenId));
        (bool success, ) = originalDonor.call{value: msg.value}("");
        require(success, "Transfer to donor failed");
    }

    /**
     * @notice List a DonationNFT for redemption.
     * @param tokenId The ID of the DonationNFT to list for redemption.
     */
    function listForRedemption(uint256 tokenId) public onlyDonor(tokenId) notPermanentNFT(tokenId) {
        donationNFTs[tokenId].listedForRedemption = true;
        emit DonationListed(msg.sender, tokenId);
    }

    /**
     * @notice Make a DonationNFT permanent.
     * @param tokenId The ID of the DonationNFT to make permanent.
     */
    function makeDonationPermanent(uint256 tokenId) public onlyDonor(tokenId) notPermanentNFT(tokenId) {
        donationNFTs[tokenId].listedForRedemption = false;
        isPermanent[tokenId] = true;
        givvestCoinContract.mint(msg.sender, donationNFTs[tokenId].amount);
        emit DonationPermanent(msg.sender, tokenId, donationNFTs[tokenId].amount);
    }

    /**
     * @dev Override for `_update` function to ensure compatibility with multiple inheritance.
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    /**
     * @dev Override for `_increaseBalance` function to ensure compatibility with multiple inheritance.
     */
    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    /**
     * @dev Override for `supportsInterface` function to ensure compatibility with multiple inheritance.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}