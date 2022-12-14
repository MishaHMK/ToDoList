import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import { IEmail } from '../../interfaces/IEmail';
import { ILogin } from '../../interfaces/ILogin';
import {Button, Form, Input} from 'antd';
import { useUserStore } from '../../stores/user.store';
import { useBoardStore } from '../../stores/board.store';
import { useNavigate } from "react-router-dom";

export const UserLogin: React.FC = () => {

    const [state, actions] = useUserStore();
    const [brd_state, brd_actions] = useBoardStore();

    const navigate = useNavigate();

   const loginUser = async (values: any) => {
        const loginUser : ILogin = {email: values.email, password: values.password};
        const email = await actions.authorizeUser(loginUser);
        const adress : IEmail = {email: email};
        const user : any = await actions.getUser(adress);
        await brd_actions.setUserId(user.id);
        await brd_actions.setCurrentUser(user);
        navigate("../boards", { replace: true });
    } 

    const register = () => {
        navigate("../register", { replace: true });
    } 

    return (
        <div> 
            <h1 className='todoTitle'> Login </h1>
        <div className="create">
            <Form 
            onFinish={loginUser}>
                <Form.Item
                    name="email"
                    rules={[
                    {
                        max: 30,
                        required: true
                    },
                    ]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        max: 30,
                        required: true
                    },
                    ]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                    <Button
                        type="primary"
                        style={{ background: "#52c41a", borderColor: "green" }}
                        htmlType="submit">
                        Login
                    </Button>
                    )}
                </Form.Item>
                <Button className='returnBtn' onClick={register} block>Register</Button >
         </Form>
        </div>
    </div>
    );
};