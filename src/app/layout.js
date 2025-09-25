// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DeFi Stress-Tester Agent',
  description: 'AI-powered stress testing for DeFi protocols using synthetic data generation and Filecoin storage',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='bg-lines'>{children}
          <Toaster position="top-right" reverseOrder={false} />
        </main>
      </body>
    </html>
  )}