import { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/services/api'
import { colors } from '@/constants/theme'

export default function NewRequest() {
  const [form, setForm] = useState({ title: '', description: '', category: 'Resgate', priority: 'HIGH', latitude: '', longitude: '' })
  const [loading, setLoading] = useState(false)

  async function useMyLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') return Alert.alert('Localização', 'Permita o acesso à localização.')
    const location = await Location.getCurrentPositionAsync({})
    setForm({ ...form, latitude: String(location.coords.latitude), longitude: String(location.coords.longitude) })
  }

  async function save() {
    try {
      setLoading(true)
      await api.post('/requests', form)
      router.replace('/home')
    } catch {
      Alert.alert('Erro', 'Não foi possível criar o pedido.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 54, gap: 12, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 26, fontWeight: '800', color: colors.secondary }}>Novo pedido</Text>
      <Input placeholder="Título" value={form.title} onChangeText={title => setForm({ ...form, title })} />
      <Input placeholder="Descrição" value={form.description} onChangeText={description => setForm({ ...form, description })} multiline />
      <Input placeholder="Categoria" value={form.category} onChangeText={category => setForm({ ...form, category })} />
      <Input placeholder="Prioridade: LOW, MEDIUM, HIGH, CRITICAL" value={form.priority} onChangeText={priority => setForm({ ...form, priority })} />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Input placeholder="Latitude" value={form.latitude} onChangeText={latitude => setForm({ ...form, latitude })} style={{ flex: 1 } as any} />
        <Input placeholder="Longitude" value={form.longitude} onChangeText={longitude => setForm({ ...form, longitude })} style={{ flex: 1 } as any} />
      </View>
      <Button title="Usar minha localização" variant="outline" onPress={useMyLocation} />
      <Button title="Salvar pedido" loading={loading} onPress={save} />
      <Button title="Voltar" variant="outline" onPress={() => router.back()} />
    </View>
  )
}
