import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository.ts'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComments: QuestionComment) {
    this.items.push(questionComments)
  }
}
