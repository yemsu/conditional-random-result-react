import styled from "styled-components"
import ContentSection from "../ContentSection"
import ButtonWrapper from "../../elements/ButtonWrapper"
import Button from "../../elements/Button"
import OptionButtons from "../../elements/OptionButtons"
import List from "../../elements/List"
import { useContext } from "react"
import { RandomResultContext } from "../../context/RandomResultContext"

function ConditionSettingContent() {
  const {
    dataTypeKeyNames,
    exceptions,
    dataTypes,
    inputDataList,
    selectedExceptions,
    onSelectException,
    addException,
    resetExceptions,
    deleteException,
  } = useContext(RandomResultContext)

  return (
    <ContentSection title="🛠️ 예외 설정"  styleTheme="wrapContent">
      {dataTypeKeyNames.map((dataTypeKeyName: string, i) => (
        <ContentSection
          key={dataTypeKeyName}
          title={`${dataTypes[i].korName} 선택`}
        >
          <OptionButtons
            key={`${dataTypeKeyName}-exceptions`}
            dataType={dataTypeKeyName}
            dataList={inputDataList[dataTypeKeyName]}
            selectedList={selectedExceptions[dataTypeKeyName]}
            onSelect={onSelectException}
          />
        </ContentSection>
      ))}
      <ButtonWrapper>
        <Button onClick={addException} styleTheme="primary">추가</Button>
        <Button onClick={resetExceptions} styleTheme="primaryLine">취소</Button>
      </ButtonWrapper>
      {
        exceptions.length > 0 &&
        <ContentSection
          title="추가된 예외 설정"
          styleTheme="wrapContent"
        >
          <List
            dataList={exceptions}
            listType="dl"
          >
            {({memberName, caseName}, i) => (
              <ExceptionItem>            
                <dt>{memberName.join(', ')}</dt>
                <dd>
                  {caseName.join(', ')}
                  <Button
                    onClick={() => deleteException(i)}
                    styleTheme="text"
                  >삭제</Button>
                </dd>
              </ExceptionItem>
            )}        
          </List>
        </ContentSection>
      }
    </ContentSection>
  )
}

const ExceptionItem = styled.div`
  display: flex;
  gap: 5px;
  dt {
    &:before {
      content: '❗';
    }
    &:after {
      content: ':';
    }
  }
  dd {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
`

export default ConditionSettingContent 