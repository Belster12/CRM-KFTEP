import {type NextRequest, NextResponse } from 'next/server'
import { createClient } from './lib/server'
 
export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabase = await createClient()

  const {data: {user}} = await supabase.auth.getUser()
const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  if (!user && !isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!auth|_next|api).*)']
}