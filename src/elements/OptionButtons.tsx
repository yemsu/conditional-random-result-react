import List from "./List"
import Button from "./Button"

interface OptionButtonsProps {
  dataList: string[]
  selectedList: string[]
  dataType: string
  onSelect: (option: string, dataType: string) => void
}

function OptionButtons(props: OptionButtonsProps) {
  const {
    dataList,
    dataType,
    onSelect,
    selectedList,
  } = props

  return (
    <List
      dataList={dataList}
      direction="row"
    >
      {(option) => (
        <Button
          styleTheme={selectedList.includes(option) ? 'selected' : 'normal'}
          onClick={() => onSelect(option, dataType)}
        >{ option }</Button>
      )}
    </List>
  )
}

export default OptionButtons