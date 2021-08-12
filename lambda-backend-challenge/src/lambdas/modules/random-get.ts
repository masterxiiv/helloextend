import fetch from 'node-fetch'
import { RandomDogResponse, ErrorResponse } from '../interfaces/response-types'
import { RandomDog } from '../interfaces/random-dog'

export async function handler(): Promise<RandomDogResponse | ErrorResponse> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random')
    const payload: RandomDog = await res.json()
    return {
      statusCode: 200,
      body: payload,
    }
  } catch (err: unknown) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
    }
  }
}
