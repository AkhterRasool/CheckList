import { fireEvent, render, screen, act } from "@testing-library/react"
import checkListStore from "../../state/store/CheckListStore"
import { Provider } from "react-redux"
import Home from '.'
import axios from "axios"

test("Check if error message is displayed when item name is too short", () => {
    const item = 'pop'
    render(<Provider store={checkListStore}><Home /></Provider>)
    const inputField = screen.queryByRole('textbox')
    
    act(() => { fireEvent.change(inputField, {target: {value: item}}) })

    expect(screen.queryByText('Item must have at least 4 characters.')).toBeTruthy()
})

test("Check if error message is displayed when no item is added", () => {
    render(<Provider store={checkListStore}><Home /></Provider>)
    const inputField = screen.queryByRole('textbox')
    const submitButton = screen.queryByRole('button')

    act(() => {fireEvent.change(inputField, {target: {value: ''}});})
    act(() => { fireEvent.click(submitButton);})
    expect(screen.queryByText('Item cannot be empty.')).toBeTruthy()
})

test("Check if items fetched from server are displayed", (done) => {
    jest.mock('axios')
    axios.get = jest.fn().mockResolvedValue({
        status: 200,
        data: {
            data: [{
                _id: 1,
                description: 'Go Shopping'
            }]
        }
    })
 
    render(<Provider store={checkListStore}><Home /></Provider>)
    setTimeout(() => {
        expect(axios.get).toBeCalledTimes(1)
        expect(screen.queryByText('Go Shopping')).toBeTruthy()
        done()
    }, 1)
})

test("Check if logout is successful when logout link is clicked", (done) => {
    jest.mock('axios')

    axios.get = jest.fn().mockResolvedValue({
        status: 200,
        data: {
            data: []
        }
    })
    axios.post = jest.fn().mockResolvedValue({
        status: 200,
        statusText: 'OK'
    })
    render(<Provider store={checkListStore}><Home /></Provider>)
    const logoutLink = screen.queryByText('Logout')
    fireEvent.click(logoutLink)

    setTimeout(() => {
        expect(axios.post).toBeCalledTimes(1)
        expect(screen.queryByText("Please wait while we log you out.")).toBeTruthy()
        done()
    }, 1)
})