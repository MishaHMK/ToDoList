import React, {ChangeEvent, useState, useEffect} from "react"
import { IObjective } from "../../interfaces/IObjective";
import { useBoardStore } from "../../stores/board.store";
import { useObjectiveStore } from "../../stores/objective.store";
import {Modal, Button, Form, Input} from 'antd'; 
import { ObjectiveEdit } from "./objectiveEdit";

export default function Objective ({obj})  {

   const [state, actions] = useObjectiveStore();

    const showModal = (id) => {
      state.currentId = id;
      state.currentTitle = obj.title;
      state.currentDescription = obj.taskDescription;
      state.currentCompletion = obj.completed;
      state.currentBoardId = obj.boardId;
      actions.makeModalVisible();
    }; 

   const deleteObjective = (id : any) : any => {
      actions.deleteObjectiveById(id);
  }

  const checkboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const objToUpdate : IObjective = 
      { id: obj.id, 
        title: obj.title,
        taskDescription: obj.taskDescription,
        completed: event.target.checked,
        boardId: obj.boardId
      };
    actions.updateObjective(obj.id, objToUpdate );
  }

    return(
      <div>
        <div className="obj">
            <div className="content">
                <span>{obj.title}</span>
                <span>{obj.taskDescription}</span>
               <span><input type="checkbox" checked={obj.completed} onChange = {checkboxChange} /></span> 
            </div>
            <button onClick={() => showModal(obj.id)}> edit</button>
            <button className="button-del" onClick={() => {deleteObjective(obj.id)}}>delete</button>
        </div> 
        </div>
    ) 
}
