import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import Login from '.';
import checkListStore from "../../state/store/CheckListStore";
import { mockMatchMedia } from '../../testutils/MatchMedia';
import { dummyUserValue } from '../../testutils/TestData';


beforeEach(() => {
  mockMatchMedia()
})

test("Check if login form is displayed", () => {
    render(<Provider store={checkListStore}><Login dummyUserValue={dummyUserValue}/></Provider>)
    
    expect(screen.queryByText('Login')).toBeTruthy()
    expect(screen.getByLabelText('Email')).toBeTruthy()
    expect(screen.queryByRole('textbox')).toBeTruthy()
    expect(screen.getByLabelText('Password')).toBeTruthy()
    expect(screen.queryByPlaceholderText('Password')).toBeTruthy()
    expect(screen.queryByText('For the sake of demo, you can use the following registered credentials:')).toBeTruthy()
})

test('Check if login has failed upon invalid credentials', (done) => {
  jest.mock('axios')
  axios.post = jest.fn().mockRejectedValue({
    status: 403
  })

  render(<Provider store={checkListStore}><Login dummyUserValue={dummyUserValue}/></Provider>)
  const emailField = screen.queryByRole('textbox')
  expect(emailField).toBeTruthy()
  const passwordField = screen.queryByPlaceholderText('Password').querySelector('input')
  expect(passwordField).toBeTruthy()
  const loginButton = screen.queryByRole('button')
  expect(loginButton).toBeTruthy()

  act(() => {
    //Enter credentials
    fireEvent.change(emailField, {target: {value: 'invalid-email'}})
    fireEvent.change(passwordField, {target: {value: 'invalid-password'}})
    fireEvent.click(loginButton)
  })

  setTimeout(() => {
    expect(axios.post).toBeCalledTimes(1)
    expect(screen.queryByText('Invalid credentials.')).toBeTruthy()
    done()
  }, 1)
  
})

test('Check if login is successful upon valid credentials', (done) => {
  jest.mock('axios')
  axios.post = jest.fn().mockResolvedValue({
    status: 200,
    data: {
      token: 'dummy-token'
    }
  })
  render(<Provider store={checkListStore}><Login dummyUserValue={dummyUserValue}/></Provider>)
  const emailField = screen.queryByRole('textbox')
  expect(emailField).toBeTruthy()
  const passwordField = screen.queryByPlaceholderText('Password').querySelector('input')
  expect(passwordField).toBeTruthy()
  const loginButton = screen.queryByRole('button')
  expect(loginButton).toBeTruthy()

  act(() => {
    //Enter credentials
    fireEvent.change(emailField, {target: {value: dummyUserValue.email}})
    fireEvent.change(passwordField, {target: {value: dummyUserValue.password}})
    fireEvent.click(loginButton)
  })

  setTimeout(() => {
    expect(axios.post).toBeCalledTimes(1)
    expect(screen.queryByText('Login')).toBeTruthy()
    expect(screen.queryByText('Login Success.')).toBeTruthy()
    done()
  }, 1)
  
})