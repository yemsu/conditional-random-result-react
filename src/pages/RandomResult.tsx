import styled from "styled-components"
import ContentSection from '../components/ContentSection';
import InputBadges from '../components/InputBadges';
import Input from '../elements/Input';
import Button from "../elements/Button";
import useInputs from '../hooks/useInputs';
import { SyntheticEvent, useCallback, useState } from 'react';
import { getObjFromKeyArr } from '../utils';
import OptionButtons from "../elements/OptionButtons";
import useOptionButtons from "../hooks/useOptionButtons";
import useInputBadges from "../hooks/useInputBadges";
import { Forms, OptionButtonsState } from "../types/common";
import List from "../elements/List";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_NAME } from "../constants/clientStorage";

function RandomResult() {
  const dataTypes = ['memberName', 'caseName']
  const [forms, onChange, reset, setForms] = useInputs<Forms>(
    getObjFromKeyArr<string>(dataTypes, '')
  )
  const [inputDataList, addInputData, resetInputData] = useInputBadges(
    getObjFromKeyArr<string[]>(dataTypes, []),
    setForms
  )
  const [selectedExceptions, onSelectException, resetSelectedExceptions] = useOptionButtons(
    getObjFromKeyArr<string[]>(dataTypes, [])
  )
  const [exceptions, setExceptions] = useState<OptionButtonsState[]>([])
  const [saveExceptionData, deleteSavedExceptionData ] = useLocalStorage<OptionButtonsState[]>(STORAGE_NAME.SELECTED_EXCEPTIONS, setExceptions)

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

  const onClickResetInputData = useCallback(() => {
    resetInputData()
    resetSelectedExceptions()
  }, [])

  const addException = useCallback(() => {
    setExceptions(prev => [...prev, selectedExceptions])
    saveExceptionData([...exceptions, selectedExceptions])
    resetSelectedExceptions()
  }, [selectedExceptions])

  const resetExceptions = useCallback(() => {
    setExceptions([])
    resetSelectedExceptions()
  }, [])

  return (
    <div>
      {dataTypes.map((dataType: string) => (
        <ContentSection
          key={`${dataType}-addData`}
          title={dataType}
        >
          <InputBadges
            InputComp={getInputComp(dataType)}
            dataType={dataType}
            dataList={inputDataList[dataType]}
            onSubmit={onSubmit}
          />
        </ContentSection>
      ))}
      <Button onClick={onClickResetInputData}>resetInputData</Button>
      {
        <ContentSection
          title="예외"
        >
          {dataTypes.map((dataType: string) => (
            <>
              <h3>{ dataType }</h3>
              <OptionButtons
                key={`${dataType}-exceptions`}
                dataType={dataType}
                dataList={inputDataList[dataType]}
                selectedList={selectedExceptions[dataType]}
                onSelect={onSelectException}
              />
            </>
          ))}
        </ContentSection>
      }
      <Button onClick={addException}>예외 추가하기</Button>
      <Button onClick={resetExceptions}>resetExceptions</Button>
      
      <h3>추가된 예외</h3>
      <List
        dataList={exceptions}
      >
        {({memberName, caseName}) => (
          <>            
            멤버: {memberName}
            예외: {caseName}
          </>
        )}        
      </List>
    </div>
  )
}

export default RandomResult