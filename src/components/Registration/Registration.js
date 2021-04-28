import {React, useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Title from 'antd/lib/typography/Title';
import * as url from '../../constants/URLs'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


function Registration(props) {
    
    const [userDetails, setUserDetails] = useState(props.dummyUserValue)

    const registerUser = values => {
        if (values.confirmPassword !== values.password) {
            alert('Passwords are not matching.')
        } else {
            axios.post(`${url.USER_URL}/register`,
                {
                    ...values,
                    email: props.dummyUserValue.email //The API mandates email field
                }
            ).then(response => {
                if (response.status === 201) {
                    console.log(response.data.token); //Logged so that user can be deleted manually from POSTMAN
                    alert("You've been successfully registered. Please login.")
                    alert("Email: " + values.email + " password: " + values.password)
                }
            }).catch(error => {
                alert(error.response.data);
            })
        }
    }

    return (
        <div>
          <Title level={1} style={{textAlign: 'center'}}>Registration</Title>
          <Form
            {...layout}
            name="basic"
            initialValues={userDetails}
            onFinish={registerUser}
          >
            <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item> <br/>

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


    
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              placeholder='Confirm Password'
              rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
              <Input.Password />
            </Form.Item> <br/>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
        
      )
}

export default Registration