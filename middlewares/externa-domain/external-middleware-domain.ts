import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function externalMiddleware(next: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const url = req.nextUrl.clone()

    if (url.pathname.startsWith('/api/external')) {
      url.pathname = url.pathname.replace('/api/external', '')
      url.href = `https://api2.timedoctor.com${url.pathname}`
      return NextResponse.rewrite(url)
    }

    return next(req, event)
  }
}

export const config = {
  matcher: '/api/external/:path*'
}
