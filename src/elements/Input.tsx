import { SyntheticEvent, memo, useEffect, useRef } from "react"
import styled from "styled-components"

interface InputProps {
  name: string
  value: string
  label: string
  onChange: (e: SyntheticEvent) => void
  isFocusOn?: boolean
}

function Input(props: InputProps) {
  const {
    name,
    label,
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
    <Label htmlFor={name}>
      <InputTitle>{label}</InputTitle>
      <StyledInput
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        ref={inputRef}
        placeholder={`${label} 입력`}
      />
    </Label>
  )
}

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`

const InputTitle = styled.h3`
  font-size: 1em;
`

const StyledInput = styled.input`
  width: 120px;
  height: 30px; 
  padding: 0 10px;
  border: 1px solid var(--gray-400);
  border-radius: var(--br-m);
`

export default memo(Input)