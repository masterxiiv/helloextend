// types specific to function handlers
import { RandomDog } from './random-dog'
import { BreedsList } from './breeds-list'

export interface Response {
  statusCode: number
}

export interface ErrorResponse extends Response {
  message: string
}

export interface RandomResponse extends Response {
  body: RandomDog
}

export interface BreedListsResponse extends Response {
  body: BreedsList
}
