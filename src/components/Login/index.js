import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import './Login.css'
import axios from 'axios';
import * as url from '../../constants/URLs'
import { useDispatch } from 'react-redux';
import { login } from '../../state/actioncreators/Login';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login(props) {
  const[status, setStatus] = useState({message: '', color: 'blue'})

  const dispatch = useDispatch()

  const onFinish = (values) => {
    setNormalStatus('Logging you in. Please wait.')
    axios.post(`${url.USER_URL}/login`, {
      email: values.email,
      password: values.password
    }).then(response => {
      if (response.status === 200) {
        setSuccessMessage('Login Success.')
        dispatch(login(response.data.token))
      }
    }).catch(error => {
      setErrorMessage('Invalid credentials.')
    })
  }

  function setNormalStatus(message) {
    setStatus({message: message, color: 'blue'})
  }
  
  function setSuccessMessage(message) {
    setStatus({message: message, color: 'green'})
  }

  function setErrorMessage(message) {
    setStatus({message: message, color: 'red'})
  }

  return (
    <div>
      <Title level={1} style={{textAlign: 'center'}}>Login</Title>
      <Title level={3} style={{textAlign: 'center', color: `${status.color}`}}>&nbsp;{status.message}&nbsp;</Title>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item> <br/>

        <Form.Item
          label="Password"
          name="password"
          placeholder='Password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item> <br/>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <p style={{textAlign: 'center'}}>
        For the sake of demo, you can use the following registered credentials:<br/><br/>
        <p><b>Email:</b> {props.dummyUserValue.email}<br/></p>
        <p><b>Password:</b> {props.dummyUserValue.password}</p>
      </p>
    </div>
    
  )
}

export default Login