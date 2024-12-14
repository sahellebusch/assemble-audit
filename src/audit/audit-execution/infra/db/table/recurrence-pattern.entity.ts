import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AuditInstance } from './audit.instance';
import { RecurrenceFrequency } from '../../../domain/types/recurrence-frequency.enum';

@Entity('recurrence_patterns')
export class RecurrencePatternInstance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RecurrenceFrequency,
  })
  frequency: RecurrenceFrequency;

  @Column()
  interval: number;

  @Column({ nullable: true, type: 'timestamp' })
  endDate?: Date;

  @Column({ type: 'timestamp' })
  nextExecutionDate: Date;

  @OneToOne(() => AuditInstance)
  @JoinColumn()
  audit: AuditInstance;

  @Column()
  auditId: string;
}
