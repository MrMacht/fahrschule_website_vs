import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CORRECT_PASSWORD = 'fahren'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password === CORRECT_PASSWORD) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('site_access', 'granted', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 Tage
    })
    return res
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
