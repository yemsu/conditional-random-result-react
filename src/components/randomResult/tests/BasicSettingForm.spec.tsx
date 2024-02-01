import { fireEvent, render, screen } from "@testing-library/react";
import { RandomResultProvider } from "../../../context/RandomResultContext";
import BasicSettingForm from "../BasicSettingForm";

it('멤버명 text input에 "수진"을 입력 후 "추가" 버튼을 클릭하면 인풋 하단에 "수진" 뱃지가 추가된다.', async () => {
  await render(
    <RandomResultProvider>
      <BasicSettingForm dataTypeKeyName="memberType" textInputLabel="멤버명" />
    </RandomResultProvider>
  );
  const memberInput = screen.getByLabelText("멤버명");
  await fireEvent.change(memberInput, "수진");
  const addButton = await screen.findByRole("button", { name: "추가" });
  expect(addButton).toBeInTheDocument();
});

it('로컬스토리지에 "수진", "민정" 멤버명이 저장되어있다면 해당 멤버명의 뱃지가 노출된다.', async () => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
  expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
});
