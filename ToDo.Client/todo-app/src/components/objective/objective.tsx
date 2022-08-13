import React, {ChangeEvent, useState} from "react"
import { IObjective } from "../../interfaces/IObjective";
import { useBoardStore } from "../../stores/board.store";
import { useObjectiveStore } from "../../stores/objective.store";

export default function Objective ({obj})  {

   const [state, actions] = useObjectiveStore();

   const deleteObjective = (id : any) : any => {
      actions.deleteObjectiveById(id);
  }

  const updateObjective = (id: any) : any => {
    actions.makeModalVisible(id);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    var value = event.target.value;
    console.log(value); 

    const objectiveToUpdate : IObjective = 
      { id: obj.id, 
        title: obj.title, 
        taskDescription: obj.taskDescription, 
        completed: event.target.checked, 
        boardId: obj.boardId
      };

    actions.updateObjective(obj.id, objectiveToUpdate);
};

    return(
      <div>
        <div className="obj">
            <div className="content">
                <span>{obj.title}</span>
                <span>{obj.taskDescription}</span>
               <span><input type="checkbox" checked={obj.completed} onChange = {handleChange} /></span> 
            </div>
            <button onClick={() => {updateObjective(obj.id)}}>edit</button>
            <button className="button-del" onClick={() => {deleteObjective(obj.id)}}>delete</button>
        
        </div> 
        </div>
    ) 
}
