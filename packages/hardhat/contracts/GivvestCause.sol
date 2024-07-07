// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title GivvestCause
 * @dev Contract for managing fundraising causes using NFTs.
 */
contract GivvestCause is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, AccessControl {
    struct Cause {
        address fundraiser;
        uint256 amountNeeded;
        uint256 amountRaised;
        bool isActive;
    }

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant GIVVEST_ROLE = keccak256("GIVVEST_ROLE");
    uint256 private _nextTokenId;

    // Mapping from token ID to Cause details
    mapping(uint256 => Cause) public causes;

    // Events for logging important actions
    event CauseMinted(uint256 tokenId, address fundraiser, uint256 amountNeeded);
    event AmountRaised(uint256 tokenId, uint256 amount);
    event CauseStateToggled(uint256 tokenId, bool isActive);
    event OwnershipChanged(address newOwner);

    /**
     * @dev Initializes the contract, setting up roles.
     * @param initialOwner The address of the initial owner.
     */
    constructor(address initialOwner)
        ERC721("GivvestCause", "GCOS")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
        _grantRole(MINTER_ROLE, initialOwner);
    }

    /**
     * @notice Safely mint a new token with cause details.
     * @param uri The URI of the token metadata.
     * @param fundraiser The address of the fundraiser.
     * @param amountNeeded The amount needed for the cause.
     */
    function safeMint(string memory uri, address fundraiser, uint256 amountNeeded) public onlyRole(MINTER_ROLE) {
        require(amountNeeded > 0, "Amount needed must be greater than zero");
        require(fundraiser != address(0), "Invalid fundraiser address");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        causes[tokenId] = Cause({
            fundraiser: fundraiser,
            amountNeeded: amountNeeded,
            amountRaised: 0,
            isActive: true
        });

        emit CauseMinted(tokenId, fundraiser, amountNeeded);
    }

    /**
     * @notice Raise an amount for a specific cause.
     * @param tokenId The ID of the cause token.
     * @param amount The amount to raise.
     */
    function raiseAmount(uint256 tokenId, uint256 amount) public onlyRole(GIVVEST_ROLE) {
        Cause storage cause = causes[tokenId];
        require(cause.isActive, "Cause is not actively fundraising");
        require(cause.amountRaised + amount <= cause.amountNeeded, "Amount is more than needed");
        cause.amountRaised += amount;
        if (cause.amountRaised == cause.amountNeeded) {
            cause.isActive = false;
        }

        emit AmountRaised(tokenId, amount);
    }

    /**
     * @notice Toggle the active state of a cause.
     * @param tokenId The ID of the cause token.
     */
    function toggleCauseState(uint256 tokenId) public {
        Cause storage cause = causes[tokenId];
        require(cause.isActive || cause.amountRaised < cause.amountNeeded, "Fundraising is already complete");
        require(cause.fundraiser == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not permitted");
        cause.isActive = !cause.isActive;

        emit CauseStateToggled(tokenId, cause.isActive);
    }

    /**
     * @notice Get the address of the fundraiser for a specific cause.
     * @param tokenId The ID of the cause token.
     * @return The address of the fundraiser.
     */
    function getFundraiser(uint256 tokenId) public view returns (address) {
        return causes[tokenId].fundraiser;
    }

    /**
     * @notice Grant the minter role to an address.
     * @param minter The address to be granted the minter role.
     */
    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
    }

    /**
     * @notice Grant the Givvest role to a contract address.
     * @param givvestContract The contract address to be granted the GIVVEST_ROLE.
     */
    function grantGivvestRole(address givvestContract) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(GIVVEST_ROLE, givvestContract);
    }

    /**
     * @notice Change the ownership of the contract to a new address.
     * @param to The address of the new owner.
     */
    function changeOwnership(address to) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DEFAULT_ADMIN_ROLE, to);
        _revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);

        emit OwnershipChanged(to);
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
     * @notice Get the token URI for a specific token ID.
     * @param tokenId The ID of the token.
     * @return The token URI.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Override for `supportsInterface` function to ensure compatibility with multiple inheritance.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
