import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'tests/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('answer-01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-01',
      answerId: 'answer-01',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer from another author', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('answer-01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        authorId: 'author-02',
        answerId: 'answer-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
