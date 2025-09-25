// app/components/Header.js
import { Brain, Shield } from 'lucide-react'

export default function Header() {
  return (
    <div className="text-center mb-8 flex flex-col gap-5 pt-12">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Brain className="w-12 h-12 text-cyan-400 animate-pulse-slow" />
        <Shield className="w-12 h-12 text-green-400 animate-pulse-slow" />
      </div>
      <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        DeFi Stress-Tester Agent
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        AI-powered stress testing for DeFi protocols using synthetic data generation and Filecoin storage
      </p>
    </div>
  )
}