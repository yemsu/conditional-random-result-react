import List from "./List"
import Button from "./Button"

interface OptionButtonsProps {
  title: string
  dataList: string[]
  selectedList: string[]
  dataType: string
  onSelect: (option: string, dataType: string) => void
}

function OptionButtons(props: OptionButtonsProps) {
  const {
    title,
    dataList,
    dataType,
    onSelect,
    selectedList,
  } = props

  return (
    <div>
      <List
        dataList={dataList}
        title={title}
        direction="row"
      >
        {(option) => (
          <Button
            styleTheme={selectedList.includes(option) ? 'selected' : 'normal'}
            onClick={() => onSelect(option, dataType)}
          >{ option }</Button>
        )}
      </List>
    </div>
  )
}

export default OptionButtons