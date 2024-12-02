import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const usde = "0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696";
const susde = "0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b";

/**
 * Deploys the YieldDonation contract using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYieldDonation: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
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

  const givvest = await get("Givvest");

  await deploy("YieldDonation", {
    from: deployer,
    // Contract constructor arguments
    args: [usde, susde, givvest.address],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const YieldDonation = await hre.ethers.getContract<Contract>("YieldDonation", deployer);
  console.log("YieldDonation deployed to:", await YieldDonation.getAddress());
};

export default deployYieldDonation;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YieldDonation
deployYieldDonation.tags = ["YieldDonation"];
