import { createStore, createHook, Action } from 'react-sweet-state';
import { IUser } from '../interfaces/IUser';
import { ILogin } from '../interfaces/ILogin';
import axios from "axios";
import { IEmail } from '../interfaces/IEmail';
import jwt_decode from "jwt-decode";

type State = { users: any, currentEmail: any, currentUser: any};
type Actions = typeof actions;


const initialState: State = {
  currentEmail: ' ',
  users: [],
  currentUser: []
};

const actions = {
    registerUser: (userToCreate: IUser) : Action<State> => 
    async ({ setState, getState }) => {
        const {data: newUser} = await axios.post("https://localhost:44342/api/User", userToCreate);
        newUser.boards = [];
        setState({
          users: [...getState().users, newUser]
        });
    }, 

    authorizeUser: (userToLogin: ILogin) : Action<State> => 
    async ({ setState, getState }) => {
        const {data: loginUser} = await axios.post("https://localhost:44342/api/User/authenticate", userToLogin);
        const token = loginUser.tokenString;
        const decoded: any = jwt_decode(token);

        localStorage.setItem("token", token);

        setState({
          currentEmail: decoded.email
        });  

        return getState().currentEmail;
    }, 

    getUser: (adress: IEmail) : Action<State> => 
    async ({ setState, getState }) => {
      const {data: User} = await axios.post("https://localhost:44342/api/User/email", adress);
      setState({
        currentUser: User
      });

      return getState().currentUser;
    }, 

};

const Store = createStore<State, Actions>({
  initialState,
  actions
});

export const useUserStore = createHook(Store);

