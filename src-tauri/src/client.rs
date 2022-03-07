use md5::compute;
use rand::Rng;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

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

#[tauri::command]
pub fn random_peer_id() -> String {
  std::iter::repeat(())
    .map(|()| rand::thread_rng().sample(rand::distributions::Standard))
    .map(|r: u8| format!("{:02X}", r))
    .take(6)
    .collect()
}

#[tauri::command]
pub fn random_nonce() -> String {
  std::iter::repeat(())
    .map(|()| rand::thread_rng().sample(rand::distributions::Alphanumeric))
    .map(char::from)
    .take(6)
    .collect()
}

#[derive(Serialize, Deserialize)]
pub struct ApiResult {
  code: u16,
  message: String,
  content: Option<Value>,
}

fn normalize_req(
  req: ureq::Request,
  params: &mut HashMap<String, Value>,
  peer_id: &str,
  token: &Option<String>,
) -> anyhow::Result<ureq::Request> {
  use std::time::SystemTime;
  let timestamp = SystemTime::now()
    .duration_since(SystemTime::UNIX_EPOCH)?
    .as_secs()
    * 1000;

  let req = req
    .set("version", "1.7.1")
    .set("os", "1")
    .set("Accept", "*/*")
    .set("Accept-Language", "zh-Hans-CN;1")
    .set("Accept-Encoding", "gzip, deflate")
    .set("User-Agent", "Tape/1.7.1 (iPhone; iOS 15.2; Scale/3.00)")
    .set("time", &timestamp.to_string())
    .set("peerID", &peer_id);
  params.insert("app_id".into(), "5749260381".into());
  params.insert("nonce".into(), random_nonce().into());
  params.insert("timestamp".into(), timestamp.to_string().into());

  let param_sign = params
    .iter()
    .map(|(k, v)| {
      (
        k.clone(),
        v.as_str().map(|s| s.into()).unwrap_or(v.to_string()),
      )
    })
    .collect();
  let req = req.set("sign", &sign(param_sign));

  let req = if let Some(t) = token {
    req.set("Authorization", &format!("bearer {}", t))
  } else {
    req
  };

  Ok(req)
}

pub fn inner_request_get(
  url: String,
  mut params: HashMap<String, Value>,
  peer_id: String,
  token: Option<String>,
) -> Result<Value, anyhow::Error> {
  let mut req = normalize_req(ureq::get(&url), &mut params, &peer_id, &token)?;
  for (k, v) in params.iter() {
    req = req.query(k, &v.as_str().map(|s| s.into()).unwrap_or(v.to_string()));
  }
  let res: ApiResult = req.call()?.into_json()?;
  if res.code != 200 {
    Err(anyhow::anyhow!("{}: {}", res.code, res.message))?
  }
  Ok(res.content.unwrap_or(Value::Null))
}

#[tauri::command]
pub fn request_get(
  url: String,
  params: HashMap<String, Value>,
  peer_id: String,
  token: Option<String>,
) -> Result<Value, String> {
  inner_request_get(url, params, peer_id, token).map_err(|e| e.to_string())
}

pub fn inner_request_post(
  url: String,
  mut params: HashMap<String, Value>,
  peer_id: String,
  token: Option<String>,
) -> Result<Value, anyhow::Error> {
  let res: ApiResult = normalize_req(ureq::post(&url), &mut params, &peer_id, &token)?
    .send_json(params)?
    .into_json()?;
  if res.code != 200 {
    Err(anyhow::anyhow!("{}: {}", res.code, res.message))?
  }
  Ok(res.content.unwrap_or(Value::Null))
}

#[tauri::command]
pub fn request_post(
  url: String,
  params: HashMap<String, Value>,
  peer_id: String,
  token: Option<String>,
) -> Result<Value, String> {
  inner_request_post(url, params, peer_id, token).map_err(|e| e.to_string())
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

#[cfg(test)]
#[test]
pub fn test_peer_id() {
  assert!(random_peer_id().len() == 12);
}

#[cfg(test)]
#[test]
pub fn test_nonce() {
  assert!(random_nonce().len() == 6);
}
