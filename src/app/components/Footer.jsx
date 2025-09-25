// app/components/Footer.js
import { Brain, Shield, Github, Twitter, Globe, Mail, Heart, Zap, Database, Code } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/oyetunji26' },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/iamgoke_' },
    { name: 'Website', icon: Globe, href: 'https://my-portfolio-tau-pearl-54.vercel.app/' },
    { name: 'Contact', icon: Mail, href: 'mailto:oyetunjie5@gmail.com' }
  ]

  const features = [
    { name: 'AI-Powered Analysis', icon: Brain, description: 'Advanced machine learning algorithms' },
    { name: 'Decentralized Storage', icon: Database, description: 'Filecoin integration for data persistence' },
    { name: 'Security Testing', icon: Shield, description: 'Comprehensive vulnerability detection' },
    { name: 'Open Source', icon: Code, description: 'Built with modern web technologies' }
  ]

  return (
    <footer className="mt-16 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="glass-card p-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-cyan-400" />
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">DeFi Stress-Tester</h3>
                <p className="text-sm text-gray-400">Agent v1.0</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              Advanced AI-powered stress testing platform for DeFi protocols using synthetic data generation 
              and decentralized storage on Filecoin network.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for the DeFi community</span>
            </div>
          </div>

          {/* Features Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
            <div className="space-y-3">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      <IconComponent className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{feature.name}</div>
                      <div className="text-gray-400 text-xs">{feature.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Links & Stats Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Connect & Learn</h4>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {links.map((link, index) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
                    title={link.name}
                  >
                    <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </a>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h5 className="text-white font-medium mb-3 text-sm">Platform Stats</h5>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-cyan-400 font-bold text-lg">1M+</div>
                  <div className="text-gray-400 text-xs">Wallets Tested</div>
                </div>
                <div>
                  <div className="text-green-400 font-bold text-lg">50+</div>
                  <div className="text-gray-400 text-xs">Protocols Analyzed</div>
                </div>
                <div>
                  <div className="text-purple-400 font-bold text-lg">99.9%</div>
                  <div className="text-gray-400 text-xs">Uptime</div>
                </div>
                <div>
                  <div className="text-orange-400 font-bold text-lg">24/7</div>
                  <div className="text-gray-400 text-xs">AI Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">Powered By</h4>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Next.js 14</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>AI/ML Models</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Database className="w-4 h-4 text-green-400" />
              <span>Filecoin Network</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Code className="w-4 h-4 text-purple-400" />
              <span>React </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Web3 Integration</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-6 pt-6 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} DeFi Stress-Tester Agent. -- Oyetunji Olagoke.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
            <p className="text-cyan-300 text-sm font-medium">
              🏆 Hackathon Project: AI + Filecoin Integration for DeFi Security
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}