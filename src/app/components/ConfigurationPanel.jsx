// app/components/ConfigurationPanel.js
import { Activity } from 'lucide-react'
import { protocols } from '../lib/constants'

export default function ConfigurationPanel({
  selectedProtocol,
  setSelectedProtocol,
  testScenario,
  setTestScenario,
  datasetSize,
  setDatasetSize
}) {
  const scenarios = {
    flash_loan_attack: {
      name: 'Flash Loan Attack',
      description: 'Simulate coordinated flash loan attacks on protocol liquidity',
      complexity: 'High'
    },
    market_crash: {
      name: 'Market Crash',
      description: 'Test protocol behavior during 50-90% market downturns',
      complexity: 'Medium'
    },
    liquidity_drain: {
      name: 'Liquidity Drain',
      description: 'Simulate mass withdrawal events',
      complexity: 'Medium'
    },
    governance_attack: {
      name: 'Governance Attack',
      description: 'Test resistance to malicious governance proposals',
      complexity: 'High'
    }
  }

  return (
    <div className="glass-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-cyan-400" />
        Configuration
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Protocol Type
          </label>
          <select
            value={selectedProtocol}
            onChange={(e) => setSelectedProtocol(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          >
            {Object.entries(protocols).map(([key, protocol]) => (
              <option key={key} value={key} className="bg-gray-800">
                {protocol.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Test Scenario
          </label>
          <select
            value={testScenario}
            onChange={(e) => setTestScenario(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          >
            {Object.entries(scenarios).map(([key, scenario]) => (
              <option key={key} value={key} className="bg-gray-800">
                {scenario.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Dataset Size
          </label>
          <input
            type="number"
            value={datasetSize}
            onChange={(e) => setDatasetSize(Math.max(100, Math.min(10000, parseInt(e.target.value) || 1000)))}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            min="100"
            max="10000"
          />
        </div>
      </div>
    </div>
  )
}