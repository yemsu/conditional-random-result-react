import { ReactNode, SyntheticEvent } from "react"
import styled from "styled-components"
import Button from "../elements/Button"
import Badges from "../elements/Badges"

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
      <Badges dataList={dataList} />
    </FormStyled>
  )
}

const FormStyled = styled.form`
  
`

export default InputBadges