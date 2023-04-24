import { ElementType, ReactNode } from "react"
import styled, { css } from "styled-components"

interface ListProps<DataType> {
  dataList: DataType[]
  children: (data: DataType) => ReactNode
  direction?: 'column' | 'row'
}

function List<DataType>(props: ListProps<DataType>) {
  const {
    dataList,
    children,
    direction = 'column'
  } = props

  return (
    <ListStyled theme={styleThemeMap[direction]}>
      {dataList.map((data: DataType, i) => (
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