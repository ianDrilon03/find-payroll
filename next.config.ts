import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_TIME_DOCTOR_DOMAIN: process.env.NEXT_PUBLIC_TIME_DOCTOR_DOMAIN,
    NEXT_PUBLIC_DESTINATION: process.env.NEXT_PUBLIC_DESTINATION
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: `${process.env.NEXT_PUBLIC_DESTINATION}`,
        permanent: true
      }
    ]
  }
}

export default nextConfig
