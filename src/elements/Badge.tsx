import styled from "styled-components"

interface BadgeProps {
  children: string
}

function Badge(props: BadgeProps) {
  const {
    children
  } = props

  return (
    <BadgeStyled>{ children }</BadgeStyled>
  )
}

const BadgeStyled = styled.span`
  display: inline-block;
  padding: 0 8px;
  background-color: var(--gray-900);
  border-radius: 5px;
  line-height: 22px;
`

export default Badge