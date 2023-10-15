// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::Serialize;
use tauri::Manager;
use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu};

#[derive(Clone, Serialize)]
struct SystemTrayPayload {
    message: String,
}

#[tauri::command]
fn change_app_window(app_handler: tauri::AppHandle, event: String) {
    let main_window = app_handler.get_window("main").unwrap();

    print!("Event: {}", event);

    if event == "quit" {
        println!("Quitting");
        main_window.close().unwrap();
    }

    if event == "minimize" {
        println!("Minimize");
        main_window.hide().unwrap();
        app_handler
            .tray_handle()
            .get_item("toggle-window-visibility")
            .set_title("Show Window")
            .unwrap();
    }

    if event == "maximize" {
        println!("Maximize");
        main_window.maximize().unwrap();
    }
    if event == "unmaximize" {
        println!("Unmaximize");
        main_window.unmaximize().unwrap()
    }
}

#[tauri::command]
fn change_tray_label(app_handler: tauri::AppHandle) {
    app_handler
        .tray_handle()
        .get_item("toggle-window-visibility")
        .set_title("Show Window")
        .unwrap();
}

#[tauri::command]
fn change_matic_experience(app_handler: tauri::AppHandle) {
    let maticWindow = app_handler.get_window("maticExperience").unwrap();
    if maticWindow.is_visible().unwrap() {
        maticWindow.hide().unwrap();
        app_handler
            .tray_handle()
            .get_item("toggle-matic-experience")
            .set_title("Show Matic Experience")
            .unwrap();
    } else {
        maticWindow.show().unwrap();
        app_handler
            .tray_handle()
            .get_item("toggle-matic-experience")
            .set_title("Hide Matic Experience")
            .unwrap();
    }
}

#[tauri::command]
fn close_matic_experience(app_handler: tauri::AppHandle) {
    let maticWindow = app_handler.get_window("maticExperience").unwrap();
    maticWindow.hide().unwrap();
    app_handler
        .tray_handle()
        .get_item("toggle-matic-experience")
        .set_title("Show Matic Experience")
        .unwrap();
}

fn main() {
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let toggle_visibility =
        CustomMenuItem::new("toggle-window-visibility".to_string(), "Hide Window");
    let toggle_matic_experience = CustomMenuItem::new(
        "toggle-matic-experience".to_string(),
        "Show Matic Experience",
    );
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_item(toggle_visibility)
        .add_item(toggle_matic_experience);

    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let main_window = app.get_window("main").unwrap();
                main_window
                    .emit(
                        "system-tray",
                        SystemTrayPayload {
                            message: "left-click".into(),
                        },
                    )
                    .unwrap();
                if main_window.is_visible().unwrap() {
                    main_window.hide().unwrap();
                    // change the menu item label
                    app.tray_handle()
                        .get_item("toggle-window-visibility")
                        .set_title("Show Window")
                        .unwrap();
                } else {
                    main_window.show().unwrap();
                    app.tray_handle()
                        .get_item("toggle-window-visibility")
                        .set_title("Hide Window")
                        .unwrap();
                }
            }
            SystemTrayEvent::MenuItemClick { id, .. } => {
                let main_window = app.get_window("main").unwrap();
                main_window
                    .emit(
                        "systemTray",
                        SystemTrayPayload {
                            message: id.clone(),
                        },
                    )
                    .unwrap();
                let item_handle = app.tray_handle().get_item(&id);

                match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "toggle-window-visibility" => {
                        if main_window.is_visible().unwrap() {
                            main_window.hide().unwrap();
                            item_handle.set_title("Show Window").unwrap();
                        } else {
                            main_window.show().unwrap();
                            item_handle.set_title("Hide Window").unwrap();
                        }
                    }
                    "toggle-matic-experience" => {
                        let maticWindow = app.get_window("maticExperience").unwrap();
                        if maticWindow.is_visible().unwrap() {
                            maticWindow.hide().unwrap();
                            item_handle.set_title("Show Matic Experience").unwrap();
                        } else {
                            maticWindow.show().unwrap();
                            item_handle.set_title("Hide Matic Experience").unwrap();
                        }
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            close_matic_experience,
            change_matic_experience,
            change_tray_label,
            change_app_window
        ])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_upload::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
