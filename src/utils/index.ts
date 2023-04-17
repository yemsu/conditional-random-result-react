export const getObjFromKeyArr = <ValueType>(
  keyArr: string[],
  value: ValueType
): {[key: string]: ValueType} => {
  return keyArr.reduce((result, key) => {
    return {...result, [key]: value}
  }, {})
}

export const getDataListType = (singleDataType: string) => `${singleDataType}s`