import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import Board from './board';
import { useBoardStore } from "../../stores/board.store";
import { List, Button, Modal } from "antd";
import { BoardCreate } from './boardCreate';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ObjectiveList from '../objective/objectivesList';

export const BoardList: React.FC = () => {
    const [state, actions] = useBoardStore();

   useEffect(() => {
        actions.getBoardObjectives();
    }, []);

    return (
        <div>
            <br></br>
            <BoardCreate/>
            <br></br>
            <List
            grid={{ column: 3}}
            dataSource={state.boards}
            renderItem={(item) => (
                <Board brd={item}/>
            )}/>

       </div>
    );
};
