import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { AuditStatus } from '../../../domain/types/audit-status.enum';
import { AuditType } from '../../../domain/types/audit-types.enum';
import { LineItemInstance } from './line-item.instance';

@Entity('audits')
export class AuditInstance {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'uuid' })
  assignedTo: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'varchar', length: 20 })
  auditType: AuditType;

  @Column({ type: 'varchar', length: 20 })
  status: AuditStatus;

  @Column({ nullable: true, type: 'text' })
  ehrProvider: string | null;

  @Column({ nullable: true, type: 'text' })
  patientId: string | null;

  @OneToMany(() => LineItemInstance, (lineItem) => lineItem.audit, {
    cascade: true,
  })
  lineItems: LineItemInstance[];

  @Column('jsonb', { nullable: true })
  ehrData?: {
    patient: any;
    conditions: any[];
    providerId: string;
  };

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
