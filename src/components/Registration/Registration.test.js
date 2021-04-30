import { render, screen } from '@testing-library/react'
import { mockMatchMedia } from '../../testutils/MatchMedia'
import { dummyUserValue } from '../../testutils/TestData'
import Registration from './Registration'

test("Registration component is displayed", () => {
    mockMatchMedia()
    render(<Registration dummyUserValue={dummyUserValue}/>)
    
    expect(screen.queryAllByText('Login')).toBeTruthy()
    const textBoxes = screen.queryAllByRole('textbox')
    expect(textBoxes.length).toBe(2)
    expect(textBoxes[0].value).toBe(dummyUserValue.name)
    expect(textBoxes[1].value).toBe(dummyUserValue.email)
    expect(screen.queryByPlaceholderText('Password')).toBeTruthy()
    expect(screen.queryByPlaceholderText('Confirm Password')).toBeTruthy()
    expect(screen.queryByRole('button')).toBeTruthy()
})