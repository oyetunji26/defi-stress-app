// app/page.js
'use client'

import { useState } from 'react'
import Header from './components/Header'
import ConfigurationPanel from './components/ConfigurationPanel'
import ScenarioDetails from './components/ScenarioDetails'
import ActionButtons from './components/ActionButtons'
import AnalysisResults from './components/AnalysisResults'
import VulnerabilitiesList from './components/VulnerabilitiesList'
import DataVisualization from './components/DataVisualization'
import Footer from './components/Footer'
import { useStressTester } from './hooks/useStressTester'

export default function Home() {
  const {
    selectedProtocol,
    setSelectedProtocol,
    testScenario,
    setTestScenario,
    datasetSize,
    setDatasetSize,
    analysisResults,
    isGenerating,
    generatedData,
    vulnerabilities,
    generateSyntheticData,
    uploadToFilecoin,
    downloadFromFilecoin,
    currentCid
  } = useStressTester()

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <Header />
        
        <ConfigurationPanel
          selectedProtocol={selectedProtocol}
          setSelectedProtocol={setSelectedProtocol}
          testScenario={testScenario}
          setTestScenario={setTestScenario}
          datasetSize={datasetSize}
          setDatasetSize={setDatasetSize}
        />
        
        <ScenarioDetails
          selectedProtocol={selectedProtocol}
          testScenario={testScenario}
        />
        
        <ActionButtons
          isGenerating={isGenerating}
          generatedData={generatedData}
          generateSyntheticData={generateSyntheticData}
          uploadToFilecoin={uploadToFilecoin}
          downloadFromFilecoin={downloadFromFilecoin}
          currentCid={currentCid}
        />
        
        {analysisResults && (
          <AnalysisResults analysisResults={analysisResults} />
        )}
        
        {vulnerabilities.length > 0 && (
          <VulnerabilitiesList vulnerabilities={vulnerabilities} />
        )}
        
        {generatedData.length > 0 && (
          <DataVisualization generatedData={generatedData} />
        )}
        
        <Footer />
      </div>
    </main>
  )
}