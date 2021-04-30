import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux';
import CheckListView from '.';
import addItemAction from '../../state/actioncreators/AddItemAction';
import checkListStore from '../../state/store/CheckListStore';
import {login} from '../../state/actioncreators/Login'
import axios from 'axios';

beforeEach(() => {
    checkListStore.getState().items = []; //TODO: Temp solution for now.
})

test("Check if items are displayed when checklist has items", async () => {
    checkListStore.dispatch(login('this-string-is-a-dummy-token'))
    jest.mock('axios')
    const listItems = {
        items : [
            {
                _id: 1,
                description: 'Buy Groceries'
            },
            {
                _id: 2,
                description: 'Do something fun'
            }
        ]
    }
    mockAxiosPostResponse(listItems.items[0])
    await checkListStore.dispatch(addItemAction(listItems[0]))
    mockAxiosPostResponse(listItems.items[1])
    await checkListStore.dispatch(addItemAction(listItems[1]))
    
    render(<Provider store={checkListStore}><CheckListView /></Provider>)

    expect(screen.queryByRole('img')).toBeFalsy()
    expect(screen.queryByText(listItems.items[0].description)).toBeTruthy();
    expect(screen.queryByText(listItems.items[1].description)).toBeTruthy();
})


test("Check if no data list image is displayed when checklist has no items", () => {
    render(<Provider store={checkListStore}><CheckListView /></Provider>)

    expect(screen.queryByRole('img')).toBeTruthy()
    expect(screen.queryByText('No items in list')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
})

function mockAxiosPostResponse(responseData) {
    axios.post = jest.fn().mockResolvedValue({
        status: 201,
        statusText: 'Created',
        data: {
            data: responseData
        }
    })
}