import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      login(data.user, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-base dark:bg-dark-base">
      <div className="w-full max-w-sm px-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-light-primary dark:text-dark-primary">
            Hyperion
          </h1>
          <p className="text-sm text-light-secondary dark:text-dark-secondary mt-1">
            Sign in to your solar dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 shadow-sm space-y-4"
        >
          {error && (
            <p className="text-sm text-light-danger dark:text-dark-danger">{error}</p>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-light-secondary dark:text-dark-secondary">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-light-border dark:border-dark-border bg-light-base dark:bg-dark-base text-light-primary dark:text-dark-primary px-3 py-2 text-sm outline-none focus:border-light-accent dark:focus:border-dark-accent transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-light-secondary dark:text-dark-secondary">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full rounded-lg border border-light-border dark:border-dark-border bg-light-base dark:bg-dark-base text-light-primary dark:text-dark-primary px-3 py-2 text-sm outline-none focus:border-light-accent dark:focus:border-dark-accent transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-light-accent dark:bg-dark-accent text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
