import { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { api } from '@/services/api'

type User = { id: string; name: string; email: string; phone: string; role: string }

type AuthContextData = {
  user: User | null
  loading: boolean
  signIn(email: string, password: string): Promise<void>
  signUp(data: { name: string; email: string; password: string; phone: string; role: string }): Promise<void>
  signOut(): Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const token = await SecureStore.getItemAsync('InformaTech_token')
        if (token) {
          const response = await api.get('/auth/me')
          setUser(response.data)
        }
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  async function signIn(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password })
    await SecureStore.setItemAsync('InformaTech_token', response.data.token)
    setUser(response.data.user)
  }

  async function signUp(data: { name: string; email: string; password: string; phone: string; role: string }) {
    await api.post('/auth/register', data)
    await signIn(data.email, data.password)
  }

  async function signOut() {
    await SecureStore.deleteItemAsync('InformaTech_token')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
