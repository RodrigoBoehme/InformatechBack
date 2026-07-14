import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import { colors } from '@/constants/theme'

export default function Index() {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) router.replace(user ? '/home' : '/login')
  }, [loading, user])

  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}><ActivityIndicator /></View>
}
