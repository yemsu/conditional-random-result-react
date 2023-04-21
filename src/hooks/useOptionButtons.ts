import { useCallback, useState } from "react";
import { OptionButtons } from "../types/common";
import useLocalStorage from "./useLocalStorage";

type UseOptionButtons = [
  optionButtons: OptionButtons,
  onClickButton: (option:string, dataType: string) => void
]

function useOptionButtons(initialOptionButtons: OptionButtons): UseOptionButtons {
  const [optionButtons, setOptionButtons] = useState(initialOptionButtons)
  const [saveLocalStorage] = useLocalStorage('RANDOM_RESULT_EXCEPTIONS', setOptionButtons)

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

  return [optionButtons, onClickButton]
}

export default useOptionButtons