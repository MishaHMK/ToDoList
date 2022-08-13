export default class ObjectiveModel {
    id?: any;
    title: string;
    taskDescription: string;
    completed: boolean;
    boardId: any;

    constructor(id: any, title: string, taskDescription: string, completed: boolean, boardid: any) {
        this.id = id;
        this.title = title;
        this.taskDescription = taskDescription;
        this.completed = completed;
        this.boardId = boardid;
    } 
}