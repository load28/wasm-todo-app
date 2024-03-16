import './App.css'
import {TodoItem} from "./components/TodoItem.tsx";
import {useTodoStore} from "./store/TodoStore.ts";
import {Typography} from "@mui/material";

function App() {
    const list = useTodoStore((state) => state.todoList)
    const completed = list.filter((todo) => todo.checked).length;

    return (
        <>
            <Typography variant="h5">
                completed: {completed}
            </Typography>
            {list.map((todo) => <TodoItem key={todo.id} todo={todo}/>)}
        </>
    )
}

export default App
