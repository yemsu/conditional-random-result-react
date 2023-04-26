import styled from "styled-components"
import ContentSection from "../ContentSection"
import InputBadges from "../InputBadges"
import { ReactNode, SyntheticEvent } from "react"

interface BasicSettingContentProps {
  dataTypeKeyNames: string[]
  dataTypes: {[key: string]: string}[]
  InputComp: (dataType: string) => ReactNode
  inputDataList: {[key: string]: string[]} 
  onSubmit: (e: SyntheticEvent, dataType: string) => void
}

function BasicSettingContent(props: BasicSettingContentProps) {
  const {
    dataTypeKeyNames,
    dataTypes,
    InputComp,
    inputDataList,
    onSubmit
  } = props 

  return (
    <ContentSection title="⚙️ 기본 설정" styleTheme="wrapContent">
      {dataTypeKeyNames.map((dataTypeKeyName: string, i) => (
        <ContentSection
          key={`${dataTypeKeyName}-addData`}
          title={dataTypes[i].korName}
          styleTheme="row"
        >
          <InputBadges
            InputComp={InputComp(dataTypeKeyName)}
            dataType={dataTypeKeyName}
            dataList={inputDataList[dataTypeKeyName]}
            onSubmit={onSubmit}
          />
        </ContentSection>
      ))}
    </ContentSection>
  )
}

export default BasicSettingContent