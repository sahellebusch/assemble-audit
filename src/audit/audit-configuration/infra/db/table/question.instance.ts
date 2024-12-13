import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuditTemplateInstance } from './audit-template.instance';
import { QuestionType } from '../../../domain/value-objects/question-type.value-object';

@Entity('questions')
export class QuestionInstance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ type: 'varchar', length: 20 })
  type: QuestionType;

  @ManyToOne(
    () => AuditTemplateInstance,
    (auditTemplate) => auditTemplate.questions,
  )
  auditTemplate: AuditTemplateInstance;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
