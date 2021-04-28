import { fireEvent, queryAllByRole, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import Login from '.'
import checkListStore from "../../state/store/CheckListStore";

function mockMatchMedia() {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
}

test("Check if login form is displayed", () => {
    const dummyUserValue = {
      name: 'dummyuser',
      password: 'dummydummy',
      confirmPassword: 'dummydummy',
      email: 'randomuser@dummy.com'
    }
    mockMatchMedia()
    render(<Provider store={checkListStore}><Login dummyUserValue={dummyUserValue}/></Provider>)
    expect(screen.queryByText('Login')).toBeTruthy()
    expect(screen.getByLabelText('Email')).toBeTruthy()
    expect(screen.queryByRole('textbox')).toBeTruthy()

    expect(screen.getByLabelText('Password')).toBeTruthy()
    expect(screen.queryByPlaceholderText('Password')).toBeTruthy()
})