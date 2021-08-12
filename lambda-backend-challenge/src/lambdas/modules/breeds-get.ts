import fetch from 'node-fetch'
import { BreedListsResponse, BreedsResponse, ErrorResponse } from '../interfaces/response-types'

export async function handler(): Promise<BreedListsResponse | ErrorResponse> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all')
    const payload: BreedsResponse = await res.json()

    const data: string[] = []

    // console.log("Processing response")
    // console.log(payload)

    Object.entries(payload.message).forEach((item) => {
      const key = item[0]
      const value = item[1]
      if (value.length === 0) {
        data.push(key)
      } else {
        value.forEach((sub) => {
          data.push(`${sub} ${key}`)
        })
      }
    })

    return {
      statusCode: 200,
      breeds: data,
    }
  } catch (err) {
    return {
      statusCode: 500,
      message: `An unknown error occurred: ${err.message}`,
    }
  }
}
