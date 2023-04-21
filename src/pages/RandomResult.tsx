import styled from "styled-components"
import ContentSection from '../components/ContentSection';
import InputBadges from '../components/InputBadges';
import Input from '../elements/Input';
import useInputs from '../hooks/useInputs';
import { SyntheticEvent, useCallback } from 'react';
import { getObjFromKeyArr } from '../utils';
import OptionButtons from "../elements/OptionButtons";
import useOptionButtons from "../hooks/useOptionButtons";
import useInputBadges from "../hooks/useInputBadges";
import { Forms } from "../types/common";

function RandomResult() {
  const dataTypes = ['memberName', 'caseName']
  const [forms, onChange, reset, setForms] = useInputs<Forms>(
    getObjFromKeyArr<string>(dataTypes, '')
  )
  const [inputDataList, addInputData] = useInputBadges(
    getObjFromKeyArr<string[]>(dataTypes, []),
    setForms
  )
  const [exceptions, onSelectException] = useOptionButtons(
    getObjFromKeyArr<string[]>(dataTypes, [])
  )

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
      {
        <ContentSection
          title="예외"
        >
          {dataTypes.map((dataType: string) => (
            <OptionButtons
              key={`${dataType}-exceptions`}
              title={dataType}
              dataType={dataType}
              dataList={inputDataList[dataType]}
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