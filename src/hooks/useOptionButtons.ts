import { useCallback, useState } from "react";
import { OptionButtons } from "../types/common";
import useLocalStorage from "./useLocalStorage";
import { STORAGE_NAME } from "../constants/clientStorage";

type UseOptionButtons = [
  optionButtons: OptionButtons,
  onClickButton: (option:string, dataType: string) => void,
  resetInputBadge: () => void
]

function useOptionButtons(initialOptionButtons: OptionButtons): UseOptionButtons {
  const [optionButtons, setOptionButtons] = useState(initialOptionButtons)
  const [saveLocalStorage, deleteLocalStorage] = useLocalStorage(STORAGE_NAME.OPTION_BUTTONS, setOptionButtons)

  const onClickButton = useCallback((option: string, dataType: string) => {
    const isToggleOff = optionButtons[dataType].includes(option)

    const newData = (prev: OptionButtons) => (
      isToggleOff
        ? prev[dataType].filter((data: string) => data !== option)
        : [...prev[dataType], option]
    )

    const result = (prev: OptionButtons) => ({
      ...prev,
      [dataType]: newData(prev)
    })
    
    setOptionButtons(result)    
    saveLocalStorage(result(optionButtons))
  }, [optionButtons])

  const resetOptionButtons = useCallback(() => {
    setOptionButtons(initialOptionButtons)
    deleteLocalStorage()
  }, [])

  return [optionButtons, onClickButton, resetOptionButtons]
}

export default useOptionButtons