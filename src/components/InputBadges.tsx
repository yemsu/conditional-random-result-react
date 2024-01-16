import { ReactNode, SyntheticEvent } from "react"
import styled from "styled-components"
import Button from "../elements/Button"
import Badge from "../elements/Badge"
import List from "../elements/List"

interface InputBadgesProps {
  children: ReactNode
  dataType: string
  dataList: string[]
  onSubmit: (e: SyntheticEvent, dataType: string) => void
  onDelete: (data: string, dataType: string) => void
}

function InputBadges(props: InputBadgesProps) {
  const {
    children,
    dataType,
    dataList,
    onSubmit,
    onDelete
  } = props
  
  const deleteBadge = (e: SyntheticEvent, data: string) => {
    e.preventDefault()
    onDelete(data, dataType)
  }

  return (
    <FormStyled onSubmit={(e) => onSubmit(e, dataType)}>
      <InputArea>
        { children }
        <Button type="submit">추가</Button>
      </InputArea>
      {
        dataList.length > 0 &&
        <BadgeListArea>
          <List dataList={dataList} direction="row">
            {(data, i) => <BadgeButtonStyled
              onClick={(e) => deleteBadge(e, data)}
              title="클릭하여 제거"
            >
              <Badge>
                { data }
                <SpanIconStyled>✖️</SpanIconStyled>
              </Badge>
            </BadgeButtonStyled>}
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

const BadgeButtonStyled = styled.button`
  
`

const SpanIconStyled = styled.span`
  margin-left: 0.8em;
  font-size: 0.1em;
  filter: brightness(1.8) saturate(0);
`

export default InputBadges