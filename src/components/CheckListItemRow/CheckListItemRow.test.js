import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux';
import CheckListItemRow from '.';
import checkListStore from '../../state/CheckListStore';

let tableRowContainer = null;

beforeEach(() => {
    const tableNode = document.createElement("table")
    const tbody = document.createElement("tbody");
    tableNode.appendChild(tbody)
    document.body.appendChild(tableNode);

    tableRowContainer = tbody;
})

test('Check if table row renders', () => {
    const randomItem = 'Buy Groceries'
    render(<Provider store={checkListStore}><CheckListItemRow itemName={randomItem}/></Provider>, {container: tableRowContainer});

    expect(screen.queryByRole('checkbox')).toBeTruthy()
    expect(screen.queryByText(randomItem)).toBeTruthy()
    expect(screen.queryByRole('button')).toBeTruthy()
})