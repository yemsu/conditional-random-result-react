import styled from 'styled-components';
import GlobalStyle from './global-style'
import ContentSection from './components/ContentSection';
import InputBadges from './components/InputBadges';
import Input from './elements/Input';
import useInputs from './hooks/useInputs';
import { SyntheticEvent, useCallback, useState } from 'react';
import { getObjFromKeyArr, getDataListType } from './utils';

interface Forms {
  [key: string]: string
}

interface AddedDataList {
  [key: string]: string[]
}

function App() {
  const dataTypes = ['memberName', 'caseName']
  const dataListTypes = dataTypes.map((dataType) => getDataListType(dataType))
  const [forms, onChange, reset, setForms] = useInputs<Forms>(
    getObjFromKeyArr<string>(dataTypes, '')
  )
  const [addedDataList, setAddedDataList] = useState<AddedDataList>(
    getObjFromKeyArr<string[]>(dataListTypes, [])
  )

  const onSubmit = useCallback((e: SyntheticEvent, dataType: string) => {
    e.preventDefault()
    const dataListType = getDataListType(dataType)
    const newData = forms[dataType]
    setAddedDataList((prev) => ({
      ...prev,
      [dataListType]: [...prev[dataListType], newData]
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
      <>
        <GlobalStyle />
        <AppStyled>
          {dataTypes.map((dataType: string) => (
            <ContentSection
              key={dataType}
              title={dataType}
            >
              <InputBadges
                InputComp={getInputComp(dataType)}
                dataType={dataType}
                dataList={addedDataList[getDataListType(dataType)]}
                onSubmit={onSubmit}
              />
            </ContentSection>
          ))}
        </AppStyled>
      </>
  );
}

const AppStyled = styled.div`
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  padding: 30px 15px;
`

export default App;
