import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { validate } from '../middlewares/validate'
import { loginSchema, registerSchema } from '../schemas/auth.schema'
import { env } from '../config/env'
import { auth } from '../middlewares/auth'

export const authRoutes = Router()

function safeUser(user: User) {
  return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
}

authRoutes.post('/register', validate(registerSchema), async (req, res) => {
  const repo = AppDataSource.getRepository(User)
  const exists = await repo.findOneBy({ email: req.body.email })
  if (exists) return res.status(409).json({ message: 'E-mail já cadastrado' })

  const user = repo.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    passwordHash: await bcrypt.hash(req.body.password, 10)
  })
  await repo.save(user)
  return res.status(201).json(safeUser(user))
})

authRoutes.post('/login', validate(loginSchema), async (req, res) => {
  const repo = AppDataSource.getRepository(User)
  const user = await repo.findOneBy({ email: req.body.email })
  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' })

  const ok = await bcrypt.compare(req.body.password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' })

  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: '7d' })
  return res.json({ token, user: safeUser(user) })
})

authRoutes.get('/me', auth, async (req, res) => {
  const repo = AppDataSource.getRepository(User)
  const user = await repo.findOneBy({ id: req.user!.id })
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })
  return res.json(safeUser(user))
})
