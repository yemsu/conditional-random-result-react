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
      <InputArea>
        { InputComp }
        <Button type="submit">추가</Button>
      </InputArea>
      {
        dataList &&
        <BadgeListArea>
          <List dataList={dataList} direction="row">
            {(data) => <Badge>{ data }</Badge>}
          </List>
        </BadgeListArea>
      }
    </FormStyled>
  )
}

const FormStyled = styled.form`
  
`

const InputArea = styled.div`
  display: flex;
  gap: 5px;
`

const BadgeListArea = styled.div`
  margin-top: 10px;
`

export default InputBadges