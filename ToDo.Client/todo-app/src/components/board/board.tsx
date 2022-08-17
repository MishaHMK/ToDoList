import {useState} from "react"
import { IBoard} from "../../interfaces/IBoard";
import { useBoardStore } from "../../stores/board.store";
import {  Card, List, Modal, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { IObjective } from "../../Interfaces";

export default function Board ({brd})  { 

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
                     <p key={key}>{obj.title}</p>
                    ))} 
                  </List>
                <button onClick={() => objectivePage(brd.id)}> tasks</button>
                <button onClick={() => showModal(brd.id)}> edit</button>
                <button className="button-del" onClick={() => {deleteBoard(brd.id)}}>delete</button>
                </Card>
            </List.Item>
         </div>         
     ) 

}
