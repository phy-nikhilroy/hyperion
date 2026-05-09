import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('hyperion-user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (userData, token) => {
    localStorage.setItem('hyperion-user', JSON.stringify(userData))
    localStorage.setItem('hyperion-token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('hyperion-user')
    localStorage.removeItem('hyperion-token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
