import { ElementType, ReactNode } from "react"
import styled, { css } from "styled-components"

interface ListProps {
  dataList: string[]
  children: (data: string) => ReactNode
  direction?: 'column' | 'row'
}

function List(props: ListProps) {
  const {
    dataList,
    children,
    direction = 'column'
  } = props

  return (
    <ListStyled theme={styleThemeMap[direction]}>
      {dataList.map((data: string, i) => (
        <ListItemStyled key={i}>
          { children(data) }
        </ListItemStyled>
      ))}
    </ListStyled>
  )
}

const styleThemeMap = {
  'column': {
    ListStyled: css``
  },
  'row': {
    ListStyled: css`
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    `
  }
}

const ListStyled = styled.ul`
  ${(props) => props.theme.ListStyled}
`

const ListItemStyled = styled.li`
  
`

export default List