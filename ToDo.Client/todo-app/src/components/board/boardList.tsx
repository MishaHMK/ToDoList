import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import Board from './board';
import { IEmail } from '../../interfaces/IEmail';
import { useBoardStore } from "../../stores/board.store";
import { useUserStore } from '../../stores/user.store';
import { List, Button, Modal } from "antd";
import { BoardCreate } from './boardCreate';
import { BoardEdit } from './boardEdit';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

window.React = React

export const BoardList: React.FC = () => {
    const [state, actions] = useBoardStore();
    const [userState, userActions] = useUserStore();
    const navigate = useNavigate();

 useEffect(() => {
        const fetchData = async () => {
            const userToken = localStorage.getItem("token");
            if (userToken) {
                const decodedUser: any = jwt_decode(userToken);
                console.log(decodedUser.email);
                const email = decodedUser.email;
                const adress : IEmail = {email: email};
                console.log(adress);
                const user : any = await userActions.getUser(adress);
                await actions.setUserId(user.id);
                await actions.setCurrentUser(user);
                actions.getBoardObjectives();
            }
        }

        fetchData().catch(console.error);
    }, []);

    const logOut = () => {
        localStorage.clear();
        navigate("../", { replace: true });
    } 

    return (
        <div>
            <br></br>
            <h1 className='todoTitle'> Hello, {state.currentUser.name}!</h1>
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
