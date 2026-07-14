// proxy.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAuth = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  
  // Allow access to auth pages without authentication
  if (isAuthPage) {
    return NextResponse.next()
  }
  
  // Redirect to signin if not authenticated
  if (!isAuth) {
    const signInUrl = new URL('/auth/signin', req.url)
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/members/:path*",
    "/contributions/:path*",
    "/loans/:path*",
    "/meetings/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ]
}