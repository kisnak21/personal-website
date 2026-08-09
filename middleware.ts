import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const sessionCookie = request.cookies.get('admin_session')?.value

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
      await jwtVerify(sessionCookie, secret, { algorithms: ['HS256'] })
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
