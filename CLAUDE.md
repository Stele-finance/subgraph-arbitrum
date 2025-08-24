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
- **Stele**: `0x2697Be05c98ed9E6Df36a32A5E6178a43BE0890f`
- **SteleGovernor**: `0xC11133daC3A47bb320C7b2f99F72bb8BafB4470A`  
- **StelePerformanceNFT**: `0x1e6cca278b522ab052bbe3140f8d455f2c454ff8`

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