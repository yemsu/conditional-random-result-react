import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Forms } from "../types/common";
import useLocalStorage from "./useLocalStorage";

type InputBadges = {[key: string]: string[]}

type UseInputBadges = [
  inputBadges: InputBadges,
  addInputBadge: (option:string, dataType: string) => void,
  resetInputBadge: () => void
]

function useInputBadges(
  initialInputBadges: InputBadges,
  setForms: Dispatch<SetStateAction<Forms>>
): UseInputBadges {
  const [inputBadges, setInputBadges] = useState<InputBadges>(initialInputBadges)
  const [saveLocalStorage, deleteLocalStorage] = useLocalStorage('RANDOM_RESULT_OPTIONS', setInputBadges)

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

  const resetInputBadge = useCallback(() => {
    setInputBadges(initialInputBadges)
    deleteLocalStorage()
  }, [])

  return [inputBadges, addInputBadge, resetInputBadge]
}

export default useInputBadges