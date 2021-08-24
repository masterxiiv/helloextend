import fetch, { Response } from 'node-fetch'
import AbortController from 'abort-controller'
import { BreedListsResponse, BreedsResponse, ErrorResponse } from '../interfaces/response-types'
import { dictionaryToArray } from './utilities'

const apiTimeout = 10000 // 10 seconds in ms

async function CheckResponse(res: Response): Promise<BreedListsResponse | ErrorResponse> {
  try {
    if (res) {
      const payload: BreedsResponse = await res.json()
      const data = await dictionaryToArray(payload.message)
      const result: BreedListsResponse = {
        statusCode: 200,
        breeds: data,
      }
      return result
    }
    return {
      statusCode: 500,
      message: `An error occurred fetching data, invalid or null response`,
    }
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        statusCode: 500,
        message: `An error occurred processing response: ${err.message}`,
      }
    }
    return {
      statusCode: 500,
      message: `An unknown error occurred: ${err.message}`,
    }
  }
}

export async function handler(): Promise<BreedListsResponse | ErrorResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => {
    controller.abort()
  }, apiTimeout)

  try {
    const url = 'https://dog.ceo/api/breeds/list/all'
    const response = await fetch(url, { signal: controller.signal })
    return await CheckResponse(response)
  } catch (err) {
    if (err.name === 'AbortError') {
      // request was aborted
      return {
        statusCode: 408,
        message: `Request timeout exceeded: ${err.message}`,
      }
    }
    return {
      statusCode: 500,
      message: `An unknown error occurred fetching data: ${err.message}`,
    }
  } finally {
    clearTimeout(timeout)
  }
}
