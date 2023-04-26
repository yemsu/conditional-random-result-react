import styled from "styled-components"
import ContentSection from "../ContentSection"
import List from "../../elements/List"
import RollingText from "../../elements/RollingText"

interface ResultContentProps {
  caseIndexResults: number[]
  inputDataList: {[key: string]: string[]}
  TEXT_ROLLING_TIME: number
  isStartTextRolling: boolean
}

function ResultContent(props: ResultContentProps) {
  const {
    caseIndexResults,
    inputDataList,
    TEXT_ROLLING_TIME,
    isStartTextRolling,
  } = props

  if(caseIndexResults.length === 0) return null
  return (
    <ContentSection
      title="뽑기 결과"
      align="center"
      bg="primary-200"
    >
      <List
        dataList={caseIndexResults}
        direction="row"
        listType="dl"
      >
        {(caseIndexResult: number, i: number) => (
          <ResultItem>
            <dt>{ inputDataList.memberName[i] }</dt>
            <dd>
              <RollingText
                rollingTextList={inputDataList.caseName}
                text={inputDataList.caseName[caseIndexResult] || '🎉'}
                isStartRolling={isStartTextRolling}
                rollingTime={TEXT_ROLLING_TIME + (500 * i)}
              />
            </dd>
          </ResultItem>
        )}
      </List>
    </ContentSection>
  )
}

const ResultItem = styled.div`
  padding: 5px;
  background-color: var(--white);
  border-radius: var(--br-m);
  dt {
    font-size: var(--font-size-M-L);
  }
  dd {
    font-size: var(--font-size-X-L);
    font-weight: var(--font-weight-bold);
    color: var(--primary);
  }
`

export default ResultContent