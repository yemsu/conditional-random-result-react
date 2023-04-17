import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useState } from "react";

type useInputs<T> = [
  T,
  (e: SyntheticEvent) => void,
  () => void,
  Dispatch<SetStateAction<T>>
]

function useInputs<T>(initialForm: T): useInputs<T> {
  const [forms, setForms] = useState(initialForm)

  const onChange = useCallback((e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setForms((prev) => {
      return { ...prev, [name]: value }
    })
  }, [])

  const reset = useCallback(() => {
    setForms(initialForm)
  }, [initialForm])

  return [forms, onChange, reset, setForms]
}

export default useInputs