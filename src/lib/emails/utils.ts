// utils/email.ts
import { env } from '~/env'

/**
 * Converts a relative path to an absolute URL for email assets
 * @param path The relative path to the asset (e.g., '/logos/logo-black-rounded.png')
 * @returns The complete URL for the asset
 */
export const getEmailAssetUrl = (path: string): string => {
  // Ensure base URL doesn't end with a slash and path starts with one
  const baseUrl = env.NEXT_PUBLIC_SERVER_URL.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // For development environment, you might want to use a different URL
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000${cleanPath}`
  }

  return `${baseUrl}${cleanPath}`
}

/**
 * Converts product image URLs to absolute URLs
 * @param imageUrl The product image URL (can be relative or absolute)
 * @returns The complete URL for the product image
 */
export const getProductImageUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }

  const baseUrl = env.NEXT_PUBLIC_SERVER_URL.replace(/\/$/, '')
  const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`

  return `${baseUrl}${cleanPath}`
}
