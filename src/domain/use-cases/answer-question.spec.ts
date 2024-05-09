import { AnswerQuestionRepository } from '../forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerQuestionUseCase } from '../forum/application/use-cases/answer-question'

const fakeAnswerQuestionRepository: AnswerQuestionRepository = {
  // eslint-disable-next-line
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerQuestionRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
