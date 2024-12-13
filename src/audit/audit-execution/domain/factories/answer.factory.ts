import { Injectable } from '@nestjs/common';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswerFactory {
  createNew(questionId: string, result: boolean, comment?: string): Answer {
    return new Answer(questionId, result, comment);
  }

  reconstitute(data: any): Answer {
    return new Answer(
      data.questionId,
      data.result,
      data.comment,
      new Date(data.answeredAt),
    );
  }
}
