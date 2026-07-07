// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // App
    NEXT_PUBLIC_APP_NAME: string
    NEXT_PUBLIC_APP_URL: string
    NEXT_PUBLIC_API_URL: string

    // Database
    DATABASE_URL: string

    // Auth
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string

    // OAuth
    GOOGLE_CLIENT_ID?: string
    GOOGLE_CLIENT_SECRET?: string
    GITHUB_CLIENT_ID?: string
    GITHUB_CLIENT_SECRET?: string

    // File Upload
    MAX_FILE_SIZE: string
    ALLOWED_FILE_TYPES: string
    CLOUDINARY_CLOUD_NAME?: string
    CLOUDINARY_API_KEY?: string
    CLOUDINARY_API_SECRET?: string

    // Features
    NEXT_PUBLIC_ENABLE_OFFLINE?: string
    NEXT_PUBLIC_ENABLE_CHAT?: string
    NEXT_PUBLIC_ENABLE_PRICE_ALERTS?: string

    // M-Pesa
    MPESA_CONSUMER_KEY?: string
    MPESA_CONSUMER_SECRET?: string
    MPESA_PASSKEY?: string
    MPESA_SHORTCODE?: string
    MPESA_ENVIRONMENT?: string
  }
}