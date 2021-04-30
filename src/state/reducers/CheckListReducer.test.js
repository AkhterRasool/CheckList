import addItemAction from '../actioncreators/AddItemAction'
import { login } from "../actioncreators/Login"
import { logout } from '../actioncreators/Logout'
import setMessage from '../actioncreators/MessageAction'
import removeItemAction from '../actioncreators/RemoveItemAction'
import setItems from '../actioncreators/SetItems'
import checkListReducer from './CheckListReducer'


test("Check if reducer adds item to list", () => {
    const initialState = {
        items : ['Buy Groceries']
    }
    const newItem = 'Do something fun'
    
    const action = addItemAction(newItem)
    const resultState = checkListReducer(initialState, action)
    const resultItems = resultState.items;

    expect(resultItems.length).toBe(2);
    expect(resultItems[0]).toBe(initialState.items[0])
    expect(resultItems[1]).toBe(newItem)
})


test("Check if reducer removes item from list", () => {
    const initialState = {
        items : [
            {
                id: 1,
                description: 'Buy Groceries'
            },
            {
                id: 2,
                description: 'Do something fun'
            }
        ]
    }
    const itemToRemove = {
        id: 2,
        description: 'Do something fun'
    }
    
    const action = removeItemAction(itemToRemove.id, itemToRemove.description)
    const resultState = checkListReducer(initialState, action)
    const resultItems = resultState.items;

    expect(resultItems.length).toBe(1);
    expect(resultItems[0]).toBe(initialState.items[0])
})

test("Check if reducer executes login action", () => {
    const initialState = {
        user: {}
    }

    const token = 'dummy-token'
    const action = login(token)
    const resultState = checkListReducer(initialState, action)
    
    expect(resultState.user.isLoggedIn).toBe(true)
    expect(resultState.user.token).toBe(token)
})


test("Check if reducer executes logout action", () => {
    const initialState = {
        user: {
            isLoggedIn: true,
            token: 'dummy-token'
        }
    }

    const action = logout()
    const resultState = checkListReducer(initialState, action)
    
    expect(resultState.user.isLoggedIn).toBe(false)
    expect(resultState.user.token).toBeFalsy()
})



test("Check if reducer executes message action", () => {
    const initialState = {}

    const message = {
        description: 'Please log in',
        color: 'blue'
    }
    const action = setMessage(message.description, message.color)
    const resultState = checkListReducer(initialState, action)
    expect(resultState.message.description).toBe(message.description)
    expect(resultState.message.color).toBe(message.textColor)
})



test("Check if reducer executes setItems action", () => {
    const initialState = {}

    const itemsToSet = [
        {id: 1, description: 'Buy Groceries'},
        {id: 2, description: 'Get a haircut'},
        {id: 3, description: 'Pay bills'},
    ]
    const action = setItems(itemsToSet)
    const resultState = checkListReducer(initialState, action)

    expect(resultState.items.length).toBe(3)
    expect(resultState.items[0].description).toBe(itemsToSet[0].description)
    expect(resultState.items[1].description).toBe(itemsToSet[1].description)
    expect(resultState.items[2].description).toBe(itemsToSet[2].description)
})