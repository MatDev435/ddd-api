import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete an question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-01',
      questionId: 'question-01',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an question from another author', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        authorId: 'author-02',
        questionId: 'question-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
