import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import Board from './board';
import { useBoardStore } from "../../stores/board.store";
import { List, Button, Modal } from "antd";
import { BoardCreate } from './boardCreate';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ObjectiveList }from '../objective/objectivesList';
import { BoardEdit } from './boardEdit';
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
window.React = React

export const BoardList: React.FC = () => {
    const [state, actions] = useBoardStore();
    const navigate = useNavigate();

    useEffect(() => {
            actions.getBoardObjectives();
        }, []);

    const logOut = () => {
        navigate("../login", { replace: true });
    } 

    return (
        <div>
            <h2 className='todoTitle'> Hello, {state.currentUser.name}!</h2>
            <br></br>
            <BoardCreate/>
            <br></br>
            <List
            grid={{ column: 3}}
            dataSource={state.boards}
            renderItem={(item) => (
                <Board brd={item}/>
            )}/>
            <BoardEdit/>
            <br></br>
            <Button className='returnBtn' onClick={logOut} block>Log Out</Button >
       </div>
    );
};
