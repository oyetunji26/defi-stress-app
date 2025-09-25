// app/components/AnalysisResults.js
import { Shield, AlertTriangle, TrendingUp, Database, DollarSign, Target, Activity, Zap } from 'lucide-react'

export default function AnalysisResults({ analysisResults }) {
  const metrics = [
    {
      title: 'Protocol Stability',
      value: `${analysisResults.protocolStability.toFixed(1)}%`,
      icon: Shield,
      color: analysisResults.protocolStability > 80 ? 'text-green-400' : 
             analysisResults.protocolStability > 60 ? 'text-yellow-400' : 'text-red-400',
      bgColor: analysisResults.protocolStability > 80 ? 'bg-green-500/20' : 
               analysisResults.protocolStability > 60 ? 'bg-yellow-500/20' : 'bg-red-500/20',
      description: 'Overall protocol health score'
    },
    {
      title: 'High Risk Wallets',
      value: analysisResults.highRiskWallets,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      description: `${((analysisResults.highRiskWallets / analysisResults.totalWallets) * 100).toFixed(1)}% of total wallets`
    },
    {
      title: 'Total Liquidity',
      value: `$${(analysisResults.totalLiquidity / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      description: 'Aggregated protocol liquidity'
    },
    {
      title: 'Vulnerabilities Found',
      value: analysisResults.vulnerabilitiesFound,
      icon: Database,
      color: analysisResults.vulnerabilitiesFound > 50 ? 'text-red-400' : 
             analysisResults.vulnerabilitiesFound > 20 ? 'text-orange-400' : 'text-green-400',
      bgColor: analysisResults.vulnerabilitiesFound > 50 ? 'bg-red-500/20' : 
               analysisResults.vulnerabilitiesFound > 20 ? 'bg-orange-500/20' : 'bg-green-500/20',
      description: 'Critical security issues detected'
    },
    {
      title: 'Average Risk Score',
      value: analysisResults.averageRiskScore.toFixed(1),
      icon: Activity,
      color: analysisResults.averageRiskScore > 70 ? 'text-red-400' : 
             analysisResults.averageRiskScore > 40 ? 'text-orange-400' : 'text-green-400',
      bgColor: analysisResults.averageRiskScore > 70 ? 'bg-red-500/20' : 
               analysisResults.averageRiskScore > 40 ? 'bg-orange-500/20' : 'bg-green-500/20',
      description: 'Mean wallet risk assessment'
    },
    {
      title: 'Max Flash Loan',
      value: `$${(analysisResults.maxFlashLoanExposure / 1000000).toFixed(1)}M`,
      icon: Zap,
      color: analysisResults.maxFlashLoanExposure > 10000000 ? 'text-red-400' : 'text-orange-400',
      bgColor: analysisResults.maxFlashLoanExposure > 10000000 ? 'bg-red-500/20' : 'bg-orange-500/20',
      description: 'Largest flash loan exposure'
    },
    {
      title: 'Liquidation Risk',
      value: analysisResults.liquidationRisk,
      icon: Target,
      color: analysisResults.liquidationRisk > 100 ? 'text-red-400' : 
             analysisResults.liquidationRisk > 50 ? 'text-orange-400' : 'text-green-400',
      bgColor: analysisResults.liquidationRisk > 100 ? 'bg-red-500/20' : 
               analysisResults.liquidationRisk > 50 ? 'bg-orange-500/20' : 'bg-green-500/20',
      description: 'Wallets at risk of liquidation'
    },
    {
      title: 'Avg Collateral Ratio',
      value: `${analysisResults.averageCollateralRatio.toFixed(1)}%`,
      icon: DollarSign,
      color: analysisResults.averageCollateralRatio > 150 ? 'text-green-400' : 
             analysisResults.averageCollateralRatio > 120 ? 'text-yellow-400' : 'text-red-400',
      bgColor: analysisResults.averageCollateralRatio > 150 ? 'bg-green-500/20' : 
               analysisResults.averageCollateralRatio > 120 ? 'bg-yellow-500/20' : 'bg-red-500/20',
      description: 'Average overcollateralization'
    }
  ]

  return (
    <div className="mb-8">
      <div className="glass-card p-6 mb-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-cyan-400" />
          Stress Test Analysis Results
        </h3>
        
        {/* Overall Health Indicator */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Protocol Health Assessment</h4>
              <p className="text-gray-300">
                Based on {analysisResults.totalWallets.toLocaleString()} synthetic wallets tested
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white mb-1">
                {analysisResults.protocolStability > 80 ? '✅' : 
                 analysisResults.protocolStability > 60 ? '⚠️' : '🚨'}
              </div>
              <div className="text-sm text-gray-400">
                {analysisResults.protocolStability > 80 ? 'Healthy' : 
                 analysisResults.protocolStability > 60 ? 'At Risk' : 'Critical'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon
          return (
            <div key={index} className="glass-card p-6 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              
              <div>
                <p className="text-gray-300 text-sm mb-1">{metric.title}</p>
                <p className={`text-3xl font-bold ${metric.color} mb-2`}>
                  {metric.value}
                </p>
                <p className="text-gray-400 text-xs">
                  {metric.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Risk Summary */}
      <div className="glass-card p-6 mt-6">
        <h4 className="text-xl font-bold text-white mb-4">Risk Assessment Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {analysisResults.totalWallets - analysisResults.highRiskWallets - analysisResults.liquidationRisk}
            </div>
            <div className="text-sm text-gray-300">Low Risk Wallets</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-green-400 h-2 rounded-full" 
                style={{
                  width: `${((analysisResults.totalWallets - analysisResults.highRiskWallets - analysisResults.liquidationRisk) / analysisResults.totalWallets) * 100}%`
                }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400 mb-2">
              {analysisResults.liquidationRisk}
            </div>
            <div className="text-sm text-gray-300">Medium Risk Wallets</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-orange-400 h-2 rounded-full" 
                style={{
                  width: `${(analysisResults.liquidationRisk / analysisResults.totalWallets) * 100}%`
                }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-2">
              {analysisResults.highRiskWallets}
            </div>
            <div className="text-sm text-gray-300">High Risk Wallets</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-red-400 h-2 rounded-full" 
                style={{
                  width: `${(analysisResults.highRiskWallets / analysisResults.totalWallets) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}