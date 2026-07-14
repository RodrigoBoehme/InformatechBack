import { useCallback, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'
import { Button } from '@/components/Button'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/services/api'
import { colors } from '@/constants/theme'

type RescueRequest = {
  id: string
  title: string
  category: string
  priority: string
  status: string
  description: string
}

export default function Home() {
  const { user, signOut } = useAuth()
  const [requests, setRequests] = useState<RescueRequest[]>([])

  async function loadRequests() {
    const response = await api.get('/requests')
    setRequests(response.data)
  }

  useFocusEffect(useCallback(() => { loadRequests().catch(() => {}) }, []))

  async function accept(id: string) {
    try {
      await api.patch(`/requests/${id}/accept`)
      await loadRequests()
    } catch {
      Alert.alert('Erro', 'Não foi possível aceitar este pedido.')
    }
  }

  async function resolve(id: string) {
    await api.patch(`/requests/${id}/resolve`)
    await loadRequests()
  }

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 54, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, fontWeight: '800', color: colors.secondary }}>Olá, {user?.name}</Text>
      <Text style={{ color: colors.muted, marginBottom: 16 }}>Acompanhe solicitações de resgate e apoio.</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <Button title="Mapa" onPress={() => router.push('/map')} style={{ flex: 1 }} />
        <Button title="Novo pedido" onPress={() => router.push('/new-request')} style={{ flex: 1 }} />
      </View>
      <Button title="Sair" variant="outline" onPress={signOut} />
      <Text style={{ marginTop: 18, marginBottom: 8, fontSize: 18, fontWeight: '800' }}>Pedidos recentes</Text>
      <FlatList
        data={requests}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 10, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, gap: 8 }}>
            <Text style={{ fontSize: 17, fontWeight: '800', color: colors.text }}>{item.title}</Text>
            <Text style={{ color: colors.muted }}>{item.category} • {item.priority} • {item.status}</Text>
            <Text>{item.description}</Text>
            {item.status === 'OPEN' && user?.role === 'VOLUNTEER' && <Button title="Aceitar atendimento" onPress={() => accept(item.id)} />}
            {item.status === 'IN_PROGRESS' && <Button title="Finalizar" variant="outline" onPress={() => resolve(item.id)} />}
          </View>
        )}
      />
    </View>
  )
}
