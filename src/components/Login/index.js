import React from 'react';
import { Form, Input, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import './Login.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login() {

  const onFinish = (e) => {
      alert("No implementation as of now for submitting")
  }
  
  return (
    <div>
      <Title level={1} style={{textAlign: 'center'}}>Login</Title>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
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
    </div>
    
  )
}

export default Login