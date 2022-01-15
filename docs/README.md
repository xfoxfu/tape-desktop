# Tape API Guide

In addition to the normal HTTP headers, Tape adds a few headers.

| Header  | Value         | Explanation                               |
| ------- | ------------- | ----------------------------------------- |
| version | 1.7.1         | Tape app version                          |
| time    | 1642232791000 | timestamp in ms, rounded to seconds       |
| os      | 1             | iOS=1                                     |
| peerID  | XXXXXXXXXXXX  | 12 byte hex string, may be tied to device |
| sign    |               | MD5 signature, see below                  |

Tape employs a MD5-based approach to sign the request params or body, which is put in the `sign` request header.

For `GET` requests, the request parameters are sorted by the parameter name, and then concated in the format of
`param=value` with `&`. Finally, it is appended with a `app_key=hPyKQn3yozr&&6$efket$lyAEQV65CSQ`, and then passed
through MD5.

For `POST` requests, the request body as a dictionary are sorted by the parameter name, and then concated in the format of
`param=value` with `&`. Finally, it is appended with a `app_key=hPyKQn3yozr&&6$efket$lyAEQV65CSQ`, and then passed
through MD5.

All requests share the following parameters:

| Parameter | Value         | Explanation                         |
| --------- | ------------- | ----------------------------------- |
| app_id    | 5749260381    |                                     |
| nonce     | y2jKab        | 6 byte random string of alnum chars |
| timestamp | 1642232791000 | timestamp in ms, rounded to seconds |
