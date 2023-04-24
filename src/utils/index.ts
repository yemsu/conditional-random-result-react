export const getObjFromKeyArr = <ValueType>(
  keyArr: string[],
  value: ValueType
): {[key: string]: ValueType} => {
  return keyArr.reduce((result, key) => {
    return {...result, [key]: value}
  }, {})
}

export const getDataListType = (singleDataType: string) => `${singleDataType}s`

export const getRandomInt = (max: number, min: number): number => {
  const randomNum = Math.random()
  return Math.floor(randomNum * max) + min
}