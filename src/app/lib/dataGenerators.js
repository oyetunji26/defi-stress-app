export function generateSyntheticDataset({ protocol, scenario, size }) {
  const data = []
  const vulnerabilities = []
  
  for (let i = 0; i < size; i++) {
    const wallet = generateWalletData(protocol, scenario, i)
    data.push(wallet)
    
    // AI-powered vulnerability detection
    const vulns = detectVulnerabilities(wallet, scenario)
    vulnerabilities.push(...vulns)
  }
  
  return { data, vulnerabilities }
}

function generateWalletData(protocol, scenario, index) {
  const baseWallet = {
    id: `0x${Math.random().toString(16).substr(2, 40)}`,
    balance: Math.random() * 1000000,
    transactionCount: Math.floor(Math.random() * 10000),
    riskScore: Math.random() * 100,
    liquidityProvided: Math.random() * 500000,
    borrowAmount: Math.random() * 200000,
    collateralRatio: 110 + Math.random() * 200,
    gasUsed: Math.floor(Math.random() * 500000),
    timestamp: Date.now() - Math.random() * 86400000 * 30,
    protocolInteractions: Math.floor(Math.random() * 50),
    averageTransactionSize: Math.random() * 100000
  }

  // Add scenario-specific parameters
  switch (scenario) {
    case 'flash_loan_attack':
      baseWallet.flashLoanAmount = Math.random() * 10000000
      baseWallet.arbitrageProfit = Math.random() * 100000
      baseWallet.mevExposure = Math.random() * 50000
      break
    case 'market_crash':
      baseWallet.priceImpact = -50 - Math.random() * 40
      baseWallet.liquidationRisk = Math.random() * 100
      baseWallet.portfolioVolatility = Math.random() * 80
      break
    case 'liquidity_drain':
      baseWallet.withdrawalAmount = Math.random() * 800000
      baseWallet.liquidityUtilization = Math.random() * 100
      break
    case 'governance_attack':
      baseWallet.votingPower = Math.random() * 1000000
      baseWallet.proposalCount = Math.floor(Math.random() * 10)
      break
  }

  return baseWallet
}

function detectVulnerabilities(wallet, scenario) {
  const vulnerabilities = []
  
  // Critical vulnerability detection logic
  if (wallet.collateralRatio < 110) {
    vulnerabilities.push({
      type: 'Undercollateralization Risk',
      severity: 'High',
      wallet: wallet.id,
      details: `Collateral ratio: ${wallet.collateralRatio.toFixed(2)}% (Below 110% threshold)`,
      impact: 'Immediate liquidation risk',
      recommendation: 'Increase collateral or reduce borrowing'
    })
  }
  
  if (wallet.flashLoanAmount > 5000000) {
    vulnerabilities.push({
      type: 'Large Flash Loan Exposure',
      severity: 'Medium',
      wallet: wallet.id,
      details: `Flash loan: $${wallet.flashLoanAmount.toLocaleString()}`,
      impact: 'Potential market manipulation',
      recommendation: 'Implement flash loan limits'
    })
  }
  
  if (wallet.riskScore > 90) {
    vulnerabilities.push({
      type: 'High Risk Profile',
      severity: 'High',
      wallet: wallet.id,
      details: `Risk score: ${wallet.riskScore.toFixed(1)}/100`,
      impact: 'Multiple risk factors detected',
      recommendation: 'Enhanced monitoring required'
    })
  }
  
  return vulnerabilities
}