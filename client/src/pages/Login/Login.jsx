import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Mail, Lock } from 'lucide-react'

const DEV_USER = { id: 'dev-001', name: 'Dev User', email: 'abc@hyperion.dev' }
const DEV_TOKEN = 'dev-token'

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

  const handleDevLogin = () => {
    login(DEV_USER, DEV_TOKEN)
    navigate('/maintenance')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url('/images/solar-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,5,20,0.75) 0%, rgba(0,5,20,0.4) 50%, rgba(0,5,20,0.3) 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* LEFT — Branding */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        paddingLeft: '80px',
        paddingRight: '40px',
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '900',
          letterSpacing: '0.2em',
          color: '#ffffff',
          textShadow: '0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(0,220,200,0.5)',
          marginBottom: '20px',
          lineHeight: 1,
        }}>
          HYPERION
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '1.1rem',
          lineHeight: '1.7',
          maxWidth: '340px',
        }}>
          "Powering Tomorrow with<br />the Energy of the Sun"
        </p>
      </div>

      {/* RIGHT — Login Card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(8, 18, 40, 0.5)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '20px',
          padding: '32px 40px',
          boxShadow: '0 0 0 1.5px rgba(0,220,200,0.4), 0 0 40px rgba(0,220,200,0.08), 0 25px 60px rgba(0,0,0,0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>

          {/* Login header */}
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.6rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '4px',
            letterSpacing: '0.05em',
          }}>
            Login
          </h2>

          {error && (
            <p style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
              {error}
            </p>
          )}

          {/* Email field */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.06)',
            boxShadow: '0 0 12px rgba(0,220,200,0.15), inset 0 0 0 1px rgba(0,220,200,0.4)',
          }}>
            <Mail size={16} color="rgba(0,220,200,0.9)" style={{ flexShrink: 0 }} />
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="youremail@domain.com"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '0.9rem',
                caretColor: '#00dcc8',
              }}
            />
          </div>

          {/* Password field */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.06)',
            boxShadow: '0 0 12px rgba(0,220,200,0.15), inset 0 0 0 1px rgba(0,220,200,0.4)',
          }}>
            <Lock size={16} color="rgba(0,220,200,0.9)" style={{ flexShrink: 0 }} />
            <input
              type="password"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Password"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '0.9rem',
                caretColor: '#00dcc8',
              }}
            />
          </div>

          {/* Login button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 100%)',
              color: '#0a0f1e',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              boxShadow: '0 0 24px rgba(16,185,129,0.4), 0 0 40px rgba(245,158,11,0.2)',
              transition: 'opacity 0.2s, transform 0.1s',
              marginTop: '4px',
            }}
          >
            {loading ? 'Signing in…' : 'Log In'}
          </button>

          {/* Forgot password */}
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              margin: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
          >
            Forgot Password?
          </p>

          {/* Sign up */}
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
            Don't have an account?{' '}
            <span style={{
              color: '#ffffff',
              fontWeight: '700',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}>
              Sign Up
            </span>
          </p>

          {/* Dev login */}
          {import.meta.env.DEV && (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                marginTop: '4px',
              }}>
                <div style={{ flex: 1, borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>dev only</span>
                <div style={{ flex: 1, borderTop: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <button
                type="button"
                onClick={handleDevLogin}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Quick Dev Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}