import fetch from 'node-fetch'
import { BreedListsResponse, ErrorResponse } from '../interfaces/response-types'
import { BreedsList } from '../interfaces/breeds-list'

export async function handler(): Promise<BreedListsResponse | ErrorResponse> {
    try {
        const res = await fetch('https://dog.ceo/api/breeds/list/all')
        const payload: BreedsList = await res.json()
        return {
            statusCode: 200,
            body: payload,
        }
    } catch (err: unknown) {
        return {
            statusCode: 500,
            message: 'An unknown error occurred',
        }
    }
}
