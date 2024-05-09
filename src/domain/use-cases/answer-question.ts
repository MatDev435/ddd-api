import { Answer } from '../entities/answer'
import { AnswerQuestionRepository } from '../repositories/answer-question'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerQuestionRepository: AnswerQuestionRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      questionId,
      authorId: instructorId,
      content,
    })

    await this.answerQuestionRepository.create(answer)

    return answer
  }
}
