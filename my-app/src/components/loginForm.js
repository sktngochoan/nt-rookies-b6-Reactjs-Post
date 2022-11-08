import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { login } from '../services';
const LoginForm = () => {
  const [user, setUser] = useState({ username: '', password: '', remember: false });
  const [isLogin, setIsLogin] = useState(false);
  const [dataUser, setDataUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: '',
    birthDate: ""
  });

  let navigate = useNavigate();
  const onFinish = (values) => {
    setUser(values);
    setIsLogin(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (isLogin === true) {
      login(user.username, user.password).then((res) => {
        console.log(res.status);
        if (res?.data && res.status === 200) {
          setDataUser(res?.data);
          console.log(res?.data);
          setIsLogin(false);
          notification.success("Login successfully!!!");
          navigate('/posts');
        }
        else{
        }
      })
    }
  }, [user]);
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"

        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;