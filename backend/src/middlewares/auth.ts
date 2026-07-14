import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string }
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: 'Token não informado' })

  const [, token] = header.split(' ')
  if (!token) return res.status(401).json({ message: 'Token inválido' })

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { id: string; role: string }
    req.user = decoded
    return next()
  } catch {
    return res.status(401).json({ message: 'Token expirado ou inválido' })
  }
}
