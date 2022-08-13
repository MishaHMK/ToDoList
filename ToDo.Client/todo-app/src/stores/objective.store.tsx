import { createStore, createHook, Action } from 'react-sweet-state';
import { AppService } from '../services/app.service';
import { IObjective } from '../interfaces/IObjective';
import axios from "axios";

type State = { objectives: any, IsShown: any, currentId: any, currentTitle: any, currentDescription: any };
type Actions = typeof actions;


const initialState: State = {
  objectives: [],
  IsShown: false,
  currentId: 1,
  currentTitle: ' ',
  currentDescription: ' ',
};

const actions = {
  getAllObjectives: (): Action<State> =>
    async ({ setState }) => {
      const objs = await axios.get("https://localhost:44342/api/objectives");
      setState({
        objectives: objs.data
      });
    },

  getObjectiveById: (id: any): Action<State> =>
    async ({ setState }) => {
      const objs = await axios.get("https://localhost:44342/api/objectives/" + id);
      setState({
        objectives: objs.data
      });
    },

  getBoardObjectives: (id: any) : Action<State> => 
  async ({ setState}) => {
        const objs = await axios.get("https://localhost:44342/api/boards/obj/" + id);
        setState({
          objectives: objs.data
        });
   },

  createNewObjective: (objectiveToCreate: IObjective): Action<State> =>
    async ({ setState, getState }) => {
      const { data: newObjective } = await axios.post("https://localhost:44342/api/objectives", objectiveToCreate);
      setState({
        objectives: [...getState().objectives, newObjective]
      });
    },

  updateObjective: (objId: number, objectiveToUpdate: IObjective): Action<State> =>
    async ({ setState, getState }) => {
      var objective: IObjective = { ...objectiveToUpdate };
      await axios.put("https://localhost:44342/api/objectives/" + objId, objective);

      const updList = getState().objectives.map(obj => {
        if (objId === obj.id) {
          return objectiveToUpdate;
        }
        return obj;
      })

      setState({ objectives: updList.sort((a, b) => Number(a.completed) - Number(b.completed))});
   },

  deleteObjectiveById: (id: any): Action<State> =>
    ({ setState, getState }) => {
      if (window.confirm('Are you sure?')) {
        axios.delete("https://localhost:44342/api/objectives/" + id);
        const newList = getState().objectives.filter(obj => obj.id != id);
        setState({
          objectives: newList
        });
      }
    },

  makeModalVisible: (id: any): Action<State> => async ({ setState }) => {
    const currentVisibility = true;
    const obj = await axios.get("https://localhost:44342/api/objectives/" + id);
    setState({
      IsShown: currentVisibility,
      currentId: id,
      currentTitle: obj.data.title,
      currentDescription: obj.data.taskDescription
    });
  },

  makeModalInvisible: (): Action<State> => async ({ setState }) => {
    const currentVisibility = false;
    setState({
      IsShown: currentVisibility,
      currentId: 1,
      currentTitle: ' ',
      currentDescription: ' '
    });
  }


};

const Store = createStore<State, Actions>({
  initialState,
  actions,
});

export const useObjectiveStore = createHook(Store);

