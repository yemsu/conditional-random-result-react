import { ReactNode, SyntheticEvent } from "react"
import styled, { css } from "styled-components"
import { StyleMap } from "../types/common"

interface ButtonProps {
  type?: 'button' | 'submit'
  children: ReactNode
  onClick?: (e: SyntheticEvent) => void
  styleTheme?: 'normal' | 'primary' | 'primaryLine'
  sizeType?: 'medium' | 'large' 
}

function Button(props: ButtonProps) {
  const {
    type = 'button',
    children,
    onClick,
    styleTheme ='normal',
    sizeType = 'medium',
  } = props

  return (
    <ButtonStyled
      type={type}
      onClick={onClick}
      theme={styleThemeMap[styleTheme]}
      size={sizeStyleMap[sizeType]}
    >
      { children }
    </ButtonStyled>
  )
}

const styleThemeMap = {
  normal: {
    ButtonStyled: css`
      border-color: var(--gray-400);
    `
  },
  primary: {
    ButtonStyled: css`
      background-color: var(--primary);
      border-color: var(--primary);
      color: #fff;
    `
  },
  primaryLine: {
    ButtonStyled: css`
      border: 1px solid var(--primary);
      color: var(--primary);
      font-weight: var(--font-weight-S-bold);
    `
  }
}

const sizeStyleMap = {
  medium: {
    ButtonStyled: css`
      padding: 0 10px;
      line-height: 26px;
    `
  },
  large: {
    ButtonStyled: css`
      padding: 0 20px;
      line-height: 40px;
      font-size: var(--font-size-M-L);
      font-weight: var(--font-weight-S-bold);
    `
  }
}

const ButtonStyled = styled.button<{size: StyleMap}>`
  border: 1px solid;
  border-radius: var(--br-m);
  transition: 0.1s;
  ${(props) => props.theme.ButtonStyled}
  ${(props) => props.size.ButtonStyled}
  &:hover {
    opacity: 0.7;
  }
`

export default Button