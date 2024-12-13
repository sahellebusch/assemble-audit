import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { AuditStatus } from '../../../domain/types/audit-status.enum';
import { AuditType } from '../../../domain/types/audit-types.enum';
import { LineItemInstance } from './line-item.instance';

@Entity('audits')
export class AuditInstance {
  @PrimaryColumn()
  id: string;

  @Column()
  assignedTo: string;

  @Column()
  dueDate: Date;

  @Column({ type: 'enum', enum: AuditType })
  auditType: AuditType;

  @Column({ type: 'enum', enum: AuditStatus })
  status: AuditStatus;

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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
