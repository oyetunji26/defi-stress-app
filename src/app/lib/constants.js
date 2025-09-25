export const protocols = {
  lending: {
    name: 'Lending Protocol',
    params: ['collateralRatio', 'liquidationThreshold', 'borrowRate', 'supplyRate'],
    riskFactors: ['undercollateralization', 'liquidity_drain', 'interest_rate_manipulation']
  },
  dex: {
    name: 'DEX Protocol',
    params: ['slippage', 'poolLiquidity', 'swapFee', 'priceImpact'],
    riskFactors: ['sandwich_attacks', 'rug_pulls', 'impermanent_loss']
  },
  yield_farm: {
    name: 'Yield Farming',
    params: ['stakingReward', 'lockupPeriod', 'totalStaked', 'rewardRate'],
    riskFactors: ['reward_manipulation', 'governance_attacks', 'exit_liquidity']
  }
}