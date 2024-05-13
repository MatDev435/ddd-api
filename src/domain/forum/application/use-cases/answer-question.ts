import { Either, right } from '@/core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerQuestionRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionUseCase {
  constructor(private answerQuestionRepository: AnswerQuestionRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(instructorId),
      content,
    })

    await this.answerQuestionRepository.create(answer)

    return right({ answer })
  }
}
