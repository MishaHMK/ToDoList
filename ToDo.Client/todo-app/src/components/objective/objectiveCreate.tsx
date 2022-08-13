import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import { IObjective } from '../../interfaces/IObjective';
import { Input} from 'antd';
import { useObjectiveStore } from '../../stores/objective.store';
import { useBoardStore } from '../../stores/board.store';

export const ObjectiveCreate: React.FC = () => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) : void => {
        if(event.target.name === "obj"){
            setTitle(event.target.value)
        }
        else setDescription(event.target.value)
    };


    const [objectiveName, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [obj_state, obj_actions] = useObjectiveStore();
    const [brd_state, brd_actions] = useBoardStore();

    const createObjective = async () => {
        const newObjective : IObjective = {title: objectiveName, taskDescription: description, completed: false, boardId: brd_state.currentId };
        obj_actions.createNewObjective(newObjective);
      }

    return (
        <div className="create">
            <div className="inputContainer">
             <Input size="large" type="text" placeholder='Objective...' name = "obj" value={objectiveName} onChange={handleChange}/>
             <Input size="large" type="text" placeholder='Some details...' name = "desc" value={description} onChange={handleChange}/>
             <button className = "button-add" onClick={createObjective}>Add Objective</button>
            </div>
        </div>
    );
};