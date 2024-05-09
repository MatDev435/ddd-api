import { Answer } from '../entities/answer'

export interface AnswerQuestionRepository {
  create(answer: Answer): Promise<void>
}
