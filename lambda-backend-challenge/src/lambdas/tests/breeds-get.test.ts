import fetch from 'node-fetch'
import { handler } from '../modules/breeds-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('breeds-get handler', () => {
    const mockPayload = { message: 'breed: []' }
    beforeEach(() => {
      mockedFetch.mockReturnValueOnce({
        json: () => {
          return mockPayload
        },
      })
    })
  
    it('returns payload from fetch request', async () => {
      const response = await handler()
      expect(response).toMatchObject({ body: mockPayload })
    })
  })
  