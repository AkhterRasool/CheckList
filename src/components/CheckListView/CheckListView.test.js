import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux';
import CheckListView from '.';
import addItemAction from '../../state/actioncreators/AddItemAction';
import checkListStore from '../../state/CheckListStore';

beforeEach(() => {
    checkListStore.getState().items = []; //TODO: Temp solution for now.
})

test("Check if items are displayed when checklist has items", () => {
    const listItems = ['Get haircut', 'Buy Groceries']
    checkListStore.dispatch(addItemAction(listItems[0]))
    checkListStore.dispatch(addItemAction(listItems[1]))
    
    render(<Provider store={checkListStore}><CheckListView /></Provider>)

    expect(screen.queryByRole('img')).toBeFalsy()
    expect(screen.queryByText(listItems[0])).toBeTruthy();
    expect(screen.queryByText(listItems[1])).toBeTruthy();
})


test("Check if no data list image is displayed when checklist has no items", () => {
    render(<Provider store={checkListStore}><CheckListView /></Provider>)

    expect(screen.queryByRole('img')).toBeTruthy()
    expect(screen.queryByText('No items in list')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
})