import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComments } from 'tests/factories/make-answer-comment'
import { InMemoryAnswerCommentsCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository =
      new InMemoryAnswerCommentsCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComments({ answerId: new UniqueEntityID('answer-01') }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComments({ answerId: new UniqueEntityID('answer-01') }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComments({ answerId: new UniqueEntityID('answer-01') }),
    )

    const { answerComments } = await sut.execute({
      answerId: 'answer-01',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComments({ answerId: new UniqueEntityID('answer-01') }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-01',
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
