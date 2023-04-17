import styled from "styled-components"
import Badge from "./Badge"

interface BadgesProps {
  dataList: string[]
}

function Badges(props: BadgesProps) {
  const {
    dataList
  } = props

  return (
    <UlStyled>
      {dataList.map((data: string) => (
        <LiStyled key={ data }>
          <Badge>{ data }</Badge>
        </LiStyled>
      ))}
    </UlStyled>
  )
}

const UlStyled = styled.ul`
  
`

const LiStyled = styled.li`
  
`

export default Badges