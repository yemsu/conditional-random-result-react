import { ReactNode } from "react"
import styled from "styled-components"

interface ButtonWrapperProps {
  children: ReactNode
}

function ButtonWrapper(props: ButtonWrapperProps) {
  const {
    children
  } = props
  
  return (
    <ButtonWrapperStyled>
      { children }
    </ButtonWrapperStyled>
  )
}

const ButtonWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
`

export default ButtonWrapper