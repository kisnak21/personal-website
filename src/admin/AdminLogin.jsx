import { useState } from 'react'
import { useAdmin } from '../context/AdminContext.jsx'
import { useNavigate } from 'react-router-dom'
import { Terminal, Key, Shield } from 'lucide-react'

export default function AdminLogin() {
  const [key, setKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await login(key)
      if (result.success) {
        navigate('/admin/dashboard', { replace: true })
      } else {
        setError(result.error || 'Invalid admin key')
      }
    } catch (err) {
      console.error(err)
      setError('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-container rounded-lg border border-outline-variant shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Admin Panel</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Enter your admin API key to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="admin-key" className="block font-code-sm text-code-sm text-on-surface-variant mb-2">
                Admin API Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  id="admin-key"
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your admin key"
                  className="w-full pl-10 pr-4 py-3 bg-bg-primary border border-outline-variant rounded font-code-sm text-code-sm text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none smooth-transition"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                <p className="font-code-sm text-code-sm text-red-500">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !key.trim()}
              className="w-full py-3 bg-primary text-on-primary font-label-caps text-label-caps rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                'Login to Admin Panel'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-outline-variant">
            <div className="flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm">
              <Terminal className="w-4 h-4" />
              <span>Key: `admin_key_2026_kresna_portfolio_secure_xyz789`</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}