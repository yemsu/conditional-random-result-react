import { ElementType, ReactNode } from "react"
import styled, { css } from "styled-components"

interface ListProps {
  dataList: string[]
  children: (data: string) => ReactNode
  title?: string
  direction?: 'column' | 'row'
}

function List(props: ListProps) {
  const {
    dataList,
    children,
    title,
    direction = 'column'
  } = props

  const [listTagName, listItemTagName, listTitleTagName]: ElementType[] = title
    ? ['dl', 'dd', 'dt']
    : ['ul', 'li']

  return (
    <ListStyled as={listTagName} theme={styleThemeMap[direction]}>
      {title && <ListTitleStyled as={listTitleTagName}>{ title }</ListTitleStyled>}
      {dataList.map((data: string) => (
        <ListItemStyled key={ data } as={listItemTagName}>
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

const ListTitleStyled = styled.ul`
`

const ListItemStyled = styled.li`
  
`

export default List