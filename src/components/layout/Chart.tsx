import { styled } from "@mui/material";
import bb, { pie } from "billboard.js";
import { useEffect } from "react";
import {
  SwrQuizAnswerList,
  SwrQuizFinishData,
  SwrQuizList,
} from "src/swr/SwrQuizInfo";
import ComponentCheckItem from "../common/ComponentCheckItem";
import CustomText from "../common/CustomText";
import FreeArea from "../common/FreeArea";
export default function Chart() {
  const { swrQuizFinishDataValue } = SwrQuizFinishData();
  const { swrQuizListValue } = SwrQuizList();
  const { swrQuizAnswerListValue } = SwrQuizAnswerList();
  useEffect(() => {
    bb.generate({
      data: {
        columns: [
          ["정답", swrQuizFinishDataValue.successCount],
          ["오답", swrQuizFinishDataValue.failCount],
        ],
        type: pie(), // for ESM specify as: pie()
      },
      bindto: "#pieChart",
    });
  }, []);

  return (
    <ComponentArticle>
      <CustomText
        type="P1"
        text={"총 소요시간: " + swrQuizFinishDataValue.takenTime}
      />{" "}
      <div id="pieChart"></div>
      <FreeArea />
      <CustomText type="H4" text="오답노트" bold />
      <section
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 680,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {swrQuizListValue.map((dataList: any, index: number) => (
          <div key={index}>
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
              <CustomText type="H3" text={dataList.question} />
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
              <ComponentCheckItem
                text={dataList.correct_answer}
                checked={
                  swrQuizAnswerListValue[index] === dataList.correct_answer
                }
                correct_answer={dataList.correct_answer}
                wrongCheckType
              />
              {dataList.incorrect_answers.map(
                (dataListD: string, indexD: number) => (
                  <ComponentCheckItem
                    text={dataListD}
                    checked={swrQuizAnswerListValue[index] === dataListD}
                    correct_answer={dataList.correct_answer}
                    wrongCheckType
                    key={indexD}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </section>
      <FreeArea />
      &nbsp;
    </ComponentArticle>
  );
}

const ComponentArticle = styled("article")({
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "flex-start",
  display: "flex",
  flexDirection: "column",
  padding: 20,
});
