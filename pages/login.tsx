import React, {Component, SyntheticEvent, useState} from 'react'
import {useRouter} from "next/router"
import jwtDecode, { JwtPayload } from "jwt-decode";
import axios from "axios";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxChangeEventTarget } from "antd/lib/checkbox/Checkbox";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Typography from "antd/lib/typography";
import Form, { FormInstance }  from "antd/lib/form"
import Divider from "antd/lib/divider"
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import { message } from 'antd';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const tailLayout = {
    labelCol: { span: 8 },
    wrapperCol: { offset: 8, span: 16 },
    margintop: 2,
};

const Title = Typography;

const LogIn = () => {

    const formRef = React.createRef<FormInstance>();
    const router = useRouter();
    const [state, setState] = useState({
        email: '',
        password: '',
        role: '',
        sessionToken: '',
        errors: {},
        remember: false
    });

    const handleReset = () => {
        formRef.current!.resetFields();
    }

    const handleEmailChange = (event: SyntheticEvent & {target: HTMLInputElement}): void => {
            setState({...state, email: event.target.value});
        }

    const handlePasswordChange = (event: SyntheticEvent & {target: HTMLInputElement}): void => {
            setState({...state, password: event.target.value});
        }

    const handleRemember = (event: CheckboxChangeEvent & {target: CheckboxChangeEventTarget}): void => {
        setState({...state, remember: event.target.checked});
    }

    const handleSubmit  = async (event: React.FormEvent<HTMLFormElement>) => {
            // event.preventDefault();
            // console.log(state.remember)
            const body = {email: state.email, password: state.password}
            await axios
                .post(`http://localhost:3900/api/auth`, {...body})
                .then(
                    async (res ) => {
                        if (res.status === 200) {
                            // cookie.set("userToken", res.data);
                            const user: any = jwtDecode(res.data)
                            
                                const response = await fetch("/api/sessions", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(user)
                                });
                            
                            router.push({pathname : `/${user.role}`});
                        }
                    })
                .catch(
                    (err) => {
                        message.error("Invalid UserName Or Password!")
                    }
                )
        }

    return (
        <React.Fragment> 
            <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col>
            <Row>
                <h2 style={{marginLeft: 'auto', marginRight: 'auto'}} > LogIn </h2> 
                <Divider ></Divider>
            </Row> 

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    ref={formRef} 
                    // onFinishFailed={onFinishFailed}
                >   
                    {/* <Divider></Divider> */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input prefix = {<UserOutlined/>} onChange = {handleEmailChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix = {<LockOutlined/>} onChange = {handlePasswordChange}/>
                    </Form.Item>

                    <React.Fragment>
                        
                    </React.Fragment>

                    <Form.Item {...tailLayout}>

                        {/* <Checkbox onChange = {handleRemember}>Remember me</Checkbox> */}

                        <a className="login-form-forgot" href="#" children="Forgot Password"/>

                        <Button type="primary" htmlType="submit" className = "ant-btn login-form-button ant-btn-primary">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={handleReset}>
                            Reset
                        </Button>
                    </Form.Item>

                <Divider> </Divider>
                </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default LogIn;