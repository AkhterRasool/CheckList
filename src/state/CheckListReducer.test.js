import Actions from './Actions'
import checkListReducer from './CheckListReducer'

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