#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use crate::menu::AddDefaultSubmenus;
use tauri::Menu;

mod live;
mod menu;

fn main() {
  let ctx = tauri::generate_context!();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      live::open_live_window,
      live::close_live_window,
      live::has_live_window
    ])
    .menu(
      Menu::new()
        .add_default_app_submenu_if_macos(&ctx.package_info().name)
        .add_default_file_submenu()
        .add_default_edit_submenu()
        .add_default_view_submenu()
        .add_default_window_submenu(),
    )
    .run(ctx)
    .expect("error while running tauri application");
}
