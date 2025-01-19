import assert from "assert"

export const checkEnv = (variable: string) => {
  assert(process.env[variable], `Env ${variable} undefined`)
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const random = (from: number, to: number) =>
  Math.floor(Math.random() * (to - from + 1) + from)

export const clearDuplicates = <T extends string>(array: T[]): T[] => {
  return Array.from(new Set(array))
}

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
