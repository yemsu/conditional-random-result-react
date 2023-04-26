import styled from "styled-components";
import Button from "../elements/Button";
import ResultContent from "../components/randomResult/ResultContent";
import ButtonWrapper from "../elements/ButtonWrapper";
import ConditionSettingContent from "../components/randomResult/ConditionSettingContent";
import BasicSettingContent from "../components/randomResult/BasicSettingContent";
import { useContext } from "react";
import { RandomResultContext } from "../context/RandomResultContext";

function RandomResult() {
  const {
    inputDataList,
    onClickGetResult,
    caseIndexResults,
    onClickResetInputData
  } = useContext(RandomResultContext)

  const hasBasicData =  inputDataList.memberName.length > 0 && inputDataList.caseName.length > 0

  return (
    <div>
      <H1TitleWrapper>
        <h1>조건 랜덤 뽑기 🫣</h1>
        <Button onClick={onClickResetInputData} styleTheme="primaryLine">전체 재설정</Button>
      </H1TitleWrapper>
      <BasicSettingContent />
      { hasBasicData && <ConditionSettingContent /> }
      { caseIndexResults.length > 0 && <ResultContent /> }
      {
        hasBasicData &&
        <ButtonWrapper>
          <Button
            onClick={onClickGetResult}
            sizeType="large"
            styleTheme="primary"
          >{
            caseIndexResults.length > 0
              ? '🎲 다시 뽑기 🎲' : '🎲 랜덤 뽑기 🎲'
          }</Button>
        </ButtonWrapper>
      }
    </div>
  )
}

const H1TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 10px;
`

export default RandomResult