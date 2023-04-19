import styled from "styled-components"
import ContentSection from '../components/ContentSection';
import InputBadges from '../components/InputBadges';
import Input from '../elements/Input';
import useInputs from '../hooks/useInputs';
import { SyntheticEvent, useCallback, useState } from 'react';
import { getObjFromKeyArr } from '../utils';
import OptionButtons from "../elements/OptionButtons";
import useOptionButtons from "../hooks/useOptionButtons";

interface Forms {
  [key: string]: string
}

interface AddedDataList {
  [key: string]: string[]
}

function RandomResult() {
  const dataTypes = ['memberName', 'caseName']
  const [forms, onChange, reset, setForms] = useInputs<Forms>(
    getObjFromKeyArr<string>(dataTypes, '')
  )
  const [addedDataList, setAddedDataList] = useState<AddedDataList>(
    getObjFromKeyArr<string[]>(dataTypes, [])
  )
  const [exceptions, onSelectException] = useOptionButtons(
    getObjFromKeyArr<string[]>(dataTypes, [])
  )

  const onSubmit = useCallback((e: SyntheticEvent, dataType: string) => {
    e.preventDefault()
    const newData = forms[dataType]
    setAddedDataList((prev) => ({
      ...prev,
      [dataType]: [...prev[dataType], newData]
    }))
    // reset form
    setForms((prev) => ({...prev, [dataType]: ''}))
  }, [forms, addedDataList])

  const getInputComp = useCallback((dataType: string) => (
    <Input
      name={dataType}
      value={forms[dataType]}
      onChange={onChange}
    />
  ), [forms, onChange])

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
            dataList={addedDataList[dataType]}
            onSubmit={onSubmit}
          />
        </ContentSection>
      ))}
      {
        <ContentSection
          title="예외"
        >
          {dataTypes.map((dataType: string) => (
            <OptionButtons
              key={`${dataType}-exceptions`}
              title={dataType}
              dataType={dataType}
              dataList={addedDataList[dataType]}
              selectedList={exceptions[dataType]}
              onSelect={onSelectException}
            />
          ))}
        </ContentSection>
      }
    </div>
  )
}

export default RandomResult