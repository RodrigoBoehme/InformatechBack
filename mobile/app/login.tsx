import { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Link, router } from 'expo-router'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/contexts/AuthContext'
import { colors } from '@/constants/theme'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    try {
      setLoading(true)
      await signIn(email, password)
      router.push('/home')
    } catch {
      Alert.alert('Erro', 'Não foi possível entrar. Verifique e-mail e senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 14, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 32, fontWeight: '800', color: colors.secondary }}>InformaTech</Text>
      <Text style={{ fontSize: 16, color: colors.muted, marginBottom: 16 }}>Rede solidária para emergências e calamidades.</Text>
      <Input placeholder="E-mail" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Entrar" loading={loading} onPress={handleLogin} />
      <Link href="/register" style={{ color: colors.primary, textAlign: 'center', fontWeight: '700' }}>Criar minha conta</Link>
    </View>
  )
}
