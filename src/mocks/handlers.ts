import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const handlers = [
  rest.post("http://apiv4.tapechat.net/unuser/sms", (req, res, ctx) => {
    // {
    //   phone: faker.phone.phoneNumber('1##########'),
    //   timestamp: Math.round(faker.time.recent('unix')) / 1000 * 1000,
    //   area: "86",
    //   nonce: faker.random.alphaNumeric(6).toUpperCase(),
    //   app_id: "5749260381",
    // }

    return res(
      ctx.json({
        code: 200,
        message: "成功",
      })
    );
  }),

  rest.post("http://apiv4.tapechat.net/auth/phoneLogin", (req, res, ctx) => {
    // {
    //   "code": faker.datatype.number(10000).toString(),
    //   "phone": faker.phone.phoneNumber('1##########'),
    //   "timestamp": Math.round(faker.time.recent('unix')) / 1000 * 1000,
    //   "area": "86",
    //   "nonce": faker.random.alphaNumeric(6).toUpperCase(),
    //   "app_id": "5749260381"
    // }

    return res(
      ctx.json({
        code: 200,
        message: "成功",
        content: {
          jwtInfo: {
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            userId: faker.datatype.hexaDecimal(32).toLowerCase().slice(2),
            tokenType: "bearer",
            expiresIn: 4764284481,
          },
        },
      })
    );
  }),

  rest.post(
    "http://apiv4.tapechat.net/question/questionList",
    (req, res, ctx) => {
      // {
      //   "app_id": "5749260381",
      //   "source": "answer", (unAnswer)
      //   "pageSize": 15,
      //   "lastTimeStamp": Math.round(faker.time.recent('unix')) / 1000,
      //   "timestamp": Math.round(faker.time.recent('unix')) / 1000,
      //   "page": 1,
      //   "nonce": faker.random.alphaNumeric(6).toUpperCase(),
      // }

      return res(
        ctx.json({
          code: 200,
          message: "成功",
          content: {
            currentPage: 1,
            data: new Array(15).map((i) => ({
              title: faker.lorem.sentence(),
              visible: 1,
              permission: 1,
              type: 1,
              source: "来自微信",
              beAppend: 0,
              canUserQuestion: 1,
              visitCode: faker.datatype.hexaDecimal(32).toLowerCase().slice(2),
              boxCode: faker.random.alphaNumeric(8).toUpperCase(),
              verifyCode: faker.datatype.hexaDecimal(13).toLowerCase().slice(2),
              answerAt: faker.time.recent("unix"),
              isTop: 0,
              createdAt: faker.date.recent(),
              batchId: 0,
              videoId: "",
              answer: faker.datatype.boolean()
                ? {
                    txtContent: faker.lorem.sentence(),
                    fontStyle:
                      '{"fontName":"\u6b63\u5e38","fontColor":"#000000","fontSize":14}',
                    mp3Content: null,
                    mp3Length: null,
                    source: "",
                    permission: 1,
                    videoId: "0",
                    createdTime: faker.time.recent("unix"),
                    imgList: [],
                  }
                : undefined,
              createdTime: faker.time.recent("unix"),
            })),
            firstPageUrl:
              "http://apiv4.tapechat.net/question/questionList?page=1",
            from: 1,
            lastPage: 10,
            lastPageUrl:
              "http://apiv4.tapechat.net/question/questionList?page=10",
            nextPageUrl:
              "http://apiv4.tapechat.net/question/questionList?page=2",
            path: "http://apiv4.tapechat.net/question/questionList",
            perPage: 15,
            prevPageUrl: null,
            to: 15,
            total: 142,
          },
        })
      );
    }
  ),
];
