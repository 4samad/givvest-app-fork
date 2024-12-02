import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const usdeAddress = "0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696";

/**
 * Deploys the Givvest contract using the deployer account and
 * constructor arguments set to the deployer address, GivvestCoin address, and GivvestCause address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployGivvest: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  console.log("deployer: ", deployer);
  const { deploy, get } = hre.deployments;
  const ethers = hre.ethers;

  const givvestCoin = await get("GivvestCoin");
  const givvestCause = await get("GivvestCause");

  await deploy("Givvest", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, givvestCoin.address, givvestCause.address, usdeAddress],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const givvest = await ethers.getContract<Contract>("Givvest", deployer);
  console.log("Givvest deployed to:", await givvest.getAddress());

  // Grant GIVVEST_ROLE to Givvest contract
  const givvestCauseContract = await ethers.getContractAt("GivvestCause", givvestCause.address);
  await givvestCauseContract.grantGivvestRole(givvest.getAddress());
  console.log(`GIVVEST_ROLE granted to Givvest Cause contract at: ${await givvestCauseContract.getAddress()}`);

  // Grant MINTER_ROLE to Givvest contract
  const givvestCoinContract = await ethers.getContractAt("GivvestCoin", givvestCoin.address);
  await givvestCoinContract.grantMinterRole(givvest.getAddress());
  console.log(`MINTER_ROLE granted to Givvest Coin contract at: ${await givvestCoinContract.getAddress()}`);
};

export default deployGivvest;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags Givvest
deployGivvest.tags = ["Givvest"];
