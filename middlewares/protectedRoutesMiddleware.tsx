import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server'

export function protectedRoutesMiddlware(next: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next({ request: req })

    const isAuthenticated = req.cookies.get('auth')
    const { pathname } = req.nextUrl

    console.log(isAuthenticated)

    if (response) {
      if (!isAuthenticated && pathname.startsWith('/backend')) {
        return NextResponse.redirect(new URL('/auth/sign-in', req.url))
      }

      if (isAuthenticated && pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/backend/dashboard', req.url))
      }

      return response
    }

    return next(req, event)
  }
}
