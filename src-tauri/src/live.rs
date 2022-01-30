use tauri::{Manager, WindowBuilder, WindowUrl};

#[tauri::command]
pub fn open_live_window(app_handle: tauri::AppHandle) {
  if app_handle.get_window("live").is_none() {
    tauri::async_runtime::spawn(async move {
      let app_handle = app_handle.clone();
      app_handle
        .create_window(
          "live",
          WindowUrl::App("/live".into()),
          |window_builder, webview_attributes| {
            let builder = window_builder
              .title("Tape Live Helper")
              .inner_size(600., 400.)
              .decorations(false)
              .visible(true);
            (builder, webview_attributes)
          },
        )
        .unwrap();
    });
  }
}

#[tauri::command]
pub fn close_live_window(app_handle: tauri::AppHandle) {
  if let Some(w) = app_handle.get_window("live") {
    w.close().unwrap();
  }
}

#[tauri::command]
pub fn has_live_window(app_handle: tauri::AppHandle) -> bool {
  app_handle.get_window("live").is_some()
}
