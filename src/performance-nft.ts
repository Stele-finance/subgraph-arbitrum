import {
  PerformanceNFTMinted as PerformanceNFTMintedEvent,
} from "../generated/StelePerformanceNFT/StelePerformanceNFT"
import { PerformanceNFT } from "../generated/schema"

export function handlePerformanceNFTMinted(event: PerformanceNFTMintedEvent): void {
  const id = event.params.tokenId.toString()
  let entity = new PerformanceNFT(id)
  entity.tokenId = event.params.tokenId
  entity.challengeId = event.params.challengeId
  entity.user = event.params.user
  entity.rank = event.params.rank
  entity.returnRate = event.params.returnRate
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

