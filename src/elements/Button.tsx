import { ReactNode } from "react"
import styled from "styled-components"

interface ButtonProps {
  type?: 'button' | 'submit'
  children: ReactNode
}

function Button(props: ButtonProps) {
  const {
    type = 'button',
    children
  } = props

  return (
    <ButtonStyled
      type={type}
    >
      { children }
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  height: 30px;
  padding: 0 10px;
  border: 1px solid var(--gray-400);
  border-radius: var(--br-m);
  transition: 0.1s;
`

// button:not(:disabled):hover {
//   opacity: 0.7;
// }
// button:not(:disabled).active {
//   background-color: #333;
//   border-color: #333;
//   color: #fff;
// }
// button.large {
//   height: 40px;
//   padding: 0 30px;
// }
// button.color-primary {
//   background-color: hsl(219, 79%, 66%);
//   border-color: hsl(219, 79%, 66%);
//   color: #fff;
// }
// button.text {
//   padding: 0;
//   height: auto;
//   border: none;
//   font-size: 0.8em;
// }
// button:disabled {
//   border-color: #f6f6f6;
//   background-color: #f6f6f6;
//   color: #bbb;
//   cursor: default;
// }
export default Button