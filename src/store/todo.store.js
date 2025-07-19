import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: "all",
    Completed: "Completed",
    Pending: "Pending",
}

const state = {
    todos: [
        new Todo("Piedra del alma"),
        new Todo("Piedra del infinito"),
        new Todo("Piedra del tiempo"),
        new Todo("Piedra del poder"),
        new Todo("Piedra del realidad"),
    ],
    filter : Filters.All,
}

const initStore = () => {
    loadStore();
    console.log("initStore 🥑");

}

const loadStore = () => {
    if (!localStorage.getItem("state")) return;

    const { todos = [] , filter = Filters.All} = JSON.parse(localStorage.getItem("state"));
    state.todos  = todos;
    state.filter = filter;
}

const saveStateLocalStorage = () => {
    localStorage.setItem("state",JSON.stringify(state))
}

const getTodo = (filter = Filters.All) => {
    
    switch (filter){

        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done);

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);

        default:
            throw new Error(`Option ${filter} is not valid.`);
    }
}
/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error ( "Description is requiried" );

    state.todos.push( new Todo(description));

    saveStateLocalStorage();
}
/**
 * funcion que permite actulizar el estado de done
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    
    state.todos = state.todos.map( todo => {
        if ( todo.id == todoId){
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateLocalStorage();
}
/**funcion que recibe un todoId y lo elimina si es igual al id de todos comparado
 * 
 * @param {String} todoId 
 * @return {Todo} todo
 * 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);

    saveStateLocalStorage();
}
/**Funcion sin parametros que filtra los todos y devuelve los que no estan en estado done 
 * 
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );

    saveStateLocalStorage();
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;

    saveStateLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}
export default{
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodo,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}