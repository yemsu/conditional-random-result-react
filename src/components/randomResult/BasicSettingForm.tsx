import { SyntheticEvent, useContext, useState } from "react";
import styled from "styled-components";
import { RandomResultContext } from "../../context/RandomResultContext";
import MSG from "../../constants/message";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import List from "../../elements/List";
import Badge from "../../elements/Badge";

interface BasicSettingFormProps {
  dataTypeKeyName: string;
  textInputLabel: string;
}

function BasicSettingForm(props: BasicSettingFormProps) {
  const { dataTypeKeyName, textInputLabel } = props;

  const { forms, onChange, deleteMember, inputDataList, addInputData } =
    useContext(RandomResultContext);

  const [focusInputDataType, setFocusInputDataType] = useState("");

  const onSubmit = (e: SyntheticEvent, dataType: string) => {
    e.preventDefault();

    const newData = forms[dataType].trim();
    const focusToDataTypeInput = () => {
      setFocusInputDataType(dataType);
      setTimeout(() => {
        setFocusInputDataType("");
      }, 500);
    };
    if (forms[dataType] === "") {
      alert(MSG.NO_VALUE);
      focusToDataTypeInput();
      return;
    } else if (inputDataList[dataType].includes(newData)) {
      alert(MSG.EXISTED_VALUE);
      focusToDataTypeInput();
      return;
    }
    addInputData(newData, dataType);
  };

  const deleteBadge = (
    e: SyntheticEvent,
    data: string,
    dataTypeKeyName: string
  ) => {
    e.preventDefault();
    deleteMember(data, dataTypeKeyName);
  };

  return (
    <FormBox>
      <form onSubmit={(e) => onSubmit(e, dataTypeKeyName)}>
        <InputArea>
          <Input
            name={dataTypeKeyName}
            value={forms[dataTypeKeyName]}
            onChange={onChange}
            label={textInputLabel}
            isFocusOn={focusInputDataType === dataTypeKeyName}
          />
          <Button type="submit">추가</Button>
        </InputArea>
        {inputDataList[dataTypeKeyName]?.length > 0 && (
          <BadgeListArea>
            <List dataList={inputDataList[dataTypeKeyName]} direction="row">
              {(data, i) => (
                <button
                  onClick={(e) => deleteBadge(e, data, dataTypeKeyName)}
                  title="클릭하여 제거"
                >
                  <Badge>
                    {data}
                    <SpanIconStyled>✖️</SpanIconStyled>
                  </Badge>
                </button>
              )}
            </List>
          </BadgeListArea>
        )}
      </form>
    </FormBox>
  );
}

const FormBox = styled.div`
  &:nth-child(n + 2) {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--gray-800);
  }
`;

const InputArea = styled.div`
  display: flex;
  gap: 10px;
  &:nth-child(n + 2) {
    margin-top: 10px;
  }
`;
const BadgeListArea = styled.div`
  margin-top: 10px;
`;
const SpanIconStyled = styled.span`
  margin-left: 0.8em;
  font-size: 0.1em;
  filter: brightness(1.8) saturate(0);
`;

export default BasicSettingForm;
