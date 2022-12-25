import { Step, Stepper, StepLabel, styled } from "@mui/material";
import { borderRadius } from "@mui/system";
import { useEffect, useState } from "react";
import {
  SwrQuizAnswerList,
  SwrQuizFinishData,
  SwrQuizIndex,
  SwrQuizList,
} from "src/swr/SwrQuizInfo";
import ComponentCheckItem from "../common/ComponentCheckItem";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import FreeArea from "../common/FreeArea";
import Timmer from "./Timmer";

export default function QuizPage() {
  return (
    <ComponentArticle>
      <Timmer />
      <FreeArea />
      {/*최상단 스텝UI */}
      <ComponentQuizStep />
      {/*페이지 중단  */}
      <ComponentShowQuiz />
      {/*페이지 하단 네비게이션 */}
      <ComponentPageControll />
    </ComponentArticle>
  );
}

function ComponentQuizStep() {
  const { swrQuizListValue } = SwrQuizList();
  const { swrQuizIndexValue } = SwrQuizIndex();
  const { swrQuizAnswerListValue } = SwrQuizAnswerList();
  return (
    <Stepper
      style={{ width: "100%" }}
      activeStep={swrQuizIndexValue}
      alternativeLabel
    >
      {swrQuizListValue.map((dataList: any, index: number) => (
        <Step key={index}>
          <StepLabel>
            {" "}
            {swrQuizIndexValue > index ? (
              swrQuizAnswerListValue[index] ===
              swrQuizListValue[index].correct_answer ? (
                <CustomText type="P2" text="정답" color="#47C83E" bold />
              ) : (
                <CustomText type="P2" text="오답" color="#980000" bold />
              )
            ) : (
              <CustomText type="P2" text={"문제" + (index + 1)} />
            )}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

function ComponentShowQuiz() {
  const { swrQuizIndexValue } = SwrQuizIndex();
  const { swrQuizListValue } = SwrQuizList();
  const { swrQuizAnswerListValue, setSwrQuizAnswerList } = SwrQuizAnswerList();
  const [quizList, setQuizList] = useState<Array<string>>([]);
  useEffect(() => {
    setQuizList(
      [
        ...swrQuizListValue[swrQuizIndexValue].incorrect_answers,
        swrQuizListValue[swrQuizIndexValue].correct_answer,
      ].sort(() => {
        return Math.random() - 0.5;
      })
    );
  }, [swrQuizIndexValue]);
  return (
    <section
      style={{
        flex: 1,
        width: "100%",
        maxWidth: 680,
        alignItems: "center",
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FreeArea />
      <div
        style={{
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        <div style={{ minWidth: 60 }}>
          <CustomText type="H3" text="문제:" bold />
        </div>
        &nbsp;
        <CustomText
          type="H3"
          text={swrQuizListValue[swrQuizIndexValue].question}
        />
      </div>
      <FreeArea />
      <div
        style={{
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomText type="H3" text="보기" bold />
        <FreeArea />
        {quizList.map((dataList: string, index: number) => (
          <ComponentCheckItem
            text={dataList}
            checked={swrQuizAnswerListValue[swrQuizIndexValue] === dataList}
            clickEvnet={() => {
              let fakeData = [...swrQuizAnswerListValue];
              fakeData[swrQuizIndexValue] = dataList;
              setSwrQuizAnswerList(fakeData);
            }}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
function ComponentPageControll() {
  const { swrQuizIndexValue, setSwrQuizIndex } = SwrQuizIndex();
  const { swrQuizListValue } = SwrQuizList();
  const { swrQuizAnswerListValue } = SwrQuizAnswerList();
  const { swrQuizFinishDataValue, setSwrQuizFinishData } = SwrQuizFinishData();
  function fncSettingFinishData() {
    let successCount = 0;
    let failCount = 0;
    for (let i = 0; i < swrQuizAnswerListValue.length; i++) {
      if (swrQuizListValue[i].correct_answer === swrQuizAnswerListValue[i]) {
        successCount = successCount + 1;
      } else {
        failCount = failCount + 1;
      }
    }
    setSwrQuizFinishData({
      ...swrQuizFinishDataValue,
      successCount: successCount,
      failCount: failCount,
    });
  }
  return (
    <section
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        gap: 12,
      }}
    >
      {/*
      swrQuizIndexValue > 0 && (
        <CustomButton
          text="이전"
          onClick={() => {
            setSwrQuizIndex(swrQuizIndexValue - 1);
          }}
          fullWidth
          bold
          disabledStatus
        />
      )
        */}
      {swrQuizIndexValue < 3 && (
        <CustomButton
          text="다음"
          onClick={() => {
            setSwrQuizIndex(swrQuizIndexValue + 1);
          }}
          fullWidth
          bold
          type="black"
          disabledStatus={!swrQuizAnswerListValue[swrQuizIndexValue]}
        />
      )}
      {
        //다이나믹한 문제갯수라면 상수값이 아닌 문제의 총개수로 지정
        swrQuizIndexValue === 3 && (
          <CustomButton
            text="제출"
            onClick={() => {
              fncSettingFinishData();
            }}
            fullWidth
            bold
            type="black"
            disabledStatus={!swrQuizAnswerListValue[swrQuizIndexValue]}
          />
        )
      }
    </section>
  );
}
const ComponentArticle = styled("article")({
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "flex-start",
  display: "flex",
  flexDirection: "column",
  padding: "20px 20px 0px",
});
