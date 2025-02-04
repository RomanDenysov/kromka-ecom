'use server'

import { cookies } from 'next/headers'

async function acceptCookie() {
  const cookie = await cookies()
  cookie.set('krmk_cookie', 'true', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}

export { acceptCookie }
