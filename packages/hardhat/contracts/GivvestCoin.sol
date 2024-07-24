// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title GivvestCoin
 * @dev ERC20 token for the Givvest platform that is received through tasks like making DonationNFTs permanent and can be used for governance.
 */
contract GivvestCoin is ERC20, ERC20Burnable, AccessControl, ERC20Permit {
	bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

	// Events for logging important actions
	event TokensMinted(address indexed to, uint256 amount);
	event MinterRoleGranted(address indexed account);
	event OwnershipTransferred(
		address indexed previousOwner,
		address indexed newOwner
	);

	/**
	 * @dev Constructor that initializes the contract with initial supply and grants roles to the initial owner.
	 * @param initialOwner The address of the initial owner.
	 * @param initialSupply The initial supply of tokens.
	 */
	constructor(
		address initialOwner,
		uint256 initialSupply
	) ERC20("GivvestCoin", "GVC") ERC20Permit("GivvestCoin") {
		_mint(initialOwner, initialSupply);
		_grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
		_grantRole(MINTER_ROLE, initialOwner);
	}

	/**
	 * @notice Mint new tokens.
	 * @param to The address to receive the minted tokens.
	 * @param amount The amount of tokens to mint.
	 *
	 * Requirements:
	 * - The caller must have the `MINTER_ROLE`.
	 */
	function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
		_mint(to, amount);
		emit TokensMinted(to, amount);
	}

	/**
	 * @notice Grant the minter role to an address.
	 * @param minter The address to be granted the minter role.
	 *
	 * Requirements:
	 * - The caller must have the `DEFAULT_ADMIN_ROLE`.
	 */
	function grantMinterRole(
		address minter
	) public onlyRole(DEFAULT_ADMIN_ROLE) {
		_grantRole(MINTER_ROLE, minter);
		emit MinterRoleGranted(minter);
	}

	/**
	 * @notice Change the ownership of the contract to a new address.
	 * @param to The address of the new owner.
	 *
	 * Requirements:
	 * - The caller must have the `DEFAULT_ADMIN_ROLE`.
	 */
	function changeOwnership(address to) public onlyRole(DEFAULT_ADMIN_ROLE) {
		address previousOwner = msg.sender;
		_grantRole(DEFAULT_ADMIN_ROLE, to);
		_revokeRole(DEFAULT_ADMIN_ROLE, previousOwner);
		emit OwnershipTransferred(previousOwner, to);
	}
}
