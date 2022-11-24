import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import { IUser } from '../../interfaces/IUser';
import {Button, Form, Input} from 'antd';
import { useUserStore } from '../../stores/user.store';


export const UserRegister: React.FC = () => {

    const [state, actions] = useUserStore();

    const createUser = async (values) => {
        const newUser : IUser = {name: values.name, email: values.email, password: values.password};
        actions.registerUser(newUser);
      }

    return (
        <div> 
            <h1 className='todoTitle'> Register </h1>
        <div className="create">
            <Form 
            onFinish={createUser}>
                <Form.Item
                    name="name"
                    rules={[
                    {
                        max: 30,
                        required: true
                    },
                    ]}>
                    <Input placeholder="Name" />
                </Form.Item>
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
                    <Input placeholder="Password" />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                    <Button
                        type="primary"
                        style={{ background: "#52c41a", borderColor: "green" }}
                        htmlType="submit">
                        Register
                    </Button>
                    )}
                </Form.Item>
         </Form>
        </div>
    </div>
    );
};