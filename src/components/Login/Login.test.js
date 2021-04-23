import { fireEvent, queryAllByRole, render, screen } from "@testing-library/react"
import Login from '.'

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
    mockMatchMedia()
    render(<Login />)
    expect(screen.queryByText('Login')).toBeTruthy()
    expect(screen.getByLabelText('Username')).toBeTruthy()
    expect(screen.queryByRole('textbox')).toBeTruthy()

    expect(screen.getByLabelText('Password')).toBeTruthy()
    expect(screen.queryByPlaceholderText('Password')).toBeTruthy()
})