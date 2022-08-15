import React, {ChangeEvent, FC, useState, useEffect, RefObject} from 'react';
import { IObjective } from '../../interfaces/IObjective';
import { useObjectiveStore } from '../../stores/objective.store';
import {Modal, Button, Form, Input} from 'antd';


export const ObjectiveEditModal: React.FC = () => {

    const [state, actions] = useObjectiveStore();

    const hideModal = () => {
      actions.makeModalInvisible();
    };

    useEffect(() => {
      actions.getBoardObjectives(state.currentId);
    }, []);

    const onFinish = (values) => {
      console.log(values);

      const objectiveToUpdate : IObjective = 
      { id: state.currentId, 
        title: values.title, 
        taskDescription: values.description, 
        completed: state.currentCompletion, 
        boardId: state.currentBoardId
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
                  max: 30
                },
              ]}>
              <Input defaultValue = {state.currentTitle}/>
             </Form.Item>

              <Form.Item 
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  max: 50
                },
              ]}>
              <Input defaultValue = {state.currentDescription} />
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