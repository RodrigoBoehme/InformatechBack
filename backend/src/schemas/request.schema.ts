import { z } from 'zod'

export const createRequestSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  category: z.string().min(3),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number()
})

export const updateRequestSchema = createRequestSchema.partial().extend({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CANCELED']).optional()
})
