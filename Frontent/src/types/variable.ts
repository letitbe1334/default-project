export type objectStringNumber = Record<string, string | number | boolean>
export type objectString = Record<string, string>
export type arrayObject = Array<objectStringNumber>
export type arrayString = Array<string>
export type arrayNumber = Array<Number>
export type objectLodash = Record<string, string | number> | null | undefined
export type stringNull = string | null | undefined
export type numberNull = number | null | undefined
// etg lodash 전용 type, any 대신 써도 됨.
