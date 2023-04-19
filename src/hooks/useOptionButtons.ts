import { useCallback, useState } from "react";

type OptionButtons = {[key: string]: string[]}

type UseOptionButtons = [
  optionButtons: OptionButtons,
  onClickButton: (option:string, dataType: string) => void
]

function useOptionButtons(initialOptionButtons: OptionButtons): UseOptionButtons {
  const [optionButtons, setOptionButtons] = useState(initialOptionButtons)

  const onClickButton = useCallback((option: string, dataType: string) => {
    const isToggleOff = optionButtons[dataType].includes(option)

    const result = (prev: OptionButtons) => (
      isToggleOff
        ? prev[dataType].filter((data: string) => data !== option)
        : [...prev[dataType], option]
    )
    
    setOptionButtons(prev => ({
      ...prev,
      [dataType]: result(prev)
    }))    
  }, [optionButtons])

  return [optionButtons, onClickButton]
}

export default useOptionButtons