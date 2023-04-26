import styled from "styled-components"
import ContentSection from '../components/ContentSection';
import InputBadges from '../components/InputBadges';
import Input from '../elements/Input';
import Button from "../elements/Button";
import useInputs from '../hooks/useInputs';
import { SyntheticEvent, useCallback, useState } from 'react';
import { getObjFromKeyArr, getRandomInt } from '../utils';
import useOptionButtons from "../hooks/useOptionButtons";
import useInputBadges from "../hooks/useInputBadges";
import { Forms, OptionButtonsState } from "../types/common";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_NAME } from "../constants/clientStorage";
import ResultContent from "../components/randomResult/ResultContent";
import ButtonWrapper from "../elements/ButtonWrapper";
import ConditionSettingContent from "../components/randomResult/ConditionSettingContent";

function RandomResult() {
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
  // rolling text
  const [isStartTextRolling, setIsStartTextRolling] = useState(false)
  const TEXT_ROLLING_TIME = 3000

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

  const onClickGetResult = useCallback(async () => {    
    let memberResults: number[] = []
    inputDataList.memberName.forEach((memberName) => {
      const memberResult = getMemberResult(memberName, memberResults)
      memberResults = [...memberResults, memberResult]
    })
    
    setCaseIndexResults(memberResults)
    saveCaseIndexResults(memberResults)
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

  const getInputComp = useCallback((dataType: string) => (
    <Input
      name={dataType}
      value={forms[dataType]}
      onChange={onChange}
      isFocusOn={focusInputDataType === dataType}
    />
  ), [forms, onChange, focusInputDataType])

  const hasBasicData =  inputDataList.memberName.length > 0 && inputDataList.caseName.length > 0

  return (
    <div>
      <H1TitleWrapper>
        <h1>조건 랜덤 뽑기 🫣</h1>
        <Button onClick={onClickResetInputData} styleTheme="primaryLine">전체 재설정</Button>
      </H1TitleWrapper>
      <ContentSection title="⚙️ 기본 설정" styleTheme="wrapContent">
        {dataTypeKeyNames.map((dataTypeKeyName: string, i) => (
          <ContentSection
            key={`${dataTypeKeyName}-addData`}
            title={dataTypes[i].korName}
            styleTheme="row"
          >
            <InputBadges
              InputComp={getInputComp(dataTypeKeyName)}
              dataType={dataTypeKeyName}
              dataList={inputDataList[dataTypeKeyName]}
              onSubmit={onSubmit}
            />
          </ContentSection>
        ))}
      </ContentSection>
      {
        hasBasicData &&
        <ConditionSettingContent 
          dataTypeKeyNames={dataTypeKeyNames}
          exceptions={exceptions}
          dataTypes={dataTypes}
          inputDataList={inputDataList}
          selectedExceptions={selectedExceptions}
          onSelectException={onSelectException}
          addException={addException}
          resetExceptions={resetExceptions}
          deleteException={deleteException}
        />
      }
      <ResultContent
        caseIndexResults={caseIndexResults}
        inputDataList={inputDataList}
        TEXT_ROLLING_TIME={TEXT_ROLLING_TIME}
        isStartTextRolling={isStartTextRolling}
      />
      {
        hasBasicData &&
        <ButtonWrapper>
          <Button
            onClick={onClickGetResult}
            sizeType="large"
            styleTheme="primary"
          >{
            caseIndexResults.length > 0
              ? '🎲 다시 뽑기 🎲' : '🎲 랜덤 뽑기 🎲'
          }</Button>
        </ButtonWrapper>
      }
    </div>
  )
}

const H1TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 10px;
`

export default RandomResult