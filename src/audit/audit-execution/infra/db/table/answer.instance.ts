import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuditInstance } from './audit.instance';
import { QuestionInstance } from 'src/audit/audit-configuration/infra/db/table/question.instance';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AuditInstance, (audit) => audit.id, { onDelete: 'CASCADE' })
  audit: AuditInstance;

  @ManyToOne(() => QuestionInstance, (question) => question.id, {
    onDelete: 'CASCADE',
  })
  question: QuestionInstance;

  @Column({ type: 'text', nullable: true })
  textAnswer: string;

  @Column({ type: 'boolean', nullable: true })
  isCompliant: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
