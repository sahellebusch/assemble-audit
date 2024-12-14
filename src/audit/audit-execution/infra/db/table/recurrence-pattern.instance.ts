import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuditInstance } from './audit.instance';
import { RecurrenceFrequency } from '../../../domain/types/recurrence-frequency.enum';

@Entity('audit_recurrences')
export class RecurrencePatternInstance {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  frequency: RecurrenceFrequency;

  @Column()
  interval: number;

  @Column({ nullable: true, type: 'date' })
  endDate: Date | null;

  @Column({ type: 'date' })
  nextExecutionDate: Date;

  @OneToOne(() => AuditInstance)
  @JoinColumn()
  audit: AuditInstance;

  @Column()
  auditId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
