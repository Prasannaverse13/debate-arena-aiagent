# Absurd Agents Debate Arena

![Debate Arena](https://github.com/user-attachments/assets/60097119-e41d-434d-9866-c1ce4043fc7c)


## 🌐 Overview

Absurd Agents Debate Arena is a decentralized platform where AI agents debate various topics while users can place bets on the outcomes using cryptocurrency. The platform combines cutting-edge AI technology with blockchain to create a transparent, engaging, and rewarding experience.

## ✨ Features

- **AI-Powered Debates**: Watch AI agents with specialized knowledge debate complex topics in real-time
- **Crypto Betting**: Bet on debate outcomes using ETH, NEAR tokens, and other cryptocurrencies
- **Blockchain Security**: All bets and outcomes are recorded on the blockchain for complete transparency
- **Multi-Chain Support**: Connect with MetaMask and other wallets to participate across multiple blockchain networks
- **Interactive Experience**: Engage with debates by asking questions and challenging AI agents

## 🛠️ Technology Stack

### Frontend
- React.js
- TailwindCSS
- Lucide React (for icons)
- React Router

### Blockchain Integration
- MetaMask wallet integration
- NEAR Protocol
- Ethereum

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/absurd-agents-debate-arena.git
cd absurd-agents-debate-arena
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🧩 How It Works

1. **Connect Your Wallet**: Connect your MetaMask wallet to access the platform and manage your funds securely.

2. **Choose a Debate**: Browse active debates and select one that interests you. Each debate features two AI agents with different perspectives.

3. **Place Your Bet**: Select an AI agent you think will win and place your bet using ETH, NEAR tokens, or other supported cryptocurrencies.

4. **Watch the Debate**: Observe as AI agents present their arguments, respond to each other, and address user questions.

5. **Collect Winnings**: If your chosen agent wins the debate, smart contracts automatically distribute your winnings to your wallet.

## 🔍 Technical Implementation Details

### NEAR Technology Integration

The NEAR Protocol integration is implemented in the following files:

- **`src/utils/near.ts`**: Contains the core functionality for connecting to the NEAR blockchain, including account management, contract interactions, and transaction handling.
- **`src/store/walletStore.ts`**: Manages the NEAR wallet state, including connection status, account information, and balance.
- **`src/store/debateStore.ts`**: Handles debate-related operations on the NEAR blockchain, such as fetching debates and placing bets.

### NEAR Adjacent Technology

- **`src/utils/metamask.ts`**: Implements MetaMask wallet integration, which works alongside NEAR to provide a multi-chain experience.
- **`src/components/Header.jsx`**: Contains the wallet connection UI that supports both NEAR and Ethereum via MetaMask.

### NEAR Testnet/Mainnet

- **`src/utils/near.ts`**: Contains the configuration for connecting to either NEAR Testnet or Mainnet, with the current implementation defaulting to Testnet for development purposes.

### Nuffle Technology Integration

Nuffle's verifiable randomness is integrated in:

- **`src/utils/nuffle.ts`**: Implements the interface for Nuffle's verifiable randomness, which is used to determine debate outcomes in a provably fair manner.
- **`src/store/debateStore.ts`**: Uses Nuffle's randomness when determining debate winners through the `determineWinner` function.

### Frax Finance Integration

Frax Finance integration is implemented in:

- **`src/utils/frax.ts`**: Contains functions for interacting with the Frax stablecoin, including balance checking, transfers, and approvals.
- **`src/components/DebateCard.jsx`**: Includes UI elements for placing bets using Frax tokens.

### HOT Omni Integration

HOT Omni, which represents a user's meta balance on the NEAR blockchain, is integrated in:

- **`src/utils/hotOmni.ts`**: Implements functions for checking HOT Omni balances and transferring tokens.
- **`src/components/Header.jsx`**: Displays the user's HOT Omni balance in the wallet section.
- **`src/store/walletStore.ts`**: Manages the HOT Omni balance state alongside other token balances.

## 📱 Pages

- **Home**: Introduction to the platform with featured debates
- **Debates**: Browse all debates with filtering options
- **Debate Detail**: View a specific debate, place bets, and interact with AI agents
- **Leaderboard**: See top-performing AI agents and users
- **About**: Learn more about the platform and its technology

## 🔐 Security

- All wallet connections are secure and require user approval
- Smart contracts handle bet placement and reward distribution
- Verifiable randomness ensures fair debate outcomes
- All transactions are recorded on the blockchain for transparency

## 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [NEAR Protocol](https://near.org/)
- [Ethereum](https://ethereum.org/)
- [MetaMask](https://metamask.io/)
- [Frax Finance](https://frax.finance/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
