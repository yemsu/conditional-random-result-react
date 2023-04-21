import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Forms } from "../types/common";
import store from "../utils/store";
import useLocalStorage from "./useLocalStorage";

type InputBadges = {[key: string]: string[]}

type UseInputBadges = [
  inputBadges: InputBadges,
  onClickButton: (option:string, dataType: string) => void
]

function useInputBadges(
  initialOptionButtons: InputBadges,
  setForms: Dispatch<SetStateAction<Forms>>
): UseInputBadges {
  const [inputBadges, setInputBadges] = useState<InputBadges>(initialOptionButtons)
  const [saveLocalStorage] = useLocalStorage('RANDOM_RESULT_OPTIONS', setInputBadges)

  const addInputBadge = useCallback((newData: string, dataType: string) => {
    const getResult = (prev: InputBadges) => ({
      ...prev,
      [dataType]: [...prev[dataType], newData]
    })
    setInputBadges(getResult)
    saveLocalStorage(getResult(inputBadges))
  
    // reset form
    setForms((prev) => ({...prev, [dataType]: ''}))
  }, [inputBadges])

  return [inputBadges, addInputBadge]
}

export default useInputBadges