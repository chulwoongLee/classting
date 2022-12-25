import { styled } from "@mui/material";
import Intro from "./Intro";
import { SwrQuizFinishData, SwrQuizList } from "src/swr/SwrQuizInfo";
import QuizPage from "./QuizPage";
import Chart from "./Chart";

export default function Main() {
  const { swrQuizListValue } = SwrQuizList();
  const { swrQuizFinishDataValue } = SwrQuizFinishData();
  return (
    <ComponentArticle>
      {swrQuizFinishDataValue.takenTime ? (
        <Chart />
      ) : swrQuizListValue.length > 0 ? (
        <QuizPage />
      ) : (
        <Intro />
      )}
    </ComponentArticle>
  );
}

const ComponentArticle = styled("article")({
  width: "100%",
  height: "100vh",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  display: "flex",
  flexDirection: "column",
});
