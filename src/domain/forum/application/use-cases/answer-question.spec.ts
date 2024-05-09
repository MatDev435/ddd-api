import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerQuestionRepository } from '../repositories/answers-repository'

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
