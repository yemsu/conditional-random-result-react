import useInputs from "../hooks/useInputs";
import { SyntheticEvent, useState, ReactNode, createContext } from "react";
import { getObjFromKeyArr, getRandomInt } from "../utils";
import useOptionButtons from "../hooks/useOptionButtons";
import useInputBadges from "../hooks/useInputBadges";
import { Forms, OptionButtonsState } from "../types/common";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_NAME } from "../constants/clientStorage";

interface RandomResultContextType {
  // data type
  dataTypes: { [key: string]: string }[];
  // states
  forms: Forms;
  inputDataList: { [key: string]: string[] };
  selectedExceptions: { [key: string]: string[] };
  exceptions: OptionButtonsState[];
  caseIndexResults: number[];
  isStartTextRolling: boolean;
  TEXT_ROLLING_TIME: number;
  timeGetResult: string;
  // functions
  onChange: (e: SyntheticEvent) => void;
  addInputData: (newData: string, dataType: string) => void;
  deleteMember: (data: string, dataType: string) => void;
  onSelectException: (option: string, dataType: string) => void;
  addException: () => void;
  onClickResetInputData: () => void;
  onClickGetResult: () => void;
  resetExceptions: () => void;
  deleteException: (i: number) => void;
}

const defaultRandomResultContext = {
  // data type
  dataTypes: [],
  // states
  forms: {},
  inputDataList: {},
  selectedExceptions: {},
  exceptions: [],
  caseIndexResults: [],
  isStartTextRolling: false,
  TEXT_ROLLING_TIME: 0,
  timeGetResult: "",
  // functions,
  onChange: () => {},
  addInputData: () => {},
  deleteMember: () => {},
  onSelectException: () => {},
  addException: () => {},
  onClickResetInputData: () => {},
  onClickGetResult: () => {},
  resetExceptions: () => {},
  deleteException: (i: number) => {},
};

export const RandomResultContext = createContext<RandomResultContextType>(
  defaultRandomResultContext
);

export function RandomResultProvider({ children }: { children: ReactNode }) {
  const dataTypes = [
    { keyName: "memberName", korName: "멤버명" },
    { keyName: "caseName", korName: "결과값" },
  ];
  const dataTypeKeyNames = dataTypes.map(({ keyName }) => keyName);
  const [forms, onChange, reset, setForms] = useInputs<Forms>(
    getObjFromKeyArr<string>(dataTypeKeyNames, "")
  );
  const [inputDataList, addInputData, resetInputData, removeInputBadge] =
    useInputBadges(getObjFromKeyArr<string[]>(dataTypeKeyNames, []), setForms);
  // selected exceptions
  const [selectedExceptions, onSelectException, resetSelectedExceptions] =
    useOptionButtons(getObjFromKeyArr<string[]>(dataTypeKeyNames, []));
  // exceptions
  const [exceptions, setExceptions] = useState<OptionButtonsState[]>([]);
  const [saveExceptionData, deleteSavedExceptionData] = useLocalStorage<
    OptionButtonsState[]
  >(STORAGE_NAME.SELECTED_EXCEPTIONS, setExceptions);
  // result
  const [caseIndexResults, setCaseIndexResults] = useState<number[]>([]);
  const [saveCaseIndexResults, deleteSaveCaseIndexResults] = useLocalStorage<
    number[]
  >(STORAGE_NAME.CASE_INDEX_RESULTS, setCaseIndexResults);
  const [timeGetResult, setTimeGetResult] = useState("");
  const [saveTimeGetResult] = useLocalStorage(
    STORAGE_NAME.TIME_GET_RESULT,
    setTimeGetResult
  );
  // rolling text
  const [isStartTextRolling, setIsStartTextRolling] = useState(false);
  const TEXT_ROLLING_TIME = 3000;

  const addException = () => {
    setExceptions((prev) => [...prev, selectedExceptions]);
    saveExceptionData([...exceptions, selectedExceptions]);
    resetSelectedExceptions();
  };

  const resetExceptions = () => {
    setExceptions([]);
    resetSelectedExceptions();
    deleteSavedExceptionData();
  };

  const onClickResetInputData = () => {
    resetInputData();
    resetExceptions();
    setCaseIndexResults([]);
    deleteSaveCaseIndexResults();
  };

  const getMemberResult = (
    memberName: string,
    memberResults: number[]
  ): number => {
    const randomInt = getRandomInt(inputDataList.memberName.length, 0);
    const caseName = inputDataList.caseName[randomInt];
    const isExceptionCase = exceptions.find(
      (exception: OptionButtonsState) =>
        exception.caseName.includes(caseName) &&
        exception.memberName.includes(memberName)
    );
    if (isExceptionCase || memberResults.includes(randomInt)) {
      return getMemberResult(memberName, memberResults);
    } else {
      return randomInt;
    }
  };

  const onClickGetResult = () => {
    let memberResults: number[] = [];
    inputDataList.memberName.forEach((memberName) => {
      const memberResult = getMemberResult(memberName, memberResults);
      memberResults = [...memberResults, memberResult];
    });

    setCaseIndexResults(memberResults);
    saveCaseIndexResults(memberResults);

    const time = new Date().toLocaleString();
    setTimeGetResult(time);
    saveTimeGetResult(time);

    setIsStartTextRolling(true);
    setTimeout(() => {
      setIsStartTextRolling(false);
    }, TEXT_ROLLING_TIME);
  };

  const deleteMember = (data: string, dataType: string) => {
    removeInputBadge(data, dataType);
  };

  const deleteException = (i: number) => {
    const getResult = (prev: OptionButtonsState[]) =>
      prev.filter(
        (_: OptionButtonsState, exceptionIndex: number) => exceptionIndex !== i
      );
    setExceptions(getResult);
    saveExceptionData(getResult(exceptions));
  };

  return (
    <RandomResultContext.Provider
      value={{
        dataTypes,
        forms,
        inputDataList,
        addInputData,
        selectedExceptions,
        exceptions,
        caseIndexResults,
        isStartTextRolling,
        TEXT_ROLLING_TIME,
        timeGetResult,
        onChange,
        deleteMember,
        onSelectException,
        addException,
        onClickResetInputData,
        onClickGetResult,
        resetExceptions,
        deleteException,
      }}
    >
      {children}
    </RandomResultContext.Provider>
  );
}
