import styled from "styled-components"
import ContentSection from '../components/ContentSection';
import InputBadges from '../components/InputBadges';
import Input from '../elements/Input';
import Button from "../elements/Button";
import useInputs from '../hooks/useInputs';
import { Fragment, SyntheticEvent, useCallback, useState } from 'react';
import { getObjFromKeyArr, getRandomInt } from '../utils';
import OptionButtons from "../elements/OptionButtons";
import useOptionButtons from "../hooks/useOptionButtons";
import useInputBadges from "../hooks/useInputBadges";
import { Forms, OptionButtonsState } from "../types/common";
import List from "../elements/List";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_NAME } from "../constants/clientStorage";

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
  // selected exceptions
  const [selectedExceptions, onSelectException, resetSelectedExceptions] = useOptionButtons(
    getObjFromKeyArr<string[]>(dataTypeKeyNames, [])
  )
  // exceptions
  const [exceptions, setExceptions] = useState<OptionButtonsState[]>([])
  const [saveExceptionData, deleteSavedExceptionData ] = useLocalStorage<OptionButtonsState[]>(STORAGE_NAME.SELECTED_EXCEPTIONS, setExceptions)
  // result
  const [caseIndexResults, setCaseIndexResults] = useState<number[]>([])
  const [saveCaseIndexResults, deleteSaveCaseIndexResults ] = useLocalStorage<number[]>(STORAGE_NAME.CASE_INDEX_RESULTS, setCaseIndexResults)

  const onSubmit = useCallback((e: SyntheticEvent, dataType: string) => {
    e.preventDefault()
    addInputData(forms[dataType], dataType)
  }, [forms, inputDataList])

  const getInputComp = useCallback((dataType: string) => (
    <Input
      name={dataType}
      value={forms[dataType]}
      onChange={onChange}
    />
  ), [forms, onChange])

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
  }, [inputDataList, caseIndexResults])

  return (
    <div>
      <h1>조건 뢴듬 뽑기</h1>
      <ContentSection title="기본 설정">
        <Button onClick={onClickResetInputData}>전체 재설정</Button>
        {dataTypeKeyNames.map((dataTypeKeyName: string, i) => (
          <ContentSection
            key={`${dataTypeKeyName}-addData`}
            title={dataTypes[i].korName}
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
      <ContentSection
        title="조건 설정"
      >
        {dataTypeKeyNames.map((dataTypeKeyName: string, i) => (
          <Fragment key={dataTypeKeyName}>
            <h3>{ dataTypes[i].korName }</h3>
            <OptionButtons
              key={`${dataTypeKeyName}-exceptions`}
              dataType={dataTypeKeyName}
              dataList={inputDataList[dataTypeKeyName]}
              selectedList={selectedExceptions[dataTypeKeyName]}
              onSelect={onSelectException}
            />
          </Fragment>
        ))}
        <Button onClick={addException}>선택한 조건 추가</Button>
        <Button onClick={resetExceptions}>조건 재설정</Button>
        
        <h3>추가된 조건</h3>
        <List
          dataList={exceptions}
        >
          {({memberName, caseName}) => (
            <>            
              {memberName} / {caseName.join(', ')}
            </>
          )}        
        </List>
      </ContentSection>
      {
        caseIndexResults.length > 0 && 
        <ContentSection
          title="뽑기 결과"
        >
          <List dataList={caseIndexResults}>
            {(caseIndexResult: number, i: number) => (
              <>
                <span>{ inputDataList.memberName[i] }</span>
                <span>{ inputDataList.caseName[caseIndexResult] }</span>
              </>
            )}
          </List>
        </ContentSection>
      }
      <Button onClick={onClickGetResult}>{
        caseIndexResults.length > 0
          ? '다시 뽑기' : '랜덤 뽑기'
      }</Button>
    </div>
  )
}

export default RandomResult