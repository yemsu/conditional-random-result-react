import { render, screen } from "@testing-library/react"
import Input from "../Input"

it('name props로 설정한 값이 input 태그의 name과 id가 된다.', async () => {
  await render(<Input name="idInput" label="멤버명" value="" onChange={() => {}} /> )
  const input = screen.getByLabelText('멤버명')
  expect(input).toHaveProperty('name', 'idInput')
  expect(input).toHaveProperty('id', 'idInput')
})