'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface AdminUser {
  name: string
}

interface AdminContextType {
  isAuthenticated: boolean
  user: AdminUser | null
  loading: boolean
  login: (key: string) => Promise<{ success: boolean; error: string | null }>
  logout: () => Promise<void>
  checkSession: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  const checkSession = () => {
    // Basic cookie check purely for client UI state (actual security is server-side via middleware)
    const hasSession = document.cookie.includes('admin_session=')
    setIsAuthenticated(hasSession)
    setLoading(false)
  }

  useEffect(() => {
    checkSession()
  }, [])

  const login = async (key: string) => {
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
    } catch (error: any) {
      return { success: false, error: error.message || 'Authentication failed' }
    }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setIsAuthenticated(false)
    setUser(null)
    window.location.href = '/'
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, user, loading, login, logout, checkSession }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}
