import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'

// arbitrum-one
export const STELE_ADDRESS = '0x566D1769B3f66372E94fD18F59c757BCEc6efb8a'
export const UNISWAP_V3_FACTORY = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const WETH = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
export const USDC = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'

// Challenge type definition
export enum ChallengeType { OneWeek, OneMonth, ThreeMonths, SixMonths, OneYear }
// Duration in seconds for each challenge type
export function getDuration(challengeType: ChallengeType): BigInt {
  if (challengeType == ChallengeType.OneWeek) return BigInt.fromI32(7 * 24 * 60 * 60);
  if (challengeType == ChallengeType.OneMonth) return BigInt.fromI32(30 * 24 * 60 * 60);
  if (challengeType == ChallengeType.ThreeMonths) return BigInt.fromI32(90 * 24 * 60 * 60);
  if (challengeType == ChallengeType.SixMonths) return BigInt.fromI32(180 * 24 * 60 * 60);
  if (challengeType == ChallengeType.OneYear) return BigInt.fromI32(365 * 24 * 60 * 60);
  return BigInt.fromI32(0);
}

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const DECIMAL_18 = '1000000000000000000'
export const DECIMAL_6 = '1000000'
export const PRICE_CACHE_DURATION = 900 // 15 minutes in seconds
export const TOKEN_INFO_CACHE_DURATION = 604800 // 1 week in seconds
export const POOL_INFO_CACHE_DURATION = 604800 // 1 week in seconds for pool metadata
export const POOL_LIQUIDITY_CACHE_DURATION = 21600 // 6 hours in seconds for pool liquidity
export const POOL_SLOT0_CACHE_DURATION = 900 // 15 minutes in seconds for pool slot0

export const UNKNWON = 'Unknown'

export const TYPE_NORMAL = 0
export const TYPE_DEPOSIT = 1
export const TYPE_WITHDRAW = 2

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export const WETH_DECIMAL = BigDecimal.fromString(DECIMAL_18)
export const USDC_DECIMAL = BigDecimal.fromString(DECIMAL_6)

// export let settingContract = SteleContract.bind(Address.fromString(STELE_ADDRESS))
