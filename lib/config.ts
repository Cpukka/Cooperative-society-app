// lib/config.ts
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'CooperativePro',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
  auth: {
    nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'),
    allowedTypes: process.env.ALLOWED_FILE_TYPES || 'image/*,.pdf,.doc,.docx',
  },
  features: {
    enableOffline: process.env.NEXT_PUBLIC_ENABLE_OFFLINE === 'true',
    enableChat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
    enablePriceAlerts: process.env.NEXT_PUBLIC_ENABLE_PRICE_ALERTS === 'true',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  mpesa: {
    consumerKey: process.env.MPESA_CONSUMER_KEY || '',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
    passkey: process.env.MPESA_PASSKEY || '',
    shortcode: process.env.MPESA_SHORTCODE || '',
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox',
  },
}