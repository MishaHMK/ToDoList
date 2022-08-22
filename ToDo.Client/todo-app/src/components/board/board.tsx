import {useState} from "react"
import { IBoard} from "../../interfaces/IBoard";
import { useBoardStore } from "../../stores/board.store";
import {  Card, List, Modal, Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { IObjective } from "../../Interfaces";

export default function Board ({brd})  { 

  const { Text, Link } = Typography;
  const navigate = useNavigate();

  const [state, actions] = useBoardStore();

  const showModal = (id) => {
    state.currentId = id;
    state.currentTitle = brd.title;
    state.currentTasks = brd.tasks;
    console.log(state.currentTitle);
    actions.makeModalVisible();
  };

  const deleteBoard = (id : any) : any => {
    actions.deleteBoardById(id);
  }

  const objectivePage = (id : any) => {
    state.currentId = id;
    state.currentTitle = brd.title;
    navigate("./items/" + id, { replace: true });
  } 
 
     return(
       <div>
             <List.Item>
                <Card title={brd.title}>
                  <List>
                  {brd.tasks.map((obj: IObjective, key: number) => (
                     <List.Item key={key}>
                        {obj.completed ? (
                                <Text delete> {obj.title}</Text>
                              ) : (
                                <Text> {obj.title} </Text>
                              )}
                        </List.Item>
                    ))} 
                  </List>
                    <Button onClick={() => objectivePage(brd.id)}> Tasks </Button>
                    <Button onClick={() => showModal(brd.id)}> Edit </Button>
                    <Button type="primary" onClick={() => {deleteBoard(brd.id)}} danger> Delete </Button>
                </Card>
            </List.Item>
         </div>         
     ) 

}

/*  {brd.tasks.map((obj: IObjective, key: number) => (
                     <p key={key}>{obj.title}</p>
                    ))}  */


 /*   <List>
                  {brd.tasks.map((obj: IObjective, key: number) => (
                     <List.Item key={key}>
                        <List.Item.Meta  title={obj.title} />
                        <Text delete> title={obj.title}</Text>
                      </List.Item>
                    ))} 
                  </List> */                   