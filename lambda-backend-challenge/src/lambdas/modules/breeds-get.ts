import fetch, { FetchError } from 'node-fetch'
import { BreedListsResponse, BreedsResponse, ErrorResponse } from '../interfaces/response-types'
import { dictionaryToArray } from './utilities'

const apiTimeout = 1000 // 10 seconds in ms

export async function handler(): Promise<BreedListsResponse | ErrorResponse> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all', { timeout: apiTimeout })
    const payload: BreedsResponse = await res.json()

    const data = await dictionaryToArray(payload.message)

    return {
      statusCode: 200,
      breeds: data,
    }
  } catch (err) {
    if (err instanceof FetchError) {
      return {
        statusCode: 400,
        message: `An error occurred fetching data: ${err.message}`,
      }
    }
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
