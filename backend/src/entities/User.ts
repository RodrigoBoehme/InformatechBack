import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RescueRequest } from './RescueRequest'

export type UserRole = 'REQUESTER' | 'VOLUNTEER' | 'ADMIN'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ unique: true })
  email!: string

  @Column()
  passwordHash!: string

  @Column()
  phone!: string

  @Column({ type: 'enum', enum: ['REQUESTER', 'VOLUNTEER', 'ADMIN'], default: 'REQUESTER' })
  role!: UserRole

  @CreateDateColumn()
  createdAt!: Date

  @OneToMany(() => RescueRequest, request => request.requester)
  requests!: RescueRequest[]
}
