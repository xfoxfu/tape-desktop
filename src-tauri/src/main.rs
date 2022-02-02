#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use crate::menu::AddDefaultSubmenus;
use tauri::{Manager, Menu};

mod live;
mod menu;
mod sign;

fn main() {
  let ctx = tauri::generate_context!();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      live::open_live_window,
      live::close_live_window,
      live::has_live_window,
      sign::md5,
      sign::sign,
    ])
    .menu(
      Menu::new()
        .add_default_app_submenu_if_macos(&ctx.package_info().name)
        .add_default_file_submenu()
        .add_default_edit_submenu()
        .add_default_view_submenu()
        .add_default_window_submenu(),
    )
    .setup(|app| {
      let handle = app.handle().clone();
      handle
        .get_window("main")
        .unwrap()
        .on_window_event(move |f| {
          if let tauri::WindowEvent::Destroyed = f {
            if let Some(w) = handle.get_window("live") {
              w.close().unwrap();
            }
          }
        });
      Ok(())
    })
    .build(ctx)
    .expect("error while running tauri application")
    .run(|_, _| {
      // FIXME: when tauri supports "activate" event, make quit on macOS
      // more natively by open default windows on Dock icon click and do
      // not quit application when all windows closed.
      // see: https://github.com/tauri-apps/tao/issues/218
      // if let tauri::Event::ExitRequested { api, .. } = e {
      //   api.prevent_exit();
      // }
    });
}
