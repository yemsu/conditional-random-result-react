import { ReactNode, SyntheticEvent } from "react"
import styled from "styled-components"
import Button from "../elements/Button"
import Badge from "../elements/Badge"
import List from "../elements/List"

interface InputBadgesProps {
  InputComp: ReactNode
  dataType: string
  dataList: string[]
  onSubmit: (e: SyntheticEvent, dataType: string) => void
}

function InputBadges(props: InputBadgesProps) {
  const {
    InputComp,
    dataType,
    dataList,
    onSubmit
  } = props
  
  return (
    <FormStyled onSubmit={(e) => onSubmit(e, dataType)}>
      { InputComp }
      <Button type="submit">추가</Button>
      <List dataList={dataList}>
        {(data) => <Badge>{ data }</Badge>}
      </List>
    </FormStyled>
  )
}

const FormStyled = styled.form`
  
`

export default InputBadges