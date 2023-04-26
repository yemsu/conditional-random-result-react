import styled from "styled-components"
import ContentSection from "../ContentSection"
import List from "../../elements/List"
import RollingText from "../../elements/RollingText"
import { useCallback, useContext, useEffect, useState } from "react"
import { RandomResultContext } from "../../context/RandomResultContext"
import Button from "../../elements/Button"
import ButtonWrapper from "../../elements/ButtonWrapper"

function ResultContent() {
  const {
    caseIndexResults,
    inputDataList,
    TEXT_ROLLING_TIME,
    isStartTextRolling,
    timeGetResult,
  } = useContext(RandomResultContext)
  const [isFullMode, setIsFullMode] = useState(false)

  useEffect(() => {
    isStartTextRolling && setIsFullMode(true)
  }, [isStartTextRolling])

  const onClickEndFullMode = useCallback(() => {
    setIsFullMode(false)
  }, [])

  return (
    <Wrapper className={isFullMode ? 'full' : ''}>
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
        <DateText>🕓{ timeGetResult }</DateText>
      </ContentSection>
      {
        isFullMode &&
        <ButtonWrapper>
          <Button onClick={onClickEndFullMode} styleTheme="text">
            닫기
          </Button>
        </ButtonWrapper>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  &.full {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 15px;
    background-color: var(--primary-200);
    > button {
    }
  }
`

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

const DateText = styled.p`
  margin-top: 10px;
  font-size: var(--font-size-S);
`

export default ResultContent