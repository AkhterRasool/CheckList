import {fireEvent, render, screen, act} from '@testing-library/react'
import Actions from './Actions'
import checkListReducer from './CheckListReducer'
import checkListStore from './CheckListStore'
import { Provider } from "react-redux"

import Home from '../components/Home'

test("Check if reducer adds item to list", () => {
    const initialState = {
        items : ['Buy Groceries']
    }
    const newItem = 'Do something fun'
    
    const action = {type: Actions.addItem, payload: newItem}
    const resultState = checkListReducer(initialState, action)
    const resultItems = resultState.items;

    expect(resultItems.length).toBe(2);
    expect(resultItems[0]).toBe(initialState.items[0])
    expect(resultItems[1]).toBe(newItem)
})


test("Check if reducer removes item to list", () => {
    const initialState = {
        items : ['Buy Groceries', 'Do something fun']
    }
    const itemToRemove = 'Do something fun'
    
    const action = {type: Actions.removeItem, payload: itemToRemove}
    const resultState = checkListReducer(initialState, action)
    const resultItems = resultState.items;

    expect(resultItems.length).toBe(1);
    expect(resultItems[0]).toBe(initialState.items[0])
})

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
    
    act(() => {fireEvent.change(inputField, {target: {value: ''}}); return undefined;})
    act(() => { fireEvent.click(submitButton); return undefined;})
    expect(screen.queryByText('Item cannot be empty.')).toBeTruthy()
})