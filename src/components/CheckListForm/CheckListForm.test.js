import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import CheckListForm from '.'
import checkListStore from "../../state/CheckListStore"

test("Check if form is rendered", () => {

    render(<Provider store={checkListStore}><CheckListForm /></Provider>)
    const input = screen.queryByRole('textbox')
    expect(input).toBeTruthy();

    const submitButton = screen.queryByRole('button')
    expect(submitButton).toBeTruthy();
})

test ("Check if input value can be changed", () => {

    render(<Provider store={checkListStore}><CheckListForm /></Provider>)
    const input = screen.queryByRole('textbox')
    expect(input.value).toBe('')

    const itemName = 'Buy Groceries'
    fireEvent.change(input, {target: {value: itemName}})
    expect(input.value).toBe(itemName)
})