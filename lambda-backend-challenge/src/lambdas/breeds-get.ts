import fetch from 'node-fetch'
import { Response } from './types'

interface BreedListsResponse extends Response {
    body: BreedsList
}

interface ErrorResponse extends Response {
    message: string
}

interface BreedsList {
    message: string
    status: string
}

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
