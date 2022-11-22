import { createStore, createHook, Action } from 'react-sweet-state';
import { IBoard } from '../interfaces/IBoard';
import axios from "axios";

type State = { boards: any, objs: any, IsShown: any, currentId: any, currentTitle: any, currentTasks: any};
type Actions = typeof actions;


const initialState: State = {
  boards: [],
  objs: [],
  IsShown: false,
  currentId: 1,
  currentTitle: ' ',
  currentTasks: []

};

const actions = {
  getAllBoards: () : Action<State> => 
    async ({ setState}) => {
        const brds = await axios.get("https://localhost:44342/api/boards");
        setState({
          boards: brds.data
        });
    },

    getBoardById: (id: any) : Action<State> => 
    async ({ setState}) => {
        const brd = await axios.get("https://localhost:44342/api/boards/" + id);
        setState({
          currentTitle: brd.data.title
        });
    },

    getBoardObjectives: () : Action<State> => 
    async ({ setState}) => {
        const brds = await axios.get("https://localhost:44342/api/boards/brd/2");
        setState({
          boards: brds.data
        });
    },

    createNewBoard: (boardToCreate: IBoard) : Action<State> => 
    async ({ setState, getState }) => {
        const {data: newBoard} = await axios.post("https://localhost:44342/api/boards", boardToCreate);
        newBoard.tasks = [];
        setState({
          boards: [...getState().boards, newBoard]
        });
    }, 

    updateBoard: (brdId: number, boardToUpdate: IBoard) : Action<State> => 
    async ({ setState, getState }) => {
        var board: IBoard = {...boardToUpdate};
        await axios.put("https://localhost:44342/api/boards/" + brdId, board);
        const updList = getState().boards.map(brd=> {
          if(brdId === brd.id){
             return boardToUpdate; }
          return brd;
        })

        setState({boards: updList });
    }, 

   deleteBoardById: (id: any) : Action<State> => 
    ({ setState, getState }) => {
      if(window.confirm('Are you sure?')){
        axios.delete("https://localhost:44342/api/boards/" + id);
        const newList = getState().boards.filter(brd => brd.id != id);
        setState({
          boards: newList
        });
      }
    },

    makeModalVisible: (): Action<State> => 
    async ({ setState }) => 
    {
      setState({
        IsShown: true,
      });
    },
  
    makeModalInvisible: (): Action<State> => async ({ setState }) => {
      setState({
        IsShown: false
      });
    }
};

const Store = createStore<State, Actions>({
  initialState,
  actions
});

export const useBoardStore = createHook(Store);

