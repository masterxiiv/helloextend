import fetch from 'node-fetch'
import { handler } from '../modules/breeds-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('breeds-get happy path', () => {
  const mockPayload = { message: { dog: [], puppy: ['cute', 'small'] }, status: 'success' }
  const mockResult = { breeds: ['dog', 'cute puppy', 'small puppy'], statusCode: 200 }
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const response = await handler()
    expect(response).toMatchObject(mockResult)
  })
})

describe('breeds-get timeout', () => {
  const mockResult = { statusCode: 500, message: 'An unknown error occurred: timeout' }
  beforeEach(() => {
    mockedFetch.mockRejectedValueOnce(new Error('timeout'))
  })

  it('returns an error message', async () => {
    const response = await handler()
    expect(response).toMatchObject(mockResult)
  })
})
