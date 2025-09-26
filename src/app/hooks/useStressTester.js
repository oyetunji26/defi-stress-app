// app/hooks/useStressTester.js
import { useState } from 'react'
import { generateSyntheticDataset } from '../lib/dataGenerators'
import { uploadDataToFilecoin, downloadDataFromFilecoin } from '../lib/filecoin'
import toast from 'react-hot-toast'

export function useStressTester() {
  const [selectedProtocol, setSelectedProtocol] = useState('lending')
  const [testScenario, setTestScenario] = useState('flash_loan_attack')
  const [datasetSize, setDatasetSize] = useState(1000)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [ isUploading, setIsUploading] = useState(false)
  const [ isDownloading, setIsDownloading] = useState(false)
  const [generatedData, setGeneratedData] = useState([])
  const [vulnerabilities, setVulnerabilities] = useState([])

  const [currentCid, setCurrentCid] = useState(null)

  const generateSyntheticData = async () => {
    setIsGenerating(true)
    
    try {
      // Simulate AI-powered data generation with realistic delays
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const { data, vulnerabilities: vulns } = await generateSyntheticDataset({
        protocol: selectedProtocol,
        scenario: testScenario,
        size: datasetSize
      });
      
      setGeneratedData(data)
      setVulnerabilities(vulns)
      
      // Generate comprehensive analysis results
      const results = {
        totalWallets: data.length,
        averageRiskScore: data.reduce((sum, w) => sum + w.riskScore, 0) / data.length,
        highRiskWallets: data.filter(w => w.riskScore > 80).length,
        totalLiquidity: data.reduce((sum, w) => sum + w.liquidityProvided, 0),
        vulnerabilitiesFound: vulns.length,
        protocolStability: Math.max(0, 100 - (vulns.length / data.length) * 100),
        averageCollateralRatio: data.reduce((sum, w) => sum + w.collateralRatio, 0) / data.length,
        maxFlashLoanExposure: Math.max(...data.map(w => w.flashLoanAmount || 0)),
        liquidationRisk: data.filter(w => w.collateralRatio < 110).length
      }
      
      setAnalysisResults(results)
    } catch (error) {
      console.error('Error generating synthetic data:', error)
    } finally {
      setIsGenerating(false)
    }
  }

const uploadToFilecoin = async () => {
  setIsUploading(true);
  try {
    console.log('🚀 Starting upload process...')
    console.log('Data to upload:', {
      generatedDataLength: generatedData.length,
      analysisResults: analysisResults,
      hasData: !!generatedData,
      hasResults: !!analysisResults
    })
    
    const cid = await uploadDataToFilecoin(generatedData, analysisResults)

    setCurrentCid(cid);
    
    console.log('✅ Upload successful, CID:', cid)
    toast.success(`Dataset successfully uploaded to Filecoin!\nCID: ${cid}\nData is now permanently stored on the decentralized network.`)
    
  } catch (error) {
    console.error('❌ Upload failed - Full error:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    toast.error(`Upload failed: ${error.message}`)
  } finally {
    setIsUploading(false);
  }
}

const downloadFromFilecoin = async () => {
  setIsDownloading(true);
  try {
    const data = await downloadDataFromFilecoin(currentCid);
    
    // Create formatted JSON
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Calculate file size
    const fileSize = (blob.size / 1024 / 1024).toFixed(2); // MB
    
    const url = URL.createObjectURL(blob);
    
    // Generate descriptive filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `${selectedProtocol}-${testScenario}-${datasetSize}wallets-${timestamp}.json`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Dataset downloaded successfully!\nFile: ${filename}\nSize: ${fileSize} MB\nData retrieved from Filecoin CID: ${currentCid}`);
    
  } catch (error) {
    console.error('Download failed:', error);
    toast.error('Download from Filecoin failed. Please check the CID and try again.');
  } finally {
    setIsDownloading(false);
  }
};

  return {
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
    currentCid,
    isUploading,
    isDownloading
  }
}
