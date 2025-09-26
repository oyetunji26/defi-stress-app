import SynthikClient, { ColumnBuilder } from "synthik-client";

// Keep your original function signature and structure
export async function generateSyntheticDataset({ protocol, scenario, size }) {
  const data = [];
  const vulnerabilities = [];

  try {
    // Generate data using Synthik
    const synthikData = await generateWithSynthik(protocol, scenario, size);
    
    // Transform Synthik data to match your original structure
    for (let i = 0; i < synthikData.length; i++) {
      const wallet = transformToWalletData(synthikData[i], scenario);
      data.push(wallet);
      
      // AI-powered vulnerability detection (your original logic)
      const vulns = detectVulnerabilities(wallet, scenario);
      vulnerabilities.push(...vulns);
    }
  } catch (error) {
    console.warn('Synthik generation failed, falling back to original method:', error.message);
    
    // Fallback to your original generation method
    for (let i = 0; i < size; i++) {
      const wallet = generateWalletData(protocol, scenario, i);
      data.push(wallet);
      
      const vulns = detectVulnerabilities(wallet, scenario);
      vulnerabilities.push(...vulns);
    }
  }

  return { data, vulnerabilities };
}

// Synthik generation (enhanced but compatible)
async function generateWithSynthik(protocol, scenario, size) {
  const client = new SynthikClient();

  // Define columns that match your original data structure
  const columns = [
    ColumnBuilder.float("balance", { 
      description: "Wallet balance in USD", 
      constraints: { min: 0, max: 1000000 } 
    }).build(),
    
    ColumnBuilder.int("transactionCount", { 
      constraints: { min: 0, max: 10000 } 
    }).build(),
    
    ColumnBuilder.float("riskScore", { 
      constraints: { min: 0, max: 100 } 
    }).build(),
    
    ColumnBuilder.float("liquidityProvided", { 
      constraints: { min: 0, max: 500000 } 
    }).build(),
    
    ColumnBuilder.float("borrowAmount", { 
      constraints: { min: 0, max: 200000 } 
    }).build(),
    
    ColumnBuilder.float("collateralRatio", { 
      constraints: { min: 80, max: 400 } 
    }).build(),
    
    ColumnBuilder.int("gasUsed", { 
      constraints: { min: 21000, max: 500000 } 
    }).build(),
    
    ColumnBuilder.int("protocolInteractions", { 
      constraints: { min: 0, max: 50 } 
    }).build(),
    
    ColumnBuilder.float("averageTransactionSize", { 
      constraints: { min: 0, max: 100000 } 
    }).build()
  ];

  // Add scenario-specific columns
  if (scenario === 'flash_loan_attack') {
    columns.push(
      ColumnBuilder.float("flashLoanAmount", { constraints: { min: 0, max: 10000000 } }).build(),
      ColumnBuilder.float("arbitrageProfit", { constraints: { min: 0, max: 100000 } }).build(),
      ColumnBuilder.float("mevExposure", { constraints: { min: 0, max: 50000 } }).build()
    );
  } else if (scenario === 'market_crash') {
    columns.push(
      ColumnBuilder.float("priceImpact", { constraints: { min: -90, max: -10 } }).build(),
      ColumnBuilder.float("liquidationRisk", { constraints: { min: 0, max: 100 } }).build(),
      ColumnBuilder.float("portfolioVolatility", { constraints: { min: 0, max: 80 } }).build()
    );
  } else if (scenario === 'liquidity_drain') {
    columns.push(
      ColumnBuilder.float("withdrawalAmount", { constraints: { min: 0, max: 800000 } }).build(),
      ColumnBuilder.float("liquidityUtilization", { constraints: { min: 0, max: 100 } }).build()
    );
  } else if (scenario === 'governance_attack') {
    columns.push(
      ColumnBuilder.float("votingPower", { constraints: { min: 0, max: 1000000 } }).build(),
      ColumnBuilder.int("proposalCount", { constraints: { min: 0, max: 10 } }).build()
    );
  }

  const request = {
    num_rows: size,
    topic: `${protocol} DeFi wallet data for ${scenario}`,
    columns: columns
  };

  const result = await client.tabular.generate(request, { format: "json" });
  return Array.isArray(result) ? result : result.data || [];
}

// Transform Synthik data to match your exact wallet structure
function transformToWalletData(synthikRow, scenario) {
  const wallet = {
    id: `0x${Math.random().toString(16).substr(2, 40)}`,
    balance: synthikRow.balance || Math.random() * 1000000,
    transactionCount: synthikRow.transactionCount || Math.floor(Math.random() * 10000),
    riskScore: synthikRow.riskScore || Math.random() * 100,
    liquidityProvided: synthikRow.liquidityProvided || Math.random() * 500000,
    borrowAmount: synthikRow.borrowAmount || Math.random() * 200000,
    collateralRatio: synthikRow.collateralRatio || (110 + Math.random() * 200),
    gasUsed: synthikRow.gasUsed || Math.floor(Math.random() * 500000),
    timestamp: Date.now() - Math.random() * 86400000 * 30,
    protocolInteractions: synthikRow.protocolInteractions || Math.floor(Math.random() * 50),
    averageTransactionSize: synthikRow.averageTransactionSize || Math.random() * 100000
  };

  // Add scenario-specific parameters (same as your original logic)
  switch (scenario) {
    case 'flash_loan_attack':
      wallet.flashLoanAmount = synthikRow.flashLoanAmount || Math.random() * 10000000;
      wallet.arbitrageProfit = synthikRow.arbitrageProfit || Math.random() * 100000;
      wallet.mevExposure = synthikRow.mevExposure || Math.random() * 50000;
      break;
    case 'market_crash':
      wallet.priceImpact = synthikRow.priceImpact || (-50 - Math.random() * 40);
      wallet.liquidationRisk = synthikRow.liquidationRisk || Math.random() * 100;
      wallet.portfolioVolatility = synthikRow.portfolioVolatility || Math.random() * 80;
      break;
    case 'liquidity_drain':
      wallet.withdrawalAmount = synthikRow.withdrawalAmount || Math.random() * 800000;
      wallet.liquidityUtilization = synthikRow.liquidityUtilization || Math.random() * 100;
      break;
    case 'governance_attack':
      wallet.votingPower = synthikRow.votingPower || Math.random() * 1000000;
      wallet.proposalCount = synthikRow.proposalCount || Math.floor(Math.random() * 10);
      break;
  }

  return wallet;
}

// Your original fallback function (unchanged)
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
  };

  // Add scenario-specific parameters
  switch (scenario) {
    case 'flash_loan_attack':
      baseWallet.flashLoanAmount = Math.random() * 10000000;
      baseWallet.arbitrageProfit = Math.random() * 100000;
      baseWallet.mevExposure = Math.random() * 50000;
      break;
    case 'market_crash':
      baseWallet.priceImpact = -50 - Math.random() * 40;
      baseWallet.liquidationRisk = Math.random() * 100;
      baseWallet.portfolioVolatility = Math.random() * 80;
      break;
    case 'liquidity_drain':
      baseWallet.withdrawalAmount = Math.random() * 800000;
      baseWallet.liquidityUtilization = Math.random() * 100;
      break;
    case 'governance_attack':
      baseWallet.votingPower = Math.random() * 1000000;
      baseWallet.proposalCount = Math.floor(Math.random() * 10);
      break;
  }

  return baseWallet;
}

// Your original vulnerability detection (unchanged)
function detectVulnerabilities(wallet, scenario) {
  const vulnerabilities = [];

  // Critical vulnerability detection logic
  if (wallet.collateralRatio < 110) {
    vulnerabilities.push({
      type: 'Undercollateralization Risk',
      severity: 'High',
      wallet: wallet.id,
      details: `Collateral ratio: ${wallet.collateralRatio.toFixed(2)}% (Below 110% threshold)`,
      impact: 'Immediate liquidation risk',
      recommendation: 'Increase collateral or reduce borrowing'
    });
  }

  if (wallet.flashLoanAmount > 5000000) {
    vulnerabilities.push({
      type: 'Large Flash Loan Exposure',
      severity: 'Medium',
      wallet: wallet.id,
      details: `Flash loan: $${wallet.flashLoanAmount.toLocaleString()}`,
      impact: 'Potential market manipulation',
      recommendation: 'Implement flash loan limits'
    });
  }

  if (wallet.riskScore > 90) {
    vulnerabilities.push({
      type: 'High Risk Profile',
      severity: 'High',
      wallet: wallet.id,
      details: `Risk score: ${wallet.riskScore.toFixed(1)}/100`,
      impact: 'Multiple risk factors detected',
      recommendation: 'Enhanced monitoring required'
    });
  }

  return vulnerabilities;
}