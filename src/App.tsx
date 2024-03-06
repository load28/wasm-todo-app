import './App.css'
import {invoke} from '@tauri-apps/api/tauri'
import {useState} from "react";


function App() {
    const [data, setData] = useState<any>([]);

    const load = async () => {
        const res = await invoke('get_todos')
        console.log(res)
        setData(res);
    }

    const addData = async () => {
        await invoke('add_todo', {id: (data.length || 0) + 1, title: 'Hello'})
    }

    const reset = async () => {
        setData([]);
        await invoke('reset_todos');
    }

    return (
        <>
            <button onClick={() => load()}>Load</button>
            <button type="button" onClick={() => addData()}>Add</button>
            <button type="button" onClick={() => reset()}>Rest</button>
            <ul>
                {data.map((item: any) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </>
    )
}

export default App
