
  <br>

# Givvest App


Givvest is an fundraising platform that leverages NFTs to transform charitable donations into assets, ensuring both philanthropic impact and personal financial security.

<a  href="https://givvest.io">**Website**</a>🔗

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