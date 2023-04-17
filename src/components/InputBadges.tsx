import { Dispatch, SetStateAction, SyntheticEvent } from "react"
import styled from "styled-components"
import Input from "../elements/Input"
import Button from "../elements/Button"
import Badge from "../elements/Badge"

interface InputBadgesProps {
  onChange: (e: SyntheticEvent) => void
  onSubmit: (e: SyntheticEvent, dataType: string) => void
  dataType: string
  inputValue: string
  dataList: string[]
  setDataList: Dispatch<SetStateAction<{[key: string]: string[]}>>
}

function InputBadges(props: InputBadgesProps) {
  const {
    onChange,
    onSubmit,
    dataType,
    inputValue,
    dataList
  } = props
  
  return (
    <FormStyled onSubmit={(e) => onSubmit(e, dataType)}>
      <Input
        name={dataType}
        value={inputValue}
        onChange={onChange}
      />
      <Button type="submit">추가</Button>

      <ul>
        {dataList.map((data: string) => (
          <li key={data}>
            <Badge>{ data }</Badge>
          </li>
        ))}
      </ul>
    </FormStyled>
  )
}

const FormStyled = styled.form`
  
`

export default InputBadges