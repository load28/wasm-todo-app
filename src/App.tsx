import "./App.css";
import { TodoItem } from "./components/TodoItem.tsx";
import { useTodoStore } from "./store/TodoStore.ts";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useRef, useState } from "react";

function App() {
  const [viewMode, setViewMode] = useState<"list" | "add">("list");
  const [inputValue, setInputValue] = useState("");
  const list = useTodoStore((state) => state.todoList);
  const addTodo = useTodoStore((state) => state.addTodo);
  const completed = list.filter((todo) => todo.checked).length;

  const inputRef = useRef<HTMLInputElement>();

  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>, title?: string) => {
    if (e.key === "Enter") {
      onAddTodo(title);
    }

    if (e.key === "Escape") {
      onOpenAddView("list");
    }
  };

  const onAddTodo = (title?: string) => {
    if (!title) return;
    addTodo(title);
    setInputValue("");
  };

  const onOpenAddView = (mode: "add" | "list") => {
    setViewMode(mode);
  };

  return (
    <>
      <Container>
        <Stack spacing={4}>
          <Grid
            container
            columns={2}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Grid item>
              <Typography variant="h5">Completed: {completed}</Typography>
            </Grid>
            <Grid>
              <IconButton
                disabled={viewMode === "add"}
                aria-label="add"
                onClick={() => onOpenAddView("add")}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>

          {viewMode === "add" && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              alignItems={"center"}
            >
              <TextField
                value={inputValue}
                inputRef={inputRef}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={(k) => onEnter(k, inputValue)}
                autoFocus={true}
                id="newTodo"
                label="title"
                variant="outlined"
                size={"small"}
              />
              <Button onClick={() => onAddTodo(inputValue)} size={"small"}>
                Add
              </Button>
              <Button
                onClick={() => onOpenAddView("list")}
                size={"small"}
                color="error"
              >
                cancel
              </Button>
            </Box>
          )}
          <Box marginTop={4}>
            {list.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </Box>
        </Stack>
      </Container>
    </>
  );
}

export default App;
