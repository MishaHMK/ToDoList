import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import { IBoard } from '../../interfaces/IBoard';
import {Button, Form, Input} from 'antd';
import { useBoardStore } from '../../stores/board.store';


export const BoardCreate: React.FC = () => {

    const [state, actions] = useBoardStore();

    const createBoard = async (values) => {
        const newBoard : IBoard = {title: values.title, userid: 1007};
        actions.createNewBoard(newBoard);
      }

    return (
        <div className="create">
            <Form 
            layout="inline" 
            onFinish={createBoard}>
                <Form.Item
                    name="title"
                    rules={[
                    {
                        max: 30,
                        required: true
                    },
                    ]}>
                    <Input placeholder="Title" />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                    <Button
                        type="primary"
                        style={{ background: "#52c41a", borderColor: "green" }}
                        htmlType="submit">
                        Add Board
                    </Button>
                    )}
                </Form.Item>
         </Form>
        </div>
    );
};