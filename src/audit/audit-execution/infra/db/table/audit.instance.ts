import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuditStatus } from '../../../domain/enums/audit-status.value-object';
import { AuditTemplateInstance } from 'src/audit/audit-configuration/infra/db/table/audit-template.instance';

@Entity('audits')
export class AuditInstance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AuditTemplateInstance, { eager: true })
  template: AuditTemplateInstance;

  @Column({
    type: 'varchar',
    length: 20,
    default: AuditStatus.Pending,
  })
  status: AuditStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  assignedTo: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ type: 'json', nullable: true })
  answers: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
