// app/components/VulnerabilitiesList.js
import { AlertTriangle, Shield, Eye, ExternalLink, Clock, User } from 'lucide-react'

export default function VulnerabilitiesList({ vulnerabilities }) {
  const severityConfig = {
    High: {
      color: 'bg-red-500/20 text-red-300 border-red-500/30',
      icon: '🚨',
      priority: 3
    },
    Medium: {
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      icon: '⚠️',
      priority: 2
    },
    Low: {
      color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      icon: '⚡',
      priority: 1
    }
  }

  // Sort vulnerabilities by severity
  const sortedVulnerabilities = vulnerabilities.sort((a, b) => {
    return severityConfig[b.severity].priority - severityConfig[a.severity].priority
  })

  // Group vulnerabilities by type
  const groupedVulnerabilities = sortedVulnerabilities.reduce((groups, vuln) => {
    const type = vuln.type
    if (!groups[type]) {
      groups[type] = []
    }
    groups[type].push(vuln)
    return groups
  }, {})

  // Calculate severity distribution
  const severityCount = vulnerabilities.reduce((counts, vuln) => {
    counts[vuln.severity] = (counts[vuln.severity] || 0) + 1
    return counts
  }, {})

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-400" />
          Vulnerability Analysis
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-400">{vulnerabilities.length}</div>
          <div className="text-sm text-gray-400">Total Issues</div>
        </div>
      </div>

      {/* Severity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(severityCount).map(([severity, count]) => (
          <div key={severity} className={`p-4 rounded-xl border ${severityConfig[severity].color}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{severityConfig[severity].icon}</span>
                  <span className="font-semibold">{severity} Severity</span>
                </div>
                <div className="text-2xl font-bold">{count}</div>
              </div>
              <div className="text-right text-sm opacity-75">
                {((count / vulnerabilities.length) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vulnerabilities by Type */}
      <div className="space-y-6">
        {Object.entries(groupedVulnerabilities).map(([type, vulns]) => (
          <div key={type} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                {type}
              </h4>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                {vulns.length} instances
              </span>
            </div>
            
            <div className="grid gap-3 max-h-64 overflow-y-auto">
              {vulns.slice(0, 5).map((vuln, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border-l-4 border-red-400 hover:bg-white/10 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 text-xs font-mono">
                            {vuln.wallet.substring(0, 12)}...
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 text-xs">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-2">{vuln.details}</p>
                      
                      {vuln.impact && (
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-red-300">Impact: </span>
                          <span className="text-xs text-gray-300">{vuln.impact}</span>
                        </div>
                      )}
                      
                      {vuln.recommendation && (
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-green-300">Recommendation: </span>
                          <span className="text-xs text-gray-300">{vuln.recommendation}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${severityConfig[vuln.severity].color}`}>
                        {vuln.severity}
                      </span>
                      <button className="p-1 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {vulns.length > 5 && (
                <div className="text-center py-3">
                  <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 mx-auto">
                    <ExternalLink className="w-4 h-4" />
                    View {vulns.length - 5} more {type} vulnerabilities
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {vulnerabilities.length > 50 && (
        <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-blue-300 font-semibold">Large Dataset Detected</p>
              <p className="text-blue-200 text-sm">
                Showing top vulnerabilities. Full report available for download.
              </p>
            </div>
            <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Export Full Report
            </button>
          </div>
        </div>
      )}
    </div>
  )
}