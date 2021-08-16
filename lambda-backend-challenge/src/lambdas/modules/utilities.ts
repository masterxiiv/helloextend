import { DictionaryArray } from '../interfaces/dictionary-array'

export async function dictionaryToArray(data: DictionaryArray): Promise<string[]> {
  const result: string[] = []

  Object.entries(data).forEach((item) => {
    const key = item[0]
    const value = item[1]
    if (value.length === 0) {
      result.push(key)
    } else {
      value.forEach((subItem) => {
        result.push(`${subItem} ${key}`)
      })
    }
  })

  return result
}
