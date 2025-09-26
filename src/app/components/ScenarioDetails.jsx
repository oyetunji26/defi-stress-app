// app/components/ScenarioDetails.js
import { AlertTriangle, TrendingDown, Zap, Shield, Target, Clock, DollarSign, Users } from 'lucide-react'

const scenarios = {
  flash_loan_attack: {
    name: 'Flash Loan Attack',
    description: 'Simulate coordinated flash loan attacks on protocol liquidity pools to test arbitrage resistance and price manipulation defenses.',
    complexity: 'High',
    duration: '15-30 minutes',
    riskLevel: 'Critical',
    icon: Zap,
    color: 'from-red-500 to-orange-500',
    testParameters: [
      'Flash loan amount variations (1M - 100M)',
      'Multi-step arbitrage sequences',
      'Price oracle manipulation attempts',
      'Liquidity pool drainage scenarios',
      'MEV (Maximal Extractable Value) exploitation'
    ],
    expectedVulnerabilities: [
      'Insufficient slippage protection',
      'Oracle price manipulation',
      'Reentrancy vulnerabilities',
      'Liquidity pool imbalances',
      'Governance token flash loan attacks'
    ],
    metrics: {
      walletTypes: ['Arbitrageurs', 'Flash Loan Bots', 'MEV Searchers'],
      transactionVolume: '$50M - $500M',
      gasConsumption: '2M - 15M gas units',
      timeframe: '1-5 blocks'
    }
  },
  market_crash: {
    name: 'Market Crash Simulation',
    description: 'Test protocol behavior during extreme market downturns with 50-90% asset price drops and mass liquidations.',
    complexity: 'Medium',
    duration: '30-60 minutes',
    riskLevel: 'High',
    icon: TrendingDown,
    color: 'from-purple-500 to-pink-500',
    testParameters: [
      'Progressive price drops (10% - 90%)',
      'Cascading liquidation events',
      'Collateral devaluation scenarios',
      'Bank run simulations',
      'Cross-protocol contagion effects'
    ],
    expectedVulnerabilities: [
      'Insufficient liquidation mechanisms',
      'Collateral ratio miscalculations',
      'Oracle lag during volatility',
      'Liquidity shortfalls',
      'Protocol insolvency risks'
    ],
    metrics: {
      walletTypes: ['Leveraged Traders', 'Liquidators', 'Panic Sellers'],
      transactionVolume: '$100M - $1B',
      gasConsumption: '5M - 25M gas units',
      timeframe: '1-24 hours'
    }
  },
  liquidity_drain: {
    name: 'Liquidity Drain Event',
    description: 'Simulate coordinated mass withdrawal events that could drain protocol liquidity and test reserve mechanisms.',
    complexity: 'Medium',
    duration: '20-45 minutes',
    riskLevel: 'High',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    testParameters: [
      'Coordinated withdrawal patterns',
      'Reserve pool stress testing',
      'Interest rate spike scenarios',
      'Liquidity mining exit events',
      'Stablecoin depeg situations'
    ],
    expectedVulnerabilities: [
      'Insufficient reserve buffers',
      'Interest rate model failures',
      'Withdrawal queue bottlenecks',
      'Cross-asset contagion',
      'Emergency shutdown risks'
    ],
    metrics: {
      walletTypes: ['Large Depositors', 'Yield Farmers', 'Institutional Users'],
      transactionVolume: '$200M - $2B',
      gasConsumption: '3M - 20M gas units',
      timeframe: '2-12 hours'
    }
  },
  governance_attack: {
    name: 'Governance Attack Vector',
    description: 'Test resistance to malicious governance proposals, vote manipulation, and protocol parameter attacks.',
    complexity: 'High',
    duration: '45-90 minutes',
    riskLevel: 'Critical',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    testParameters: [
      'Malicious proposal submissions',
      'Vote buying scenarios',
      'Quorum manipulation attempts',
      'Parameter modification attacks',
      'Emergency pause exploits'
    ],
    expectedVulnerabilities: [
      'Insufficient voting delays',
      'Low quorum requirements',
      'Flash loan governance attacks',
      'Admin key compromises',
      'Proposal validation gaps'
    ],
    metrics: {
      walletTypes: ['Token Holders', 'Delegates', 'Attackers'],
      transactionVolume: '$10M - $100M',
      gasConsumption: '1M - 10M gas units',
      timeframe: '3-14 days'
    }
  }
}

const protocols = {
  lending: {
    name: 'Lending Protocol',
    description: 'Comprehensive stress testing for decentralized lending platforms including collateralization, liquidation, and interest rate mechanisms.',
    icon: DollarSign,
    keyMetrics: ['Collateral Ratio', 'Liquidation Threshold', 'Utilization Rate', 'Interest Rate'],
    riskAreas: ['Undercollateralization', 'Bad Debt', 'Oracle Failures', 'Liquidity Crises'],
    testingFocus: [
      'Collateral liquidation cascades',
      'Interest rate model stress',
      'Multi-asset correlation risks',
      'Flash loan liquidations'
    ]
  },
  dex: {
    name: 'DEX Protocol',
    description: 'Automated Market Maker testing including slippage, impermanent loss, and arbitrage resistance validation.',
    icon: Users,
    keyMetrics: ['Slippage Tolerance', 'Pool Liquidity', 'Price Impact', 'Trading Volume'],
    riskAreas: ['Sandwich Attacks', 'Pool Drainage', 'Price Manipulation', 'Rug Pulls'],
    testingFocus: [
      'MEV extraction scenarios',
      'Liquidity provider risks',
      'Cross-pool arbitrage',
      'Concentrated liquidity attacks'
    ]
  },
  yield_farm: {
    name: 'Yield Farming Protocol',
    description: 'Yield optimization and farming protocol testing including reward mechanisms, staking risks, and governance attacks.',
    icon: Target,
    keyMetrics: ['APY Sustainability', 'Staking Ratio', 'Reward Distribution', 'Lock Period'],
    riskAreas: ['Reward Inflation', 'Exit Liquidity', 'Governance Capture', 'Smart Contract Bugs'],
    testingFocus: [
      'Reward token dump scenarios',
      'Mass unstaking events',
      'Governance token attacks',
      'Yield farming migrations'
    ]
  }
}

export default function ScenarioDetails({ selectedProtocol, testScenario }) {
  const scenario = scenarios[testScenario]
  const protocol = protocols[selectedProtocol]
  
  if (!scenario || !protocol) return null

  const ScenarioIcon = scenario.icon
  const ProtocolIcon = protocol.icon

  return (
    <div className="space-y-6 mb-8">
      {/* Main Scenario Card */}
      <div className="glass-card p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${scenario.color} shadow-lg`}>
              <ScenarioIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {scenario.name}
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
                {scenario.description}
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span className="text-gray-300 text-sm">Complexity</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              scenario.complexity === 'High' ? 'bg-red-500/20 text-red-300' :
              scenario.complexity === 'Medium' ? 'bg-orange-500/20 text-orange-300' :
              'bg-green-500/20 text-green-300'
            }`}>
              {scenario.complexity}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm">Duration</span>
            </div>
            <p className="text-white font-semibold">{scenario.duration}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-red-400" />
              <span className="text-gray-300 text-sm">Risk Level</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              scenario.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-300' :
              'bg-orange-500/20 text-orange-300'
            }`}>
              {scenario.riskLevel}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <ProtocolIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 text-sm">Protocol</span>
            </div>
            <p className="text-white font-semibold">{protocol.name}</p>
          </div>
        </div>

        {/* Test Parameters and Vulnerabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Test Parameters
            </h4>
            <div className="space-y-2">
              {scenario.testParameters.map((param, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300">{param}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Expected Vulnerabilities
            </h4>
            <div className="space-y-2">
              {scenario.expectedVulnerabilities.map((vuln, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300">{vuln}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Protocol-Specific Details */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
            <ProtocolIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white">{protocol.name} Testing Focus</h4>
            <p className="text-gray-300">{protocol.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h5 className="font-semibold text-white mb-3">Key Metrics</h5>
            <div className="space-y-2">
              {protocol.keyMetrics.map((metric, index) => (
                <span key={index} className="block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-3">Risk Areas</h5>
            <div className="space-y-2">
              {protocol.riskAreas.map((risk, index) => (
                <span key={index} className="block px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm">
                  {risk}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-semibold text-white mb-3">Testing Focus Areas</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {protocol.testingFocus.map((focus, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">{focus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Metrics */}
      <div className="glass-card p-6">
        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-purple-400" />
          Simulation Metrics
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{scenario.metrics.walletTypes.length}</div>
            <div className="text-gray-400 text-sm mb-2">Wallet Types</div>
            <div className="space-y-1">
              {scenario.metrics.walletTypes.map((type, index) => (
                <div key={index} className="text-xs text-gray-300 bg-white/5 rounded px-2 py-1">
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">{scenario.metrics.transactionVolume}</div>
            <div className="text-gray-400 text-sm">Transaction Volume</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{scenario.metrics.gasConsumption}</div>
            <div className="text-gray-400 text-sm">Gas Consumption</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{scenario.metrics.timeframe}</div>
            <div className="text-gray-400 text-sm">Simulation Timeframe</div>
          </div>
        </div>
      </div>
    </div>
  )
}