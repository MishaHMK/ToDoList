import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import { IObjective } from '../../interfaces/IObjective';
import { useObjectiveStore } from '../../stores/objective.store';
import {Modal, Button, Form, Input} from 'antd';

interface Props {
    isShown: boolean;
}

export const ObjectiveEditModal: React.FC<Props> = () => {

    const [state, actions] = useObjectiveStore();
    const [visible, setVisible] = useState(false);

    const hideModal = () => {
      actions.makeModalInvisible();
    };

    const onFinish = (values) => {
      console.log(values);
      const objectiveToUpdate : IObjective = 
      { id: state.currentId, 
        title: values.title, 
        taskDescription: values.description, 
        completed: false, 
        boardId: 1
      };
      
      actions.updateObjective(state.currentId, objectiveToUpdate);
    };

    return (
      <div className="container">
        <Modal 
          onCancel={hideModal}
          footer={null}
          visible={state.IsShown}
          aria-labelledby="contained-modal-title-vcenter" centered>

          <h2>Edit Objective</h2>
          <Form onFinish={onFinish}
              initialValues={{
                title: state.currentTitle,
                description: state.currentDescription
              }}>
              <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
             </Form.Item>

              <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
             </Form.Item>

             <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              </Form.Item>

        </Form>
      </Modal>
      </div>
     );
};