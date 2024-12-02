// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ISUSDe {
    function deposit(uint256 assets, address receiver) external returns (uint256 shares);
    function cooldownAssets(uint256 assets) external;
    function unstake(address receiver) external;
    function convertToAssets(uint256 shares) external view returns (uint256);
    function cooldownDuration() external view returns (uint256);
}

interface IGivvest {
    function processYieldDonation(address donor, uint256 amount, uint256 causeId) external;
}

contract YieldDonation is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    struct Stake {
        uint256 depositAmount;    // Original USDe amount
        uint256 shares;           // sUSDe shares
        uint256 cooldownEnd;      // When cooldown ends
        bool cooldownStarted;     // If cooldown has started
    }

    IERC20 public immutable usde;
    ISUSDe public immutable susde;
    IGivvest public immutable givvest;

    mapping(address => Stake) public stakes;

    event Deposited(address indexed user, uint256 amount);
    event CooldownStarted(address indexed user, uint256 cooldownEnd);
    event Withdrawn(address indexed user, uint256 depositAmount, uint256 yieldAmount, uint256 causeId);

    constructor(address _usde, address _susde, address _givvest) Ownable(msg.sender) {
        usde = IERC20(_usde);
        susde = ISUSDe(_susde);
        givvest = IGivvest(_givvest);
        
        // Approve sUSDe to use USDe
        IERC20(_usde).safeIncreaseAllowance(_susde, type(uint256).max);
    }

    function deposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(stakes[msg.sender].depositAmount == 0, "Already have a stake");

        // Transfer USDe from user
        usde.safeTransferFrom(msg.sender, address(this), amount);

        // Stake USDe for sUSDe
        uint256 shares = susde.deposit(amount, address(this));

        // Record stake
        stakes[msg.sender] = Stake({
            depositAmount: amount,
            shares: shares,
            cooldownEnd: 0,
            cooldownStarted: false
        });

        emit Deposited(msg.sender, amount);
    }

    function startCooldown() external nonReentrant {
        Stake storage stake = stakes[msg.sender];
        require(stake.depositAmount > 0, "No stake found");
        require(!stake.cooldownStarted, "Cooldown already started");

        // Start cooldown in sUSDe
        uint256 assets = susde.convertToAssets(stake.shares);
        susde.cooldownAssets(assets);

        // Update stake
        stake.cooldownStarted = true;
        stake.cooldownEnd = block.timestamp + susde.cooldownDuration();

        emit CooldownStarted(msg.sender, stake.cooldownEnd);
    }

    function withdrawAndDonate(uint256 causeId) external nonReentrant {
        Stake storage stake = stakes[msg.sender];
        require(stake.cooldownStarted, "Cooldown not started");
        require(block.timestamp >= stake.cooldownEnd, "Cooldown not finished");

        // Calculate amounts
        uint256 totalAssets = susde.convertToAssets(stake.shares);
        uint256 yieldAmount = 0;
        
        if (totalAssets > stake.depositAmount) {
            yieldAmount = totalAssets - stake.depositAmount;
        }

        // Unstake
        susde.unstake(address(this));

        // Return original deposit
        usde.safeTransfer(msg.sender, stake.depositAmount);

        // Donate yield if any
        if (yieldAmount > 0) {
            usde.safeIncreaseAllowance(address(givvest), yieldAmount);
            givvest.processYieldDonation(msg.sender, yieldAmount, causeId);
            usde.safeDecreaseAllowance(address(givvest), yieldAmount);
        }

        emit Withdrawn(msg.sender, stake.depositAmount, yieldAmount, causeId);

        // Clear stake
        delete stakes[msg.sender];
    }

    function getStakeInfo(address user) external view returns (
        uint256 depositAmount,
        uint256 currentValue,
        uint256 yieldAmount,
        bool cooldownStarted,
        uint256 cooldownEnd
    ) {
        Stake storage stake = stakes[user];
        depositAmount = stake.depositAmount;
        if (depositAmount > 0) {
            currentValue = susde.convertToAssets(stake.shares);
            yieldAmount = currentValue > depositAmount ? currentValue - depositAmount : 0;
            cooldownStarted = stake.cooldownStarted;
            cooldownEnd = stake.cooldownEnd;
        }
    }
}