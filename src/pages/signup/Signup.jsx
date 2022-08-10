import React from 'react'
import { Button, Form, Input } from 'antd';
import {useNavigate} from 'react-router-dom'
import {postUserData} from '../../actions/Auth'
import {addUserDetails} from '../../features/UserSlice'
import { useDispatch } from 'react-redux'
import LoginImg from '../../assets/signup.png'
import classes from './Signup.module.css'

const Login = ({setLogin}) => {
 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = (values) => {
        postUserData(values.name,values.email,values.password)
        .then(res=>{
           dispatch(addUserDetails(res))
           setLogin(true)
           navigate("/")
        })
        .catch(err=>{
            console.log(err)
        })
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    
    return (
    <div className={classes.login__container}>
        <img src={LoginImg} alt="login img" className={classes.img}/>
        <div className={classes.login__form}>
        <h2>Signup page</h2>
        <Form
        name="basic"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
        label="Name"
            name="name"
            rules={[
            {
                type: "text",
                required: true,
                message: 'Please input your name!',
            },
            ]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
        label="Email"
            name="email"
            rules={[
            {
                type: "email",
                required: true,
                message: 'Please input your email!',
            },
            ]}
        >
            <Input/>
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

        <Form.Item>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
        </div>
    </div>
  )
}

export default Login