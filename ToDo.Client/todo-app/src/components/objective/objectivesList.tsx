import React, {useEffect} from 'react';
import Objective from './objective';
import { useObjectiveStore } from '../../stores/objective.store';
import { IObjective } from '../../interfaces/IObjective';
import { ObjectiveCreate } from './objectiveCreate';
import { useBoardStore } from "../../stores/board.store";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { ObjectiveEdit } from "./objectiveEdit";

export default function  ObjectiveList () {
    const navigate = useNavigate();
    const [obj_state, obj_actions] = useObjectiveStore(); 
    const [brd_state, brd_actions] = useBoardStore ();   

   useEffect(() => {
        obj_actions.getBoardObjectives(brd_state.currentId);
    }, []);

    const mainPage = () => {
        navigate("../", { replace: true });
    } 

    return (

    <div>
        <h1 className='todoTitle'> {brd_state.currentTitle} Tasks</h1>

        <ObjectiveCreate/>
        <br></br>
        <Button className='returnBtn' onClick={mainPage} block>Return to Boards</Button >
        <ul>
            {obj_state.objectives.map((obj: IObjective, key: number) => (
            <Objective key = {key} obj={obj}/>
        ))}
        </ul>     
        <ObjectiveEdit/>
    </div>
    );
};