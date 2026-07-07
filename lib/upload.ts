// lib/upload.ts
import { config } from './config'

export async function uploadFile(file: File, type: 'avatar' | 'document' = 'document') {
  // Check file size
  if (file.size > config.upload.maxFileSize) {
    throw new Error(`File size exceeds ${config.upload.maxFileSize / 1024 / 1024}MB limit`)
  }

  // Check file type
  const allowedTypes = config.upload.allowedTypes.split(',')
  const isAllowed = allowedTypes.some(type => {
    if (type.includes('*')) {
      const [category] = type.split('/*')
      return file.type.startsWith(category)
    }
    return file.type === type || file.name.endsWith(type.replace('*.', ''))
  })

  if (!isAllowed) {
    throw new Error(`File type not allowed. Allowed: ${config.upload.allowedTypes}`)
  }

  // If using Cloudinary
  if (config.cloudinary.cloudName) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'cooperative')

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${config.cloudinary.cloudName}/${type === 'avatar' ? 'image' : 'auto'}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.secure_url
  }

  // Fallback: Upload to your own API
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Upload failed')
  }

  const data = await response.json()
  return data.url
}