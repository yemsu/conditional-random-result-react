import ContentSection from "../ContentSection";
import { useContext } from "react";
import { RandomResultContext } from "../../context/RandomResultContext";
import BasicSettingForm from "./BasicSettingForm";

function BasicSettingContent() {
  const { dataTypes } = useContext(RandomResultContext);

  return (
    <ContentSection title="⚙️ 기본 설정" styleTheme="wrapContent">
      {dataTypes.map((dataType, i) => (
        <BasicSettingForm
          dataTypeKeyName={dataType.keyName}
          textInputLabel={dataType.korName}
          key={dataType.keyName}
        />
      ))}
    </ContentSection>
  );
}

export default BasicSettingContent;
