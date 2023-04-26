import ContentSection from "../ContentSection"
import InputBadges from "../InputBadges"
import { useContext } from "react"
import Input from "../../elements/Input"
import { RandomResultContext } from "../../context/RandomResultContext"

function BasicSettingContent() {
  const context = useContext(RandomResultContext)
  if(!context) return null
  const {
    forms,
    onChange,
    focusInputDataType,
    dataTypeKeyNames,
    dataTypes,
    inputDataList,
    onSubmit
  } = context

  const InputComp = (dataType: string) => (
    <Input
      name={dataType}
      value={forms[dataType]}
      onChange={onChange}
      isFocusOn={focusInputDataType === dataType}
    />
  )

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