import { SignJWT, jwtVerify } from 'jose'
import type { JWTPayload } from 'jose'
import { cookies } from 'next/headers'
import type { Session } from './types'

const secretKey = process.env.SESSION_SECRET
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key)
}

export async function decrypt(input: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch {
    return null
  }
}

export async function login(apiKeyData: { id: string; name: string }) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ id: apiKeyData.id, name: apiKeyData.name })

  const cookieStore = await cookies()
  cookieStore.set('admin_session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set('admin_session', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (!session) return null

  const payload = await decrypt(session)
  if (!payload || typeof payload.id !== 'string' || typeof payload.name !== 'string') {
    return null
  }

  return { id: payload.id, name: payload.name }
}
