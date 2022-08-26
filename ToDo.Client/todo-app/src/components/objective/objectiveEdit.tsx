import {useState, useEffect} from "react"
import { IBoard} from "../../interfaces/IBoard";
import { useObjectiveStore } from "../../stores/objective.store";
import { Modal, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { IObjective } from "../../interfaces/IObjective";


export const ObjectiveEdit: React.FC = () =>{ 

    const [state, actions] = useObjectiveStore();
    const [form] = useForm();

    useEffect(() => {  
        if(state.IsShown == true){
            updateModal();
        }   
    });

    const updateModal = () => {
        form.setFieldsValue({
            Title: state.currentTitle,
            Description: state.currentDescription
        });
    };

    const handleCancel = () => {
        actions.makeModalInvisible();
    };

    const handleChange = (values) => {
        console.log(values);

        const objToUpdate : IObjective = 
        { 
            id: state.currentId, 
            title: values.Title,
            taskDescription: values.Description,
            completed: state.currentCompletion,
            boardId: state.currentBoardId
        };

        actions.updateObjective(state.currentId, objToUpdate);
        actions.makeModalInvisible();
    };

     return(
            <Modal
                title="Edit Objective"
                visible={state.IsShown}
                footer={null}
                onCancel={handleCancel}>

                 <Form form = {form} onFinish={handleChange} name="control-hooks">
                     <Form.Item
                          name="Title"
                          label="Title"
                          rules={[
                            {
                              max: 30,
                              required: true,
                            },
                          ]}>
                          <Input/>
                      </Form.Item>
                      <Form.Item
                          name="Description"
                          label="Description">
                          <Input/>
                      </Form.Item>

                      <Form.Item >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                  </Form>
            </Modal>      
     ) 

}
