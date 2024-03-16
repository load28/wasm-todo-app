import {create} from "zustand";

export interface Todo {
    id: string
    title: string
    checked: boolean
}

export interface TodoStore {
    todoList: Todo[];
    addTodo: (title: string) => void;
    updateTodo: (updatedTodo: Todo) => void;
    removeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
    todoList: [
        {id: "1", title: "First", checked: false},
        {id: "2", title: "Second", checked: false},
        {id: "3", title: "Third", checked: false},
    ],
    addTodo: (title: string) => {
        set((state) => ({todoList: [...state.todoList, {id: Math.random().toString(), title, checked: false}]}))
    },
    updateTodo: (updatedTodo: Todo) => {
        set((state) => ({
            todoList: state.todoList.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    return {...updatedTodo}
                }
                return todo
            })
        }))
    },
    removeTodo: (id: string) => {
        set((state) => ({todoList: state.todoList.filter((todo) => todo.id !== id)}))
    }
}))