import { ReactNode } from "react"
import styled, { css } from "styled-components"

interface ListProps<DataType> {
  dataList: DataType[]
  children: (data: DataType, i: number) => ReactNode
  direction?: 'column' | 'row'
  listType?: 'ul' | 'dl'
}

function List<DataType>(props: ListProps<DataType>) {
  const {
    dataList,
    children,
    direction = 'column',
    listType = 'ul',
  } = props

  const listItemTagName = listType === 'ul' ? 'li' : 'div'
  return (
    <ListStyled theme={styleThemeMap[direction]} as={listType}>
      {dataList.map((data: DataType, i) => (
        <ListItemStyled key={i} as={listItemTagName}>
          { children(data, i) }
        </ListItemStyled>
      ))}
    </ListStyled>
  )
}

const styleThemeMap = {
  'column': {
    ListStyled: css`
      flex-direction: column;
      gap: 5px;
    `
  },
  'row': {
    ListStyled: css`
      flex-wrap: wrap;
      gap: 5px;
    `
  }
}

const ListStyled = styled.ul`
  display: flex;
  ${(props) => props.theme.ListStyled}
  dt {
    font-weight: var(--font-weight-bold);
  }
`

const ListItemStyled = styled.li`
`

export default List