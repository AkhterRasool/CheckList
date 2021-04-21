import {render, screen} from '@testing-library/react'
import CheckListView from '.';

test("Check if items are displayed when checklist has items", () => {
    const listItems =[ 'Get haircut', 'Buy Groceries'];
    render(<CheckListView items={listItems}/>)

    expect(screen.queryByRole('img')).toBeFalsy()
    expect(screen.queryByText(listItems[0])).toBeTruthy();
    expect(screen.queryByText(listItems[1])).toBeTruthy();
})


test("Check if no data list image is displayed when checklist has no items", () => {
    const listItems =[];
    render(<CheckListView items={listItems}/>)

    expect(screen.queryByRole('img')).toBeTruthy()
    expect(screen.queryByText('No items in list')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
})