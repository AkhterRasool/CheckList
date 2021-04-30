import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import App from './App'
import checkListStore from "./state/store/CheckListStore"


test("Check if nav-bar links are displayed if user is not logged in", () => {
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
    render(<Provider store={checkListStore}><App /></Provider>)
    const links = screen.queryAllByRole('link')
    expect(links.length).toBe(2)
    expect(links[0].innerHTML).toBe('Registration')
    expect(links[1].innerHTML).toBe('Login')
})