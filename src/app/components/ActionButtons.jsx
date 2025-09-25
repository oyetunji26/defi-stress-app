// app/components/ActionButtons.js
import { Brain, Upload, Download, Zap } from 'lucide-react'

export default function ActionButtons({
  isGenerating,
  generatedData,
  generateSyntheticData,
  uploadToFilecoin,
  downloadFromFilecoin,
  currentCid
}) {
  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      <button
        onClick={generateSyntheticData}
        disabled={isGenerating}
        className="btn-primary flex items-center gap-2"
      >
        {isGenerating ? (
          <Zap className="w-5 h-5 animate-pulse" />
        ) : (
          <Brain className="w-5 h-5" />
        )}
        {isGenerating ? 'Generating AI Dataset...' : 'Generate Stress Test'}
      </button>
      
      {generatedData.length > 0 && (
        <>
          <button
            onClick={uploadToFilecoin}
            className="btn-secondary flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload to Filecoin
          </button>
          
          <button
            onClick={downloadFromFilecoin}
            disabled={!generatedData.length && !currentCid}
            className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center gap-2 transform hover:scale-105 transition-all duration-200"
          >
            <Download className="w-5 h-5" />
            Download from Filecoin
          </button>
        </>
      )}
    </div>
  )
}