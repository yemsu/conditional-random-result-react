import useInputs from '../hooks/useInputs';
import { SyntheticEvent, useCallback, useState, ReactNode, createContext } from 'react';
import { getObjFromKeyArr, getRandomInt } from '../utils';
import useOptionButtons from "../hooks/useOptionButtons";
import useInputBadges from "../hooks/useInputBadges";
import { Forms, OptionButtonsState } from "../types/common";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_NAME } from "../constants/clientStorage";

interface RandomResultContextType {
  // data type
  dataTypeKeyNames: string[]
  dataTypes: {[key: string]: string}[]
  // states
  forms: Forms
  inputDataList: {[key: string]: string[]}
  selectedExceptions: {[key: string]: string[]}
  exceptions: OptionButtonsState[]
  caseIndexResults: number[]
  isStartTextRolling: boolean
  focusInputDataType: string
  TEXT_ROLLING_TIME: number
  timeGetResult: string
  // functions
  onSubmit: (e: SyntheticEvent, dataType: string) => void
  onChange: (e: SyntheticEvent) => void
  onSelectException: (option:string, dataType: string) => void
  addException: () => void
  onClickResetInputData: () => void
  onClickGetResult: () => void
  resetExceptions: () => void
  deleteException: (i: number) => void
}

const defaultRandomResultContext = {
  // data type
  dataTypeKeyNames: [],
  dataTypes: [],
  // states
  forms: {},
  inputDataList: {},
  selectedExceptions: {},
  exceptions: [],
  caseIndexResults: [],
  isStartTextRolling: false,
  focusInputDataType: '',
  TEXT_ROLLING_TIME: 0,
  timeGetResult: '',
  // functions,
  onSubmit: (e: SyntheticEvent, dataType: string) => {},
  onChange: (e: SyntheticEvent) => {},
  onSelectException: (option:string, dataType: string) => {},
  addException: () => {},
  onClickResetInputData: () => {},
  onClickGetResult: () => {},
  resetExceptions: () => {},
  deleteException: (i: number) => {},
}

export const RandomResultContext = createContext<RandomResultContextType>(defaultRandomResultContext)

export function RandomResultProvider({ children }: {children: ReactNode}) {
  const dataTypes = [
    {keyName: 'memberName', korName: '멤버명'},
    {keyName: 'caseName', korName: '결과값'},
  ]
  const dataTypeKeyNames = dataTypes.map(({ keyName }) => keyName)
  const [forms, onChange, reset, setForms] = useInputs<Forms>(
    getObjFromKeyArr<string>(dataTypeKeyNames, '')
  )
  const [inputDataList, addInputData, resetInputData] = useInputBadges(
    getObjFromKeyArr<string[]>(dataTypeKeyNames, []),
    setForms
  )
  // input focus
  const [focusInputDataType, setFocusInputDataType] = useState('')
  // selected exceptions
  const [selectedExceptions, onSelectException, resetSelectedExceptions] = useOptionButtons(
    getObjFromKeyArr<string[]>(dataTypeKeyNames, [])
  )
  // exceptions
  const [exceptions, setExceptions] = useState<OptionButtonsState[]>([])
  const [saveExceptionData, deleteSavedExceptionData] = useLocalStorage<OptionButtonsState[]>(STORAGE_NAME.SELECTED_EXCEPTIONS, setExceptions)
  // result
  const [caseIndexResults, setCaseIndexResults] = useState<number[]>([])
  const [saveCaseIndexResults, deleteSaveCaseIndexResults ] = useLocalStorage<number[]>(STORAGE_NAME.CASE_INDEX_RESULTS, setCaseIndexResults)
  const [timeGetResult, setTimeGetResult] = useState('')
  const [saveTimeGetResult] = useLocalStorage(STORAGE_NAME.TIME_GET_RESULT, setTimeGetResult)
  // rolling text
  const [isStartTextRolling, setIsStartTextRolling] = useState(false)
  const TEXT_ROLLING_TIME = 3000
  // full result
  const [isShowFullResult, setIsShowFullResult] = useState(false)

  const onSubmit = useCallback((e: SyntheticEvent, dataType: string) => {
    e.preventDefault()
    
    const newData = forms[dataType].trim()
    if(forms[dataType] === '') {
      alert('값을 입력해 주세요!')
      setFocusInputDataType(dataType)
      setTimeout(() => {
        setFocusInputDataType('')
      }, 500);
      return
    }
    if(inputDataList[dataType].includes(newData)) {
      alert('이미 존재하는 값입니다. 값을 다르게 입력해주세요!')
      setFocusInputDataType(dataType)
      setTimeout(() => {
        setFocusInputDataType('')
      }, 500);
      return
    }
    addInputData(newData, dataType)
  }, [forms, inputDataList])

  const addException = useCallback(() => {
    setExceptions(prev => [...prev, selectedExceptions])
    saveExceptionData([...exceptions, selectedExceptions])
    resetSelectedExceptions()
  }, [selectedExceptions])

  const resetExceptions = useCallback(() => {
    setExceptions([])
    resetSelectedExceptions()
    deleteSavedExceptionData()
  }, [])

  const onClickResetInputData = useCallback(() => {
    resetInputData()
    resetExceptions()
    setCaseIndexResults([])
    deleteSaveCaseIndexResults()
  }, [])

  const getMemberResult = useCallback((memberName: string, memberResults: number[]): number => {
    const randomInt = getRandomInt(inputDataList.memberName.length, 0)
    const caseName = inputDataList.caseName[randomInt]
    const isExceptionCase = exceptions.find((exception: OptionButtonsState) => (
      exception.caseName.includes(caseName) && exception.memberName.includes(memberName)
    ))
    if(isExceptionCase || memberResults.includes(randomInt)) {
      return getMemberResult(memberName, memberResults)
    } else {
      return randomInt
    }

  }, [inputDataList, exceptions, caseIndexResults])

  const onClickGetResult = useCallback(() => {    
    let memberResults: number[] = []
    inputDataList.memberName.forEach((memberName) => {
      const memberResult = getMemberResult(memberName, memberResults)
      memberResults = [...memberResults, memberResult]
    })
    
    setCaseIndexResults(memberResults)
    saveCaseIndexResults(memberResults)

    const time = new Date().toLocaleString()
    setTimeGetResult(time)
    saveTimeGetResult(time)

    setIsStartTextRolling(true)
    setTimeout(() => {
      setIsStartTextRolling(false)
    }, TEXT_ROLLING_TIME)
  }, [inputDataList, caseIndexResults])

  const deleteException = useCallback((i: number) => {
    const getResult = (prev: OptionButtonsState[]) => (
      prev.filter((
        _: OptionButtonsState,
        exceptionIndex: number
      ) => exceptionIndex !== i)
    )
    setExceptions(getResult)
    saveExceptionData(getResult(exceptions))
  }, [exceptions])

  return (
    <RandomResultContext.Provider value={{
      dataTypeKeyNames,
      dataTypes,
      forms,
      inputDataList,
      selectedExceptions,
      exceptions,
      caseIndexResults,
      isStartTextRolling,
      focusInputDataType,
      TEXT_ROLLING_TIME,
      timeGetResult,
      onSubmit,
      onChange,
      onSelectException,
      addException,
      onClickResetInputData,
      onClickGetResult,
      resetExceptions,
      deleteException
    }}>
      { children }
    </RandomResultContext.Provider>
  )
}