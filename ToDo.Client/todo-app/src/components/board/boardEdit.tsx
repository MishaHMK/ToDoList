import {useState, useEffect} from "react"
import { IBoard} from "../../interfaces/IBoard";
import { useBoardStore } from "../../stores/board.store";
import { Modal, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";


export const BoardEdit: React.FC = () =>{ 

    const [state, actions] = useBoardStore();
    const [form] = useForm();

    useEffect(() => {  
        if(state.IsShown == true){
            updateModal();
        }   
    }, [state.IsShown]);

    const updateModal = () => {
        form.setFieldsValue({
            Title: state.currentTitle
        });
         console.log(state.currentTitle);
    };

    const handleCancel = () => {
        actions.makeModalInvisible();
    };

    const handleChange = (values) => {
        console.log(values);

        const boardToUpdate : IBoard = 
        { 
            id: state.currentId, 
            title: values.Title,
            tasks: state.currentTasks
        };

        actions.updateBoard(state.currentId, boardToUpdate);
        actions.makeModalInvisible();
    };
 
     return(
            <Modal
                title="Edit Board"
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

                      <Form.Item >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                  </Form>
            </Modal>      
     ) 

}
