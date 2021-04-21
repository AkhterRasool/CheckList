import { fireEvent, render, screen } from "@testing-library/react"
import CheckListForm from '.'

test("Check if form is rendered", () => {

    render(<CheckListForm />)
    const input = screen.queryByRole('textbox')
    expect(input).toBeTruthy();

    const submitButton = screen.queryByRole('button')
    expect(submitButton).toBeTruthy();
})

test ("Check if input value can be changed", () => {

    render(<CheckListForm />)
    const input = screen.queryByRole('textbox')
    expect(input.value).toBe('')

    const itemName = 'Buy Groceries'
    fireEvent.change(input, {target: {value: itemName}})
    expect(input.value).toBe(itemName)
})