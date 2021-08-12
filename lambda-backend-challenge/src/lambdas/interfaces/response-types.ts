// types for http responses

export interface Response {
  statusCode: number
}

export interface ErrorResponse extends Response {
  message: string
}

export interface RandomDogResponse extends Response {
  body: {
    message: string
    status: string
  }
}

export interface BreedListsResponse extends Response {
  breeds: string[]
}

export interface BreedsResponse {
  message: Array<string[]>
  status: string
}
