import ContentSection from "../ContentSection"
import { SyntheticEvent, useContext } from "react"
import Input from "../../elements/Input"
import Button from "../../elements/Button"
import Badge from "../../elements/Badge"
import List from "../../elements/List"
import { RandomResultContext } from "../../context/RandomResultContext"
import styled from "styled-components"

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

  const deleteBadge = (e: SyntheticEvent, data: string, dataTypeKeyName: string) => {
    e.preventDefault()
    deleteMember(data, dataTypeKeyName)
  }

  return (
    <ContentSection title="⚙️ 기본 설정" styleTheme="wrapContent">
      {dataTypeKeyNames.map((dataTypeKeyName: string, i) => (
        <FormBox>
          <form onSubmit={(e) => onSubmit(e, dataTypeKeyName)}>
            <InputArea>
              <Input
                name={dataTypeKeyName}
                value={forms[dataTypeKeyName]}
                onChange={onChange}
                label={`${dataTypes[i].korName}`}
                isFocusOn={focusInputDataType === dataTypeKeyName}
              />
              <Button type="submit">추가</Button>
            </InputArea>
            {
              inputDataList[dataTypeKeyName].length > 0 &&
              <BadgeListArea>
                <List dataList={inputDataList[dataTypeKeyName]} direction="row">
                  {(data, i) => <button
                    onClick={(e) => deleteBadge(e, data, dataTypeKeyName)}
                    title="클릭하여 제거"
                  >
                    <Badge>
                      { data }
                      <SpanIconStyled>✖️</SpanIconStyled>
                    </Badge>
                  </button>}
                </List>
              </BadgeListArea>
            }
          </form>
        </FormBox>
      ))}
    </ContentSection>
  )
}

const FormBox = styled.div`
  &:nth-child(n+2) {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--gray-800);
  }
`

const InputArea = styled.div`
  display: flex;
  gap: 10px;
  &:nth-child(n+2) {
    margin-top: 10px;
  }
`
const BadgeListArea = styled.div`
  margin-top: 10px;
`
const SpanIconStyled = styled.span`
  margin-left: 0.8em;
  font-size: 0.1em;
  filter: brightness(1.8) saturate(0);
`

export default BasicSettingContent