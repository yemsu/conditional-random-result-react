import { ReactNode } from "react"
import styled from "styled-components"

interface ListProps {
  dataList: string[]
  children: (data: string) => ReactNode
}

function List(props: ListProps) {
  const {
    dataList,
    children
  } = props

  return (
    <UlStyled>
      {dataList.map((data: string) => (
        <LiStyled key={ data }>
          { children(data) }
        </LiStyled>
      ))}
    </UlStyled>
  )
}

const UlStyled = styled.ul`
  
`

const LiStyled = styled.li`
  
`

export default List