import { is } from "ramda"
import { DEFAULT_TX_DEADLINE } from "constants/constants"

/* object */
export const record = <T extends object, V>(
  object: T,
  value: V,
  skip?: (keyof T)[]
): Record<keyof T, V> =>
  Object.keys(object).reduce(
    (acc, cur) =>
      Object.assign({}, acc, {
        [cur]: skip?.includes(cur as keyof T) ? object[cur as keyof T] : value,
      }),
    {} as Record<keyof T, V>
  )

export const omitEmpty = (object: object): object =>
  Object.entries(object).reduce((acc, [key, value]) => {
    const next = is(Object, value) ? omitEmpty(value) : value
    return Object.assign({}, acc, value && { [key]: next })
  }, {})

/* array */
export const insertIf = <T>(condition?: any, ...elements: T[]) =>
  condition ? elements : []

/* string */
export const getLength = (text: string) => new Blob([text]).size
export const capitalize = (text: string) =>
  text[0].toUpperCase() + text.slice(1)

export const getDeadlineSeconds = (
  interval: number | undefined = DEFAULT_TX_DEADLINE
) => {
  return Number(Number((Date.now() / 1000).toFixed(0)) + interval * 60)
}
