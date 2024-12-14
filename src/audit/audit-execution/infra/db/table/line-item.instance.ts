import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LineItemType } from '../../../domain/types/line-item-type.enum';
import { AuditInstance } from './audit.instance';

@Entity('line_items')
export class LineItemInstance {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'text' })
  prompt: string;

  @Column({ type: 'text' })
  type: LineItemType;

  @Column({ nullable: true })
  response: boolean | null;

  @Column({ nullable: true })
  comment: string | null;

  @Column({ nullable: true })
  answeredAt: Date | null;

  @ManyToOne(() => AuditInstance, (audit) => audit.lineItems, {
    onDelete: 'CASCADE',
  })
  audit: AuditInstance;

  @Column()
  auditId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
