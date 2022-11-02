import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import LoginForm from '../components/loginForm';

const { Title } = Typography;

const Login = () => {
    const [user,setUser] = useState({
        name:'',
        password:''
    })
    const [error,setError] = useState("");
    const admin = {
        name:"admin",
        password:"123"
    };
    const Login = details => {
        console.log(details);
    };
    const logout = () => {
        console.log("Logout");
    };
    return (
        <LoginForm />
      );
}

export default Login;