# Stele Arbitrum Subgraph

A subgraph for the Stele platform on Arbitrum network using The Graph protocol.

## Project Overview

This project provides a GraphQL API that enables indexing and querying data from Stele, an investment challenge platform. It includes governance system and Performance NFT functionality.

## Key Features

- **Investment Challenges**: Track investment challenges across various durations (1 week, 1 month, 3 months, 6 months, 1 year)
- **Governance**: Monitor governance activities including proposal creation, voting, and execution
- **Performance NFT**: Track NFTs issued to top-ranking participants
- **Real-time Rankings**: Real-time updates of participant returns and rankings
- **Token Price Tracking**: Token price caching through Uniswap V3

## Smart Contract Addresses

### Arbitrum One Network
- **Stele**: `0x566D1769B3f66372E94fD18F59c757BCEc6efb8a`
- **SteleGovernor**: `0xc93fe38f52481f090e28e242b36f828c74f24142`  
- **StelePerformanceNFT**: `0x71c24377e7f24b6d822c9dad967ebc77c04667b5`

## Main Commands

### Deployment Commands
```bash
# Code generation and build
graph codegen && graph build

# Individual execution
npm run codegen
npm run build
```

### Deploy Commands
```bash
# Main deployment
graph deploy stele-arbit

# Or using npm scripts
npm run deploy

# Local development environment
npm run create-local
npm run deploy-local
npm run remove-local
```

## Schema Structure

### Core Entities

#### Challenge Related
- `Challenge`: Individual challenge information
- `ActiveChallenges`: Currently active challenges
- `Investor`: Participant information and portfolio
- `Ranking`: Challenge-specific ranking information

#### Transaction Events
- `Create`: Challenge creation events
- `Join`: Participant join events
- `Swap`: Token swap events
- `Register`: Challenge registration events
- `Reward`: Reward distribution events

#### Governance
- `Proposal`: Proposal information
- `Vote`: Voting records
- `ProposalVoteResult`: Vote result aggregation

#### NFT
- `PerformanceNFT`: Performance-based NFT issuance records

### Snapshot System

Historical data tracking through daily/weekly data snapshots:
- `ChallengeSnapshot` / `ChallengeWeeklySnapshot`
- `ActiveChallengesSnapshot` / `ActiveChallengesWeeklySnapshot`  
- `InvestorSnapshot` / `InvestorWeeklySnapshot`

## Development Environment

### Required Dependencies
- `@graphprotocol/graph-cli`: 0.97.1
- `@graphprotocol/graph-ts`: 0.37.0

### Testing Framework
- `matchstick-as`: 0.6.0

## File Structure

```
src/
├── stele.ts              # Main Stele contract event handlers
├── governance.ts         # Governance event handlers
├── performance-nft.ts    # Performance NFT event handlers
└── utils/
    ├── constants.ts      # Constant definitions
    ├── index.ts         # Utility functions
    ├── investor.ts      # Investor-related functions
    ├── pricing.ts       # Price calculation functions
    ├── snapshots.ts     # Snapshot creation functions
    └── token.ts         # Token-related functions

abis/                     # Smart contract ABI files
tests/                    # Test files
```

## Price Caching System

Efficient token price tracking through Uniswap V3:
- ETH price caching (`Bundle`)
- Token-specific price caching (`PriceCache`)
- Pool information caching (`PoolInfo`)
- Token metadata caching (`TokenCache`)

## Important Notes

- Currently operates only on Arbitrum One network
- Price calculations depend on Uniswap V3 protocol
- Snapshot data is updated periodically