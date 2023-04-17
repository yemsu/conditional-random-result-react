import styled from 'styled-components';
import GlobalStyle from './global-style'
import ContentSection from './components/ContentSection';
import InputBadges from './components/InputBadges';
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

  return (
    <>
      <GlobalStyle />
      <AppStyled>
        <ContentSection
          title="멤버"
        >
          <InputBadges
            onChange={onChange}
            onSubmit={onSubmit}
            dataType="memberName"
            inputValue={forms.memberName}
            dataList={addedDataList.memberNames}
            setDataList={setAddedDataList}
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
