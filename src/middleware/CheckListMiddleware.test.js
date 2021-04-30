import axios from 'axios'
import addItemAction from '../state/actioncreators/AddItemAction'
import { login } from '../state/actioncreators/Login'
import removeItemAction from '../state/actioncreators/RemoveItemAction'
import checkListStore from '../state/store/CheckListStore'

beforeEach(() => {
    checkListStore.getState().items = []; //TODO: Temp solution for now.
})

test('If middleware adds item to server', async () => {
 
    checkListStore.dispatch(login('dummy-token'))
    jest.mock('axios')
    const item = 'Buy Groceries'
    mockAxiosPostRequestToAddItem(item)
    
    await checkListStore.dispatch(addItemAction(item))   
    const state = checkListStore.getState()
    expect(axios.post).toBeCalledTimes(1)
    expect(state.items.length).toBe(1)
    expect(state.items[0].description).toBe(item)
})

test('If middleware removes item from server',  async () => {
    // First add an item as part of test preparation
    checkListStore.dispatch(login('dummy-token'))
    jest.mock('axios')
    const item = 'Buy Groceries'
    mockAxiosPostRequestToAddItem(item)    
    await checkListStore.dispatch(addItemAction(item))   
    let state = checkListStore.getState()
    expect(axios.post).toBeCalledTimes(1)
    expect(state.items.length).toBe(1)
    expect(state.items[0].description).toBe(item)
    mockAxiosDeleteRequestToRemoveItem()

    //Now act
    await checkListStore.dispatch(removeItemAction(1, item))

    //expect
    state = checkListStore.getState()
    expect(axios.delete).toBeCalledTimes(1)
    expect(state.items.length).toBe(0)
})

function mockAxiosPostRequestToAddItem(item) {
    axios.post = jest.fn().mockResolvedValue({
        status: 201,
        statusText: 'Created',
        data: {
            data: {
                _id: 1,
                description: item
            }
        }
    })
}

function mockAxiosDeleteRequestToRemoveItem() {
    axios.delete = jest.fn().mockResolvedValue({
        status: 200,
        statusText: "OK"
    })
}