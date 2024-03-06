// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;

use serde::Serialize;
use tauri::{Manager, Runtime};

use crate::todos::Todo;

mod todos;

#[derive(Serialize)]
pub struct GlobalAppState {
    todos: Mutex<Vec<Todo>>,
}

pub fn set_default_state() -> GlobalAppState {
    GlobalAppState {
        todos: Mutex::new(Vec::new()),
    }
}

fn main() {
    tauri::Builder::default()
        .manage(set_default_state())
        .invoke_handler(tauri::generate_handler![get_todos, add_todo, reset_todos])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_todos<R: Runtime>(app: tauri::AppHandle<R>) -> Vec<Todo> {
    let mut data = Vec::new();
    &app.state::<GlobalAppState>().todos.lock().unwrap().iter().for_each(|todo| {
        data.push(Todo {
            id: todo.id,
            created_at: todo.created_at.clone(),
            title: todo.title.clone(),
            completed: todo.completed,
        });
    });

    data
}

#[tauri::command]
fn add_todo<R: Runtime>(app: tauri::AppHandle<R>, id: i32, title: String) {
    app.state::<GlobalAppState>().todos.lock().unwrap().push(Todo {
        id,
        created_at: "2021-01-01".to_string(),
        title,
        completed: false,
    });
}

#[tauri::command]
fn reset_todos<R: Runtime>(app: tauri::AppHandle<R>) {
    app.state::<GlobalAppState>().todos.lock().unwrap().clear();
}
