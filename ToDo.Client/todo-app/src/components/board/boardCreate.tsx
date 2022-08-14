import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import { IBoard } from '../../interfaces/IBoard';
import { Button, Input} from 'antd';
import { useBoardStore } from '../../stores/board.store';
import { brotliDecompress } from 'zlib';

export const BoardCreate: React.FC = () => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) : void => {
            setTitle(event.target.value)
    };


    const [boardName, setTitle] = useState<string>("");
    const [state, actions] = useBoardStore();

    const createBoard = async () => {
        const newBoard : IBoard = {title: boardName};
        actions.createNewBoard(newBoard);
      }

    return (
        <div className="create">
            <div className="inputContainer">
             <Input size="large" type="text" placeholder='Board...' name = "obj" value={boardName} onChange={handleChange}/>
             <button className = "button-add" onClick={createBoard}>Add Board</button>
            </div>
        </div>
    );
};