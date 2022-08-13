import {useState} from "react"
import { IBoard} from "../../interfaces/IBoard";
import { useBoardStore } from "../../stores/board.store";
import {  Card, List, Modal, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { IObjective } from "../../Interfaces";

export default function Board ({brd})  { 

  const navigate = useNavigate();

  const [state, actions] = useBoardStore();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
      setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteBoard = (id : any) : any => {
    actions.deleteBoardById(id);
  }

 const handleChange = (values) => {
    console.log(values);
    const boardToUpdate : IBoard = 
      { id: brd.id, 
        title: values.title
      };
    actions.updateBoard(brd.id, boardToUpdate);
 }

  const objectivePage = (id : any) => {
    state.currentId = id;
    state.currentTitle = brd.title;
    navigate("./items/" + id, { replace: true });
    console.log(state.currentId);
  } 
 
     return(
       <div>
             <List.Item>
                <Card title={brd.title}>
                  <List>
                  
                 </List> 
                <button onClick={() => objectivePage(brd.id)}> tasks</button>
                <button onClick={showModal}> edit</button>
                <button className="button-del" onClick={() => {deleteBoard(brd.id)}}>delete</button>
                </Card>
            </List.Item>

        

            <Modal
                title="Edit Board"
                visible={isModalVisible}
                onOk={handleOk}
                footer={null}
                onCancel={handleCancel}>
                <Form onFinish={handleChange}>

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


              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                </Form.Item>

        </Form>
            </Modal>
         </div>
     ) 

}


/*   {brd.tasks.map((obj: IObjective, key: number) => (
                     <p key={key}>{obj.title}</p>
                    ))} 
  */