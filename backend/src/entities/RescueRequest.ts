import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'

export type RequestStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELED'
export type RequestPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

@Entity('rescue_requests')
export class RescueRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column({ type: 'text' })
  description!: string

  @Column()
  category!: string

  @Column({ type: 'enum', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' })
  priority!: RequestPriority

  @Column({ type: 'enum', enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CANCELED'], default: 'OPEN' })
  status!: RequestStatus

  @Column('decimal', { precision: 10, scale: 7 })
  latitude!: number

  @Column('decimal', { precision: 10, scale: 7 })
  longitude!: number

  @Column({ nullable: true })
  imageUrl!: string

  @Column()
  requesterId!: string

  @ManyToOne(() => User, user => user.requests)
  @JoinColumn({ name: 'requesterId' })
  requester!: User

  @Column({ nullable: true })
  volunteerId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
