import { Address, BigDecimal, BigInt, Bytes, ethereum, log } from '@graphprotocol/graph-ts'
import {
  Stele,
  Challenge,
  ChallengeSnapshot,
  ActiveChallengesSnapshot,
  ActiveChallengesWeeklySnapshot,
  Investor,
  InvestorSnapshot,
  InvestorWeeklySnapshot,
  ActiveChallenges
} from '../../generated/schema'
import { STELE_ADDRESS } from './constants'
import { getInvestorID } from './investor'

export function challengeSnapshot(
  challengeId: string,
  event: ethereum.Event
): void {
  let challenge = Challenge.load(challengeId)
  if (!challenge) return

  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400 // rounded

  let challengeSnapshot = ChallengeSnapshot.load(challengeId + "-" + dayID.toString())
  if (challengeSnapshot == null) {
    challengeSnapshot = new ChallengeSnapshot(challengeId + "-" + dayID.toString())
  }
  challengeSnapshot.challengeId = challenge.challengeId
  challengeSnapshot.timestamp = event.block.timestamp
  challengeSnapshot.investorCount = challenge.investorCounter
  challengeSnapshot.rewardAmountUSD = challenge.rewardAmountUSD
  challengeSnapshot.topUsers = challenge.topUsers
  challengeSnapshot.score = challenge.score
  challengeSnapshot.save()
}

export function activeChallengesSnapshot(event: ethereum.Event): void {
  let activeChallenges = ActiveChallenges.load(Bytes.fromI32(0))
  if (activeChallenges == null) {
    return
  }

  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400 // rounded

  let activeChallengesSnapshot = ActiveChallengesSnapshot.load(dayID.toString())
  if (activeChallengesSnapshot == null) {
    activeChallengesSnapshot = new ActiveChallengesSnapshot(dayID.toString())
  }
  activeChallengesSnapshot.timestamp = event.block.timestamp

  let one_week_investorCounter = activeChallenges.one_week_investorCounter
  let one_week_rewardAmountUSD = activeChallenges.one_week_rewardAmountUSD
  let one_month_investorCounter = activeChallenges.one_month_investorCounter
  let one_month_rewardAmountUSD = activeChallenges.one_month_rewardAmountUSD
  let three_month_investorCounter = activeChallenges.three_month_investorCounter
  let three_month_rewardAmountUSD = activeChallenges.three_month_rewardAmountUSD
  let six_month_investorCounter = activeChallenges.six_month_investorCounter
  let six_month_rewardAmountUSD = activeChallenges.six_month_rewardAmountUSD
  let one_year_investorCounter = activeChallenges.one_year_investorCounter
  let one_year_rewardAmountUSD = activeChallenges.one_year_rewardAmountUSD

  activeChallengesSnapshot.totalParticipants = 
    one_week_investorCounter
      .plus(one_month_investorCounter)
      .plus(three_month_investorCounter)
      .plus(six_month_investorCounter)
      .plus(one_year_investorCounter)
  activeChallengesSnapshot.totalRewards = 
    one_week_rewardAmountUSD
      .plus(one_month_rewardAmountUSD)
      .plus(three_month_rewardAmountUSD)
      .plus(six_month_rewardAmountUSD)
      .plus(one_year_rewardAmountUSD)
  
  activeChallengesSnapshot.one_week_investorCounter = one_week_investorCounter
  activeChallengesSnapshot.one_week_rewardAmountUSD = one_week_rewardAmountUSD
  activeChallengesSnapshot.one_month_investorCounter = one_month_investorCounter
  activeChallengesSnapshot.one_month_rewardAmountUSD = one_month_rewardAmountUSD
  activeChallengesSnapshot.three_month_investorCounter = three_month_investorCounter
  activeChallengesSnapshot.three_month_rewardAmountUSD = three_month_rewardAmountUSD
  activeChallengesSnapshot.six_month_investorCounter = six_month_investorCounter
  activeChallengesSnapshot.six_month_rewardAmountUSD = six_month_rewardAmountUSD
  activeChallengesSnapshot.one_year_investorCounter = one_year_investorCounter
  activeChallengesSnapshot.one_year_rewardAmountUSD = one_year_rewardAmountUSD
  activeChallengesSnapshot.save()
}

export function activeChallengesWeeklySnapshot(event: ethereum.Event): void {
  let activeChallenges = ActiveChallenges.load(Bytes.fromI32(0))
  if (activeChallenges == null) {
    return
  }

  let timestamp = event.block.timestamp.toI32()
  let weekID = timestamp / (86400 * 7) // Round by 7-day units

  let activeChallengesWeeklySnapshot = ActiveChallengesWeeklySnapshot.load(weekID.toString())
  if (activeChallengesWeeklySnapshot == null) {
    activeChallengesWeeklySnapshot = new ActiveChallengesWeeklySnapshot(weekID.toString())
  }
  activeChallengesWeeklySnapshot.timestamp = event.block.timestamp

  let one_week_investorCounter = activeChallenges.one_week_investorCounter
  let one_week_rewardAmountUSD = activeChallenges.one_week_rewardAmountUSD
  let one_month_investorCounter = activeChallenges.one_month_investorCounter
  let one_month_rewardAmountUSD = activeChallenges.one_month_rewardAmountUSD
  let three_month_investorCounter = activeChallenges.three_month_investorCounter
  let three_month_rewardAmountUSD = activeChallenges.three_month_rewardAmountUSD
  let six_month_investorCounter = activeChallenges.six_month_investorCounter
  let six_month_rewardAmountUSD = activeChallenges.six_month_rewardAmountUSD
  let one_year_investorCounter = activeChallenges.one_year_investorCounter
  let one_year_rewardAmountUSD = activeChallenges.one_year_rewardAmountUSD

  activeChallengesWeeklySnapshot.totalParticipants = 
    one_week_investorCounter
      .plus(one_month_investorCounter)
      .plus(three_month_investorCounter)
      .plus(six_month_investorCounter)
      .plus(one_year_investorCounter)
  activeChallengesWeeklySnapshot.totalRewards = 
    one_week_rewardAmountUSD
      .plus(one_month_rewardAmountUSD)
      .plus(three_month_rewardAmountUSD)
      .plus(six_month_rewardAmountUSD)
      .plus(one_year_rewardAmountUSD)
  
  activeChallengesWeeklySnapshot.one_week_investorCounter = one_week_investorCounter
  activeChallengesWeeklySnapshot.one_week_rewardAmountUSD = one_week_rewardAmountUSD
  activeChallengesWeeklySnapshot.one_month_investorCounter = one_month_investorCounter
  activeChallengesWeeklySnapshot.one_month_rewardAmountUSD = one_month_rewardAmountUSD
  activeChallengesWeeklySnapshot.three_month_investorCounter = three_month_investorCounter
  activeChallengesWeeklySnapshot.three_month_rewardAmountUSD = three_month_rewardAmountUSD
  activeChallengesWeeklySnapshot.six_month_investorCounter = six_month_investorCounter
  activeChallengesWeeklySnapshot.six_month_rewardAmountUSD = six_month_rewardAmountUSD
  activeChallengesWeeklySnapshot.one_year_investorCounter = one_year_investorCounter
  activeChallengesWeeklySnapshot.one_year_rewardAmountUSD = one_year_rewardAmountUSD
  activeChallengesWeeklySnapshot.save()
}

export function investorSnapshot(
  challengeId: BigInt,
  investorAddress: Bytes,
  event: ethereum.Event
): void {
  const investorId = getInvestorID(
    challengeId, 
    Address.fromString(investorAddress.toHexString()))
  let investor = Investor.load(investorId)
  if (!investor) return 

  let dayID = event.block.timestamp.toI32() / 86400 // rounded

  // Always create new snapshot for each event
  let investorSnapshot = InvestorSnapshot.load(investorId + "-" + dayID.toString())
  if (investorSnapshot == null) {
    investorSnapshot = new InvestorSnapshot(investorId + "-" + dayID.toString())
  }
  investorSnapshot.challengeId = investor.challengeId
  investorSnapshot.timestamp = event.block.timestamp
  investorSnapshot.investor = investor.investor
  investorSnapshot.seedMoneyUSD = investor.seedMoneyUSD
  investorSnapshot.currentUSD = investor.currentUSD
  investorSnapshot.tokens = investor.tokens
  investorSnapshot.tokensAmount = investor.tokensAmount
  investorSnapshot.tokensDecimals = investor.tokensDecimals
  investorSnapshot.tokensSymbols = investor.tokensSymbols
  investorSnapshot.profitRatio = investor.profitRatio
  investorSnapshot.save()
}

export function investorWeeklySnapshot(
  challengeId: BigInt,
  investorAddress: Bytes,
  event: ethereum.Event
): void {
  const investorId = getInvestorID(
    challengeId, 
    Address.fromString(investorAddress.toHexString()))
  let investor = Investor.load(investorId)
  if (!investor) return 

  let weekID = event.block.timestamp.toI32() / (86400 * 7) // Round by 7-day units

  // Always create new snapshot for each event
  let investorWeeklySnapshot = InvestorWeeklySnapshot.load(investorId + "-" + weekID.toString())
  if (investorWeeklySnapshot == null) {
    investorWeeklySnapshot = new InvestorWeeklySnapshot(investorId + "-" + weekID.toString())
  }
  investorWeeklySnapshot.challengeId = investor.challengeId
  investorWeeklySnapshot.timestamp = event.block.timestamp
  investorWeeklySnapshot.investor = investor.investor
  investorWeeklySnapshot.seedMoneyUSD = investor.seedMoneyUSD
  investorWeeklySnapshot.currentUSD = investor.currentUSD
  investorWeeklySnapshot.tokens = investor.tokens
  investorWeeklySnapshot.tokensAmount = investor.tokensAmount
  investorWeeklySnapshot.tokensDecimals = investor.tokensDecimals
  investorWeeklySnapshot.tokensSymbols = investor.tokensSymbols
  investorWeeklySnapshot.profitRatio = investor.profitRatio
  investorWeeklySnapshot.save()
}
