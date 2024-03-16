import {Box, Button, Checkbox, FormControlLabel, Grid} from "@mui/material";
import React from "react";
import {Todo, useTodoStore} from "../store/TodoStore.ts";

export const TodoItem: React.FC<{ todo: Todo }> = ({todo}) => {
    const updateTodo = useTodoStore((state) => state.updateTodo);
    const removeTodo = useTodoStore((state) => state.removeTodo);
    const onChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateTodo({
            ...todo,
            checked
        });
    };
    const onRemove = () => {
        removeTodo(todo.id);
    }

    return (
        <Box maxWidth="xl">
            <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  columns={2}
                  wrap="nowrap"
            >
                <Grid item xs={true}>
                    <FormControlLabel
                        className="todo-item"
                        sx={{width: '100%', marginRight: 0, userSelect: 'none'}}
                        control={<Checkbox checked={todo.checked} onChange={onChange}/>}
                        label={todo.title}/>
                </Grid>
                <Grid item>
                    <Button variant={'outlined'} size={'small'} color={'secondary'} onClick={onRemove}>Delete</Button>
                </Grid>
            </Grid>
        </Box>
    )
}