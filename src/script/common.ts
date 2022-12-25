import axios from "axios";

interface apiReturnProps {
  response_code: number;
  results?: Array<{
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: Array<string>;
    question: string;
    type: string;
  }>;
  response_msg?: string;
}
export async function apiConnection() {
  window.customLoadingOpen();
  let retValue: apiReturnProps = { response_code: 0 };
  await axios({
    url: "/api/commonApi",
    method: "post",
    timeout: 10000,
  })
    .then((success) => {
      retValue = success.data;
    })
    .catch((error) => {
      console.log("실패");
      console.log(error);
      retValue = error.response.data;
    })
    .finally(() => {
      window.customLoadingClose();
    });
  return retValue;
}
