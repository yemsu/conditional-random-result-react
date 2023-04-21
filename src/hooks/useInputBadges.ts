import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Forms } from "../types/common";

type InputBadges = {[key: string]: string[]}

type UseInputBadges = [
  inputBadges: InputBadges,
  onClickButton: (option:string, dataType: string) => void
]

function useInputBadges(initialOptionButtons: InputBadges, setForms: Dispatch<SetStateAction<Forms>>): UseInputBadges {
  const [inputBadges, setInputBadges] = useState<InputBadges>(initialOptionButtons)

  const addInputBadge = useCallback((newData: string, dataType: string) => {
    setInputBadges((prev) => ({
      ...prev,
      [dataType]: [...prev[dataType], newData]
    }))
  
    // reset form
    setForms((prev) => ({...prev, [dataType]: ''}))
  }, [inputBadges])

  return [inputBadges, addInputBadge]
}

export default useInputBadges