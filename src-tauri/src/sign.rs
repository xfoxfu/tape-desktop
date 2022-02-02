use md5::compute;

#[tauri::command]
pub fn md5(src: &str) -> String {
  format!("{:X}", compute(src))
}

#[tauri::command]
pub fn sign(mut args: Vec<(String, String)>) -> String {
  args.sort_unstable_by(|l, r| l.0.partial_cmp(&r.0).unwrap());
  let mut ret = String::new();
  for (k, v) in args.iter() {
    ret.push_str(&format!("{}={}", k, v));
    if ret.len() > 0 {
      ret.push_str("&");
    }
  }
  ret.push_str(obfstr::obfstr!("app_key=hPyKQn3yozr&&6$efket$lyAEQV65CSQ"));
  md5(&ret)
}

#[cfg(test)]
#[test]
fn test_md5() {
  assert_eq!(md5("Hello world!"), "86FB269D190D2C85F6E0468CECA42A20")
}

#[cfg(test)]
#[test]
fn test_sign() {
  assert_eq!(
    sign(
      vec![
        ("app_id", "5749260381"),
        ("publishDynamic", "0"),
        ("nonce", "fg2d4v"),
        ("timestamp", "1643716791000"),
        ("reAnswer", "1"),
        (
          "fontStyle",
          r##"{"fontColor":"#333333","fontSize":14,"fontName":"正常"}"##
        ),
        ("visible", "1"),
        ("txtContent", "测试消息"),
        ("visitCode", "a1981381b13d4fe7bfd7e6edfbecf1db"),
      ]
      .into_iter()
      .map(|(k, v)| (k.to_string(), v.to_string()))
      .collect()
    ),
    "13F73D045687D1B1DF4C20ADFC89A690"
  );
}
