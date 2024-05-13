import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionCommentCommentsCommentsRepository } from 'tests/repositories/in-memory-question-comments'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionComments: InMemoryQuestionCommentCommentsCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionComments =
      new InMemoryQuestionCommentCommentsCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionComments,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: 'author-01',
      questionId: question.id.toString(),
      content: 'Test Comment',
    })

    expect(inMemoryQuestionComments.items[0]).toMatchObject({
      content: 'Test Comment',
    })
  })
})
