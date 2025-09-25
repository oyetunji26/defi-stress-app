// First, install the required dependency:
// npm install @lighthouse-web3/sdk

// app/lib/filecoin.js - REAL FILECOIN IMPLEMENTATION
import lighthouse from '@lighthouse-web3/sdk'


export async function uploadDataToFilecoin(data, metadata) {
  try {
    console.log('📦 Preparing upload...')
    
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY
    console.log('🔑 API Key present:', !!apiKey)
    console.log('🔑 API Key preview:', apiKey ? `${apiKey.substring(0, 8)}...` : 'MISSING')
    
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_LIGHTHOUSE_API_KEY not found in environment variables')
    }

    const payload = {
      data,
      metadata,
      timestamp: Date.now(),
      version: '1.0',
      type: 'defi-stress-test-dataset'
    }

    const jsonString = JSON.stringify(payload, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const filename = `defi-stress-test-${Date.now()}.json`
    const file = new File([blob], filename, { type: 'application/json' })

    console.log('📤 Starting Lighthouse upload...')
    console.log('File size:', (jsonString.length / 1024).toFixed(2), 'KB')

    const response = await lighthouse.upload(
      [file],
      apiKey,
      // false,
      // null,
      (progress) => {
        console.log('Upload progress:', Math.round((progress.loaded / progress.total) * 100) + '%')
      }
    )

    console.log('📋 Upload response:', response)

    if (!response || !response.data || !response.data.Hash) {
      throw new Error('Invalid response from Lighthouse API')
    }

    const cid = response.data.Hash
    console.log('✅ Upload successful! CID:', cid)
    
    return cid

  } catch (error) {
    console.error('❌ Upload error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    })
    throw error
  }
}

export async function downloadDataFromFilecoin(cid) {
  try {
    console.log('📥 Downloading from CID:', cid)
    
    const url = `https://gateway.lighthouse.storage/ipfs/${cid}`
    console.log('🌐 Gateway URL:', url)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ Download successful')
    
    return {
      success: true,
      data,
      cid,
      timestamp: Date.now()
    }

  } catch (error) {
    console.error('❌ Download error:', error)
    throw error
  }
}

// Additional utility functions for real Filecoin integration

export async function getFilecoinStatus(cid) {
  try {
    const status = await lighthouse.getUploads(process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY)
    const upload = status.data.fileList.find(file => file.cid === cid)
    
    if (!upload) {
      return { found: false, message: 'CID not found in your uploads' }
    }

    return {
      found: true,
      filename: upload.fileName,
      size: upload.fileSizeInBytes,
      uploadDate: upload.createdAt,
      cid: upload.cid
    }
  } catch (error) {
    console.error('Error checking Filecoin status:', error)
    return { found: false, error: error.message }
  }
}

export async function getAllUploads() {
  try {
    const response = await lighthouse.getUploads(process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY)
    return {
      success: true,
      uploads: response.data.fileList.map(file => ({
        cid: file.cid,
        filename: file.fileName,
        size: file.fileSizeInBytes,
        uploadDate: file.createdAt,
        accessUrl: `https://gateway.lighthouse.storage/ipfs/${file.cid}`
      }))
    }
  } catch (error) {
    console.error('Error fetching uploads:', error)
    return { success: false, error: error.message }
  }
}