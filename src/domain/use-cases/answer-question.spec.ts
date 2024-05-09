import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../entities/answer'
import { AnswerQuestionRepository } from '../repositories/answer-question'

const fakeAnswerQuestionRepository: AnswerQuestionRepository = {
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
