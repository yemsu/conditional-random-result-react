import ContentSection from "../ContentSection"
import InputBadges from "../InputBadges"
import { useContext } from "react"
import Input from "../../elements/Input"
import { RandomResultContext } from "../../context/RandomResultContext"

function BasicSettingContent() {
  const {
    forms,
    onChange,
    deleteMember,
    focusInputDataType,
    dataTypeKeyNames,
    dataTypes,
    inputDataList,
    onSubmit
  } = useContext(RandomResultContext)

  return (
    <ContentSection title="⚙️ 기본 설정" styleTheme="wrapContent">
      {dataTypeKeyNames.map((dataTypeKeyName: string, i) => (
        <ContentSection
          key={`${dataTypeKeyName}-addData`}
          title={dataTypes[i].korName}
          styleTheme="row"
        >
          <InputBadges
            dataType={dataTypeKeyName}
            dataList={inputDataList[dataTypeKeyName]}
            onSubmit={onSubmit}
            onDelete={deleteMember}
          >
            <Input
              name={dataTypeKeyName}
              value={forms[dataTypeKeyName]}
              onChange={onChange}
              placeholder={`${dataTypes[i].korName} 입력`}
              isFocusOn={focusInputDataType === dataTypeKeyName}
            />
          </InputBadges>
        </ContentSection>
      ))}
    </ContentSection>
  )
}

export default BasicSettingContent