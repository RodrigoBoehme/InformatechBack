import { Router } from 'express'
import { AppDataSource } from '../data-source'
import { RescueRequest } from '../entities/RescueRequest'
import { auth } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { createRequestSchema, updateRequestSchema } from '../schemas/request.schema'
import { upload } from '../config/upload'

export const requestRoutes = Router()

requestRoutes.get('/', auth, async (_req, res) => {
  const repo = AppDataSource.getRepository(RescueRequest)
  const requests = await repo.find({ order: { createdAt: 'DESC' } })
  return res.json(requests)
})

requestRoutes.get('/:id', auth, async (req, res) => {
  const repo = AppDataSource.getRepository(RescueRequest)
  const item = await repo.findOneBy({ id: req.params.id })
  if (!item) return res.status(404).json({ message: 'Pedido não encontrado' })
  return res.json(item)
})

requestRoutes.post('/', auth, upload.single('image'), validate(createRequestSchema), async (req, res) => {
  const repo = AppDataSource.getRepository(RescueRequest)
  const item = repo.create({
    ...req.body,
    requesterId: req.user!.id,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null
  })
  await repo.save(item)
  return res.status(201).json(item)
})

requestRoutes.put('/:id', auth, validate(updateRequestSchema), async (req, res) => {
  const repo = AppDataSource.getRepository(RescueRequest)
  const item = await repo.findOneBy({ id: req.params.id })
  if (!item) return res.status(404).json({ message: 'Pedido não encontrado' })
  if (item.requesterId !== req.user!.id && req.user!.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Sem permissão' })
  }
  repo.merge(item, req.body)
  await repo.save(item)
  return res.json(item)
})

requestRoutes.patch('/:id/accept', auth, async (req, res) => {
  const repo = AppDataSource.getRepository(RescueRequest)
  const item = await repo.findOneBy({ id: req.params.id })
  if (!item) return res.status(404).json({ message: 'Pedido não encontrado' })
  if (item.status !== 'OPEN') return res.status(400).json({ message: 'Pedido não está aberto' })
  item.status = 'IN_PROGRESS'
  item.volunteerId = req.user!.id
  await repo.save(item)
  return res.json(item)
})

requestRoutes.patch('/:id/resolve', auth, async (req, res) => {
  const repo = AppDataSource.getRepository(RescueRequest)
  const item = await repo.findOneBy({ id: req.params.id })
  if (!item) return res.status(404).json({ message: 'Pedido não encontrado' })
  item.status = 'RESOLVED'
  await repo.save(item)
  return res.json(item)
})

requestRoutes.delete('/:id', auth, async (req, res) => {
  const repo = AppDataSource.getRepository(RescueRequest)
  const item = await repo.findOneBy({ id: req.params.id })
  if (!item) return res.status(404).json({ message: 'Pedido não encontrado' })
  if (item.requesterId !== req.user!.id && req.user!.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Sem permissão' })
  }
  await repo.remove(item)
  return res.json({ message: 'Pedido removido' })
})
