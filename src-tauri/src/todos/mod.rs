use serde::Serialize;

#[derive(Serialize)]
pub struct Todo {
    pub id: i32,
    pub created_at: String,
    pub title: String,
    pub completed: bool,
}

impl Todo {
    pub fn update_title(&mut self, title: &str) {
        self.title = title.to_string();
    }

    pub fn update_completed(&mut self, completed: bool) {
        self.completed = completed;
    }
}

pub struct Todos {
    pub todos: Vec<Todo>,
}

impl Todos {
    pub fn new() -> Self {
        Self {
            todos: Vec::new(),
        }
    }

    pub fn add(&mut self, todo: Todo) {
        self.todos.push(todo);
    }

    pub fn get(&self) -> &Vec<Todo> {
        &self.todos
    }

    pub fn delete(&mut self, id: i32) {
        self.todos.retain(|todo| todo.id != id);
    }

    pub fn update_title(&mut self, id: i32, title: &str) {
        for todo in &mut self.todos {
            if todo.id == id {
                todo.update_title(title);
            }
        }
    }

    pub fn update_completed(&mut self, id: i32, completed: bool) {
        for todo in &mut self.todos {
            if todo.id == id {
                todo.update_completed(completed);
            }
        }
    }
}