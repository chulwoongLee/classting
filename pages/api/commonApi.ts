import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  axios({
    method: "get",
    url:
      process.env.NEXT_PUBLIC_API_URL + "?amount=4&category=17&difficulty=easy",
    timeout: 10000,
    data: {},
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      if (
        error.message === "Network Error" ||
        error.message.indexOf("timeout") > -1
      ) {
        res.status(200).json({
          response_code: 408,
          response_msg: "API장애 발생 하였습니다.",
        });
      } else {
        res.status(200).json({
          response_code: 999,
          response_msg: "API장애 발생 하였습니다.",
        });
      }
    });
}
