import { ElementType, ReactNode } from "react"
import styled from "styled-components"

interface ListProps {
  dataList: string[]
  children: (data: string) => ReactNode
  title?: string
}

function List(props: ListProps) {
  const {
    dataList,
    children,
    title,
  } = props

  const [listTagName, listItemTagName, listTitleTagName]: ElementType[] = title
    ? ['dl', 'dd', 'dt']
    : ['ul', 'li']

  return (
    <ListStyled as={listTagName}>
      {title && <ListTitleStyled as={listTitleTagName}>{ title }</ListTitleStyled>}
      {dataList.map((data: string) => (
        <ListItemStyled key={ data } as={listItemTagName}>
          { children(data) }
        </ListItemStyled>
      ))}
    </ListStyled>
  )
}

const ListStyled = styled.ul`
  
`

const ListTitleStyled = styled.ul`
  
`

const ListItemStyled = styled.li`
  
`

export default List