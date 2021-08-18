import fetch, { Response } from 'node-fetch'
import { BreedListsResponse, BreedsResponse, ErrorResponse } from '../interfaces/response-types'
import { dictionaryToArray } from './utilities'

const apiTimeout = 10000 // 10 seconds in ms

async function CheckResponse(res: Response): Promise<BreedListsResponse | ErrorResponse> {
  if (res.ok) {
    try {
      const payload: BreedsResponse = await res.json()
      const data = await dictionaryToArray(payload.message)
      return {
        statusCode: 200,
        breeds: data,
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
  } else {
    return {
      statusCode: res.status,
      message: `An error occurred fetching data: ${res.statusText}`,
    }
  }
}

export async function handler(): Promise<BreedListsResponse | ErrorResponse> {
  const res = await fetch('https://dog.ceo/api/breeds/list/all', { timeout: apiTimeout }).then(
    CheckResponse,
  )
  return res
}
