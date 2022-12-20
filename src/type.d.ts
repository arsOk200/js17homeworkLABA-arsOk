export interface toDoItem{
  id:string;
  text:string;
  isDone:boolean;
}
export type ApiToDo = Omit<toDoItem, 'id'>

export interface ApiToDoList {
  [id:string]:ApiToDo;
}
export interface toDoItemMutation{
  text:string;
  isDone:boolean;
}