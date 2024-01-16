import { SyntheticEvent, memo, useEffect, useRef } from "react"
import styled from "styled-components"

interface InputProps {
  name: string
  value: string
  placeholder?: string
  onChange: (e: SyntheticEvent) => void
  isFocusOn?: boolean
}

function Input(props: InputProps) {
  const {
    name,
    placeholder,
    value,
    onChange,
    isFocusOn
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if(!isFocusOn) return
    isFocusOn && inputRef?.current?.focus()
  }, [isFocusOn])


  return (
    <InputWrapper>
      <StyledInput
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        ref={inputRef}
        placeholder={placeholder ?? '입력'}
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