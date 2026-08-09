'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface AdminUser {
  name: string
}

interface AdminContextType {
  isAuthenticated: boolean
  user: AdminUser | null
  login: (key: string) => Promise<{ success: boolean; error: string | null }>
  logout: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

function hasSessionCookie(): boolean {
  if (typeof window === 'undefined') return false
  return document.cookie.includes('admin_session=')
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasSessionCookie)
  const [user, setUser] = useState<AdminUser | null>(null)
  const router = useRouter()

  const login = useCallback(async (key: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setIsAuthenticated(true)
        setUser(data.user)
        return { success: true, error: null }
      } else {
        return { success: false, error: data.error || 'Invalid admin key' }
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      }
    }
  }, [])

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setIsAuthenticated(false)
    setUser(null)
    router.push('/')
    router.refresh()
  }, [router])

  return (
    <AdminContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}
