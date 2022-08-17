import React from 'react';
import { IObjective } from '../../interfaces/IObjective';
import { useObjectiveStore } from '../../stores/objective.store';
import { useBoardStore } from '../../stores/board.store';
import {Button, Form, Input} from 'antd';

export const ObjectiveCreate: React.FC = () => {

    const [obj_state, obj_actions] = useObjectiveStore();
    const [brd_state, brd_actions] = useBoardStore();

    const createObjective = (values) => {
        const newObjective : IObjective = {title: values.title, taskDescription: values.description, completed: false, boardId: brd_state.currentId };
        obj_actions.createNewObjective(newObjective);
      }

    return (
    <div className="create">
      <Form 
            layout="inline" 
            onFinish={createObjective}>
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
        <Form.Item
            name="description"
            rules={[
            {
                max: 50,
                required: true
            },
            ]}>
            <Input       
            placeholder="Description"
            />
        </Form.Item>
        <Form.Item shouldUpdate>
            {() => (
            <Button
                type="primary"
                htmlType="submit">
                Add Task
            </Button>
            )}
        </Form.Item>
    </Form>
    </div>
    );
};
