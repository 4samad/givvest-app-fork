// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IGivvestCause {
    function raiseAmount(uint256 tokenId, uint256 amount) external;
    function getFundraiser(uint256 tokenId) external view returns (address);
}

interface IGivvestCoin {
    function mint(address to, uint256 amount) external;
}

interface IUSDe is IERC20 {
    function decimals() external view returns (uint8);
}

/**
 * @title Givvest
 * @dev Main contract for the Givvest platform, which allows users to donate USDe to causes and receive NFT representations of their donations.
 */
contract Givvest is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    using SafeERC20 for IERC20;

    IGivvestCause public givvestCauseContract;
    IGivvestCoin public givvestCoinContract;
    IUSDe public usdeToken;

    struct DonationNFT {
        uint256 amount;
        uint256 causeId;
        bool listedForRedemption;
    }

    uint256 public tokenCount;

    // Mapping from token ID to DonationNFT
    mapping(uint256 => DonationNFT) public donationNFTs;

    // Mapping from token ID to permanence status
    mapping(uint256 => bool) public isPermanent;

    // Mapping of authorized yield processors
    mapping(address => bool) public authorizedYieldProcessors;

    // Events for logging important actions
    event DonationMinted(
        address indexed donor,
        uint256 tokenId,
        uint256 amount,
        uint256 causeId
    );
    event DonationPermanent(
        address indexed donor,
        uint256 tokenId,
        uint256 amount
    );
    event DonationListed(address indexed donor, uint256 tokenId);
    event YieldDonation(
        address indexed donor,
        uint256 tokenId,
        uint256 amount,
        uint256 causeId
    );
    event YieldProcessorUpdated(address processor, bool authorized);

    modifier onlyDonor(uint256 tokenId) {
        require(msg.sender == ownerOf(tokenId), "Not the donor");
        _;
    }

    modifier notPermanentNFT(uint256 tokenId) {
        require(!isPermanent[tokenId], "It is a permanent Donation");
        _;
    }

    /**
     * @dev Initializes the contract with the given addresses.
     */
    constructor(
        address initialOwner,
        address givvestCoinAddress,
        address givvestCauseAddress,
        address usdeAddress
    ) ERC721("GivvestNFT", "GVNFT") Ownable(initialOwner) {
        givvestCauseContract = IGivvestCause(givvestCauseAddress);
        givvestCoinContract = IGivvestCoin(givvestCoinAddress);
        usdeToken = IUSDe(usdeAddress);
    }

    /**
     * @notice Set or revoke a yield processor's authorization
     * @param processor Address of the yield processor
     * @param authorized True to authorize, false to revoke
     */
    function setYieldProcessor(address processor, bool authorized) external onlyOwner {
        require(processor != address(0), "Invalid processor address");
        authorizedYieldProcessors[processor] = authorized;
        emit YieldProcessorUpdated(processor, authorized);
    }

    /**
     * @dev Internal function to mint a new DonationNFT.
     */
    function _mintDonationNFT(uint256 amount, uint256 causeId) internal {
        uint256 tokenId = tokenCount++;
        _safeMint(msg.sender, tokenId);

        donationNFTs[tokenId] = DonationNFT({
            amount: amount,
            causeId: causeId,
            listedForRedemption: false
        });

        emit DonationMinted(msg.sender, tokenId, amount, causeId);
    }

    /**
     * @notice Donate USDe to a specific cause and receive a DonationNFT.
     */
    function donateToCause(uint256 amount, uint256 causeId) public {
        require(amount > 0, "Amount must be greater than 0");

        try givvestCauseContract.raiseAmount(causeId, amount) {
            // Transfer USDe from donor to fundraiser
            address fundraiser = givvestCauseContract.getFundraiser(causeId);
            IERC20(address(usdeToken)).safeTransferFrom(msg.sender, fundraiser, amount);
            
            // Mint donation NFT
            _mintDonationNFT(amount, causeId);
        } catch Error(string memory reason) {
            revert(reason);
        } catch (bytes memory lowLevelData) {
            revert(
                string(
                    abi.encodePacked(
                        "An unknown error occurred: ",
                        lowLevelData
                    )
                )
            );
        }
    }

    /**
     * @notice Donate USDe to an existing DonationNFT.
     */
    function donateToDonationNFT(
        uint256 amount,
        uint256 tokenId
    ) public notPermanentNFT(tokenId) {
        require(amount > 0, "Amount must be greater than 0");
        require(
            amount <= donationNFTs[tokenId].amount,
            "Donation amount is more than needed"
        );

        // Transfer USDe from new donor to original donor
        address originalDonor = ownerOf(tokenId);
        IERC20(address(usdeToken)).safeTransferFrom(msg.sender, originalDonor, amount);

        // Update original NFT amount and mint new NFT
        donationNFTs[tokenId].amount -= amount;
        _mintDonationNFT(amount, donationNFTs[tokenId].causeId);
    }

    /**
     * @notice Process a yield donation from authorized yield processors
     */
    function processYieldDonation(
        address donor,
        uint256 amount,
        uint256 causeId
    ) external {
        require(authorizedYieldProcessors[msg.sender], "Unauthorized yield processor");
        require(amount > 0, "Amount must be greater than 0");

        // Transfer USDe from sender to fundraiser
        address fundraiser = givvestCauseContract.getFundraiser(causeId);
        IERC20(address(usdeToken)).safeTransferFrom(msg.sender, fundraiser, amount);

        // Mint permanent NFT for yield donation
        uint256 tokenId = tokenCount++;
        _safeMint(donor, tokenId);

        donationNFTs[tokenId] = DonationNFT({
            amount: amount,
            causeId: causeId,
            listedForRedemption: false
        });

        // Make it permanent immediately
        isPermanent[tokenId] = true;

        emit YieldDonation(donor, tokenId, amount, causeId);
    }

    /**
     * @notice List a DonationNFT for redemption.
     */
    function listForRedemption(
        uint256 tokenId
    ) public onlyDonor(tokenId) notPermanentNFT(tokenId) {
        donationNFTs[tokenId].listedForRedemption = true;
        emit DonationListed(msg.sender, tokenId);
    }

    /**
     * @notice Make a DonationNFT permanent.
     */
    function makeDonationPermanent(
        uint256 tokenId
    ) public onlyDonor(tokenId) notPermanentNFT(tokenId) {
        donationNFTs[tokenId].listedForRedemption = false;
        isPermanent[tokenId] = true;
        givvestCoinContract.mint(msg.sender, donationNFTs[tokenId].amount);
        emit DonationPermanent(
            msg.sender,
            tokenId,
            donationNFTs[tokenId].amount
        );
    }

    // Required overrides for ERC721Enumerable
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}