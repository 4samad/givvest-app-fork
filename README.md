
  <br>

# Givvest App

Givvest is a fundraising platform that leverages NFTs to transform charitable donations into assets, ensuring both philanthropic impact and personal financial security.

## How it works

### Core Features

1. **Dynamic Donation NFTs**
  - When you donate to a cause, you receive a Donation NFT
  - This NFT represents your contribution and can be redeemed later if needed
  - Each NFT tracks the original cause and donation amount

2. **Safety Net Mechanism**
  - If a donor faces financial difficulties, they can list their Donation NFT for redemption
  - New donors can choose to take over existing donations
  - When this happens, the original donor receives their funds back, and the new donor gets a fresh Donation NFT

3. **Permanent Donations & Governance**
  - Donors can choose to make their donations permanent
  - Converting to permanent status earns Givvest Coins
  - These coins grant voting rights in platform governance

### New Feature: Yield Donation

We've introduced a new way to support causes through yield donations:

1. **Stake USDe**
  - Deposit USDe (Ethena's stablecoin) into the protocol
  - Your deposit earns yield through Ethena's staking mechanism

2. **Earn While Giving**
  - Your initial deposit remains secure and can be withdrawn
  - The yield generated is automatically donated to your chosen cause
  - Start with as little as 1 USDe

3. **Flexible Control**
  - Choose any active cause for your yield donations
  - Track your total contributions and impact

### Benefits

- **Risk-Free Giving**: Support causes without compromising your financial security
- **Sustainable Impact**: Generate continuous donations through yield
- **Community Governance**: Shape the platform's future through permanent donations
- **Transparent Tracking**: Monitor your contributions and their impact in real-time

### Technical Features

- Built on Ethereum using ERC721 for Donation NFTs
- Integration with Ethena protocol for yield generation

---

## How to set up

1. Clone this repo & ```yarn install```
2. copy .env.example to .env and fill in your details in both ```packages/hardhat``` and ```packages/nextjs```.
2. deploy contract to your desired network using ```yarn deploy --network <network_name>```
3. run ```yarn start``` to start the nextjs app at ```localhost:3000```.
4. go to ```localhost:3000/debug``` to see the contracts debug page. Go to Givvest contract and add the Yield Donation contract address to authorized yield processors. (temp workaround, will fix soon).
5. connect your wallet to the app and start using it! 🎉
  
---


⚙️ Built using [**Scaffold-ETH 2**]() NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

  

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.

- 🪝 **Custom hooks**: Collection of React hooks around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with Typescript autocompletion.

- 🧱 **Components**: Common web3 components to quickly build your frontend.

- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.

- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

  

![Debug Contracts tab](https://github.com/appetitestudio/givvest-app/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

  

## Requirements

  

Before you begin, you need to install the following tools:

  

- [Node (>= v18.17)](https://nodejs.org/en/download/)

- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))

- [Git](https://git-scm.com/downloads)

  

## Quickstart

  

To get started with Givvest, follow these steps:

  

1. Install dependencies if it was skipped in CLI:

```sh

cd my-dapp-example

yarn install

```

2. Run a local network in the first terminal:

```sh

yarn chain

```

This command starts a local Ethereum network using Hardhat. Customize the network configuration in `packages/hardhat/hardhat.config.ts`.

  

3. On a second terminal, deploy the test contract:

```sh

yarn deploy

```

This deploys a test smart contract to the local network. Modify the contract in `packages/hardhat/contracts` and the deploy script in `packages/hardhat/deploy`.

  

4. On a third terminal, start your NextJS app:

```sh

yarn start

```

Visit your app at: `http://localhost:3000`. Interact with your smart contract using the `Debug Contracts` page. Tweak the app config in `packages/nextjs/scaffold.config.ts`.

  

Run smart contract tests with `yarn hardhat:test`.

  

- Edit your smart contracts in `packages/hardhat/contracts`.

- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For routing and configuring pages/layouts, check out the Next.js documentation.

- Edit your deployment scripts in `packages/hardhat/deploy`.

  

## Documentation

  

Visit [scaffoldeth docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

  

To know more about our features, check out our [website](https://givvest.io).

  

## Contributing to Givvest

  

We welcome contributions to Givvest!

  

Please see [CONTRIBUTING.md](https://github.com/appetitestudio/givvest-app/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Givvest.

  

---

  

Let me know if there's anything specific you'd like to add or adjust!