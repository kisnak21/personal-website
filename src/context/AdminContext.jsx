import { createContext, useContext, useState, useEffect } from 'react'
import { verifyAdminKey, getStoredAdminKey, storeAdminKey, clearAdminKey } from '../api/auth.js'

const AdminContext = createContext(null)

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedKey = getStoredAdminKey()
        if (storedKey) {
          const result = await verifyAdminKey(storedKey)
          if (result.valid) {
            setIsAuthenticated(true)
            setUser(result.data)
          } else {
            clearAdminKey()
          }
        }
      } catch (error) {
        console.error('Admin auth init error:', error)
        clearAdminKey()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (key) => {
    try {
      const result = await verifyAdminKey(key)
      if (result.valid) {
        storeAdminKey(key)
        setIsAuthenticated(true)
        setUser(result.data)
        return { success: true, error: null }
      } else {
        return { success: false, error: result.error || 'Invalid admin key' }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    clearAdminKey()
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}