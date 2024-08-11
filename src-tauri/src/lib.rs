// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
#[cfg(target_os = "ios")]
fn is_ios() -> bool {
    true
}

#[tauri::command]
#[cfg(not(target_os = "ios"))]
fn is_ios() -> bool {
    false
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .setup(move |app| {
            #[cfg(mobile)]
            {
                app.handle()
                    .plugin(tauri_plugin_barcode_scanner::init())
                    .unwrap();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![is_ios])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
