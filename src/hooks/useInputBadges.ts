import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Forms } from "../types/common";
import useLocalStorage from "./useLocalStorage";
import { STORAGE_NAME } from "../constants/clientStorage";

type InputBadges = {[key: string]: string[]}

type UseInputBadges = [
  inputBadges: InputBadges,
  addInputBadge: (option:string, dataType: string) => void,
  resetInputBadge: () => void,
  removeInputBadge: (data: string, dataType: string) => void
]

function useInputBadges(
  initialInputBadges: InputBadges,
  setForms: Dispatch<SetStateAction<Forms>>
): UseInputBadges {
  const [inputBadges, setInputBadges] = useState<InputBadges>(initialInputBadges)
  const [saveLocalStorage, deleteLocalStorage] = useLocalStorage(STORAGE_NAME.INPUT_BADGES, setInputBadges)

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

  const removeInputBadge = useCallback((data: string, dataType: string) => {
    const getResult = (prev: InputBadges) => ({
      ...prev,
      [dataType]: prev[dataType].filter(_data => data !== _data)
    })
    setInputBadges(getResult)
    saveLocalStorage(getResult(inputBadges))
  }, [inputBadges])

  const resetInputBadge = useCallback(() => {
    setInputBadges(initialInputBadges)
    deleteLocalStorage()
  }, [])

  return [inputBadges, addInputBadge, resetInputBadge, removeInputBadge]
}

export default useInputBadges