import { Pressable, Text, PressableProps, ActivityIndicator } from 'react-native'
import { colors } from '@/constants/theme'

type Props = PressableProps & { title: string; loading?: boolean; variant?: 'primary' | 'danger' | 'outline' }

export function Button({ title, loading, variant = 'primary', style, ...rest }: Props) {
  const bg = variant === 'danger' ? colors.danger : variant === 'outline' ? 'transparent' : colors.primary
  return (
    <Pressable
      style={[{ backgroundColor: bg, borderWidth: variant === 'outline' ? 1 : 0, borderColor: colors.primary, padding: 14, borderRadius: 12, alignItems: 'center' }, style]}
      {...rest}
    >
      {loading ? <ActivityIndicator /> : <Text style={{ color: variant === 'outline' ? colors.primary : '#fff', fontWeight: '700' }}>{title}</Text>}
    </Pressable>
  )
}
