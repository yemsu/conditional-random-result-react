import { useCallback, useState } from "react";
import { OptionButtonsState } from "../types/common";
import useLocalStorage from "./useLocalStorage";
import { STORAGE_NAME } from "../constants/clientStorage";

type UseOptionButtons = [
  optionButtons: OptionButtonsState,
  onClickButton: (option:string, dataType: string) => void,
  resetInputBadge: () => void
]

function useOptionButtons(initialOptionButtons: OptionButtonsState): UseOptionButtons {
  const [optionButtons, setOptionButtons] = useState(initialOptionButtons)
  const [saveLocalStorage, deleteLocalStorage] = useLocalStorage(STORAGE_NAME.OPTION_BUTTONS, setOptionButtons)

  const onClickButton = useCallback((option: string, dataType: string) => {
    const isToggleOff = optionButtons[dataType].includes(option)

    const newData = (prev: OptionButtonsState) => (
      isToggleOff
        ? prev[dataType].filter((data: string) => data !== option)
        : [...prev[dataType], option]
    )

    const result = (prev: OptionButtonsState) => ({
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