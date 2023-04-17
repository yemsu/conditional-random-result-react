import { SyntheticEvent, memo } from "react"
import styled from "styled-components"

interface InputProps {
  name: string
  value: string
  onChange: (e: SyntheticEvent) => void
}

function Input(props: InputProps) {
  const {
    name,
    value,
    onChange
  } = props
  return (
    <InputWrapper>
      <StyledInput
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
`

const StyledInput = styled.input`
  width: 120px;
  height: 30px; 
  padding: 0 10px;
  border: 1px solid var(--gray-400);
  border-radius: var(--br-m);
`

export default memo(Input)