// app/components/DataVisualization.js
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell, Area, AreaChart } from 'recharts'

const COLORS = ['#06B6D4', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#F97316']

export default function DataVisualization({ generatedData }) {
  // Process data for different visualizations
  const riskDistribution = [
    { range: '0-20', count: generatedData.filter(w => w.riskScore <= 20).length, color: '#10B981' },
    { range: '21-40', count: generatedData.filter(w => w.riskScore > 20 && w.riskScore <= 40).length, color: '#06B6D4' },
    { range: '41-60', count: generatedData.filter(w => w.riskScore > 40 && w.riskScore <= 60).length, color: '#F59E0B' },
    { range: '61-80', count: generatedData.filter(w => w.riskScore > 60 && w.riskScore <= 80).length, color: '#F97316' },
    { range: '81-100', count: generatedData.filter(w => w.riskScore > 80).length, color: '#EF4444' }
  ]

  const collateralVsRisk = generatedData.slice(0, 500).map(wallet => ({
    collateralRatio: wallet.collateralRatio,
    riskScore: wallet.riskScore,
    balance: wallet.balance
  }))

  const liquidityData = generatedData
    .sort((a, b) => b.liquidityProvided - a.liquidityProvided)
    .slice(0, 20)
    .map((wallet, index) => ({
      wallet: `Wallet ${index + 1}`,
      liquidity: wallet.liquidityProvided,
      borrowed: wallet.borrowAmount,
      collateralRatio: wallet.collateralRatio
    }))

  const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    transactions: Math.floor(Math.random() * 1000) + 500,
    volume: Math.floor(Math.random() * 5000000) + 1000000,
    gasPrice: Math.floor(Math.random() * 100) + 20
  }))

  const protocolMetrics = [
    { name: 'Lending', value: generatedData.filter(w => w.riskScore < 40).length, color: '#06B6D4' },
    { name: 'Trading', value: generatedData.filter(w => w.riskScore >= 40 && w.riskScore < 70).length, color: '#10B981' },
    { name: 'High Risk', value: generatedData.filter(w => w.riskScore >= 70).length, color: '#EF4444' }
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
          <p className="text-white font-semibold">{`${label}`}</p>
          {payload.map((pld, index) => (
            <p key={index} style={{ color: pld.color }}>
              {`${pld.dataKey}: ${typeof pld.value === 'number' ? pld.value.toLocaleString() : pld.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Risk Distribution */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          📊 Risk Score Distribution
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="range" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#06B6D4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Collateral vs Risk Correlation */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          📈 Collateral Ratio vs Risk Score Correlation
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={collateralVsRisk}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="collateralRatio" 
              stroke="#9CA3AF"
              label={{ value: 'Collateral Ratio (%)', position: 'insideBottom', offset: -10, fill: '#9CA3AF' }}
            />
            <YAxis 
              dataKey="riskScore" 
              stroke="#9CA3AF"
              label={{ value: 'Risk Score', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter dataKey="riskScore" fill="#F59E0B" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Top Liquidity Providers */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          💰 Top Liquidity Providers Analysis
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={liquidityData}>
            <defs>
              <linearGradient id="liquidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="borrowedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="wallet" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="liquidity"
              stackId="1"
              stroke="#06B6D4"
              fill="url(#liquidityGradient)"
            />
            <Area
              type="monotone"
              dataKey="borrowed"
              stackId="2"
              stroke="#EF4444"
              fill="url(#borrowedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Time Series Analysis */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          ⏱️ 24-Hour Activity Simulation
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="hour" 
              stroke="#9CA3AF"
              label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10, fill: '#9CA3AF' }}
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="transactions" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="gasPrice" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Protocol Usage Distribution */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          🔄 Protocol Usage Distribution
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={protocolMetrics}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {protocolMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="flex flex-col justify-center space-y-4">
            {protocolMetrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: metric.color }}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{metric.name}</span>
                    <span className="text-gray-300">{metric.value}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${(metric.value / generatedData.length) * 100}%`,
                        backgroundColor: metric.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}