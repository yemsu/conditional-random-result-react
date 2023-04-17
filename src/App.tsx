import styled from 'styled-components';
import GlobalStyle from './global-style'
import ContentSection from './components/ContentSection';
import InputBadges from './components/InputBadges';
import Input from './elements/Input';
import useInputs from './hooks/useInputs';
import { SyntheticEvent, useCallback, useState } from 'react';

interface Forms {
  [key: string]: string
}

function App() {
  const [forms, onChange, reset, setForms] = useInputs<Forms>({
    memberName: '',
    caseName: ''
  })
  const [addedDataList, setAddedDataList] = useState<{[key: string]: string[]}>({
    memberNames: [],
    caseNames: []
  })

  const onSubmit = useCallback((e: SyntheticEvent, dataType: string) => {
    e.preventDefault()
    const dataListType = `${dataType}s`
    const newData = forms[dataType]
    setAddedDataList((prev) => ({
      ...prev,
      [dataListType]: [...prev[dataListType], newData]
    }))
    // reset form
    setForms((prev) => ({...prev, memberName: ''}))
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
          <ContentSection
            title="멤버"
          >
            <InputBadges
              InputComp={getInputComp('memberName')}
              dataType="memberName"
              dataList={addedDataList.memberNames}
              onSubmit={onSubmit}
            />
          </ContentSection>
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
