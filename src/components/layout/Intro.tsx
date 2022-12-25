import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import { styled } from "@mui/material";
import { apiConnection } from "src/script/common";
import { SwrQuizList } from "src/swr/SwrQuizInfo";

export default function Intro() {
  return (
    <ComponentArticle>
      <ComponentIntroContent />
      <ComponentActionArea />
    </ComponentArticle>
  );
}

function ComponentIntroContent() {
  const descriptionList = [
    "하단의 버튼을 클릭하여 퀴즈 풀기를 시작 할 수 있습니다.",
    "각 문제에 대한 답변은 n개의 보기 중 선택 가능합니다.",
    "모든 문항을 다 풀어야 정답 및 오답에 대한 비율을 알 수 있습니다.",
  ];

  return (
    <ComponentContentSection>
      <section
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          gap: 24,
        }}
      >
        <div>
          <img
            src="https://www.classting.com/images/classting_favicon_192px.png"
            alt="클래스팅_로고"
          />
        </div>
        <div
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <CustomText type="H2" text="클래스팅 과제" bold />
          {descriptionList.map((dataList, index) => (
            <CustomText type="P1" text={"○ " + dataList} key={index} />
          ))}
        </div>
      </section>
    </ComponentContentSection>
  );
}

function ComponentActionArea() {
  const { setSwrQuizList } = SwrQuizList();

  //문제가져오기 api
  async function fncGetQuiz() {
    const retVal: apiReturnProps = await apiConnection();
    if (retVal.response_code === 0) {
      setSwrQuizList(retVal.results);
    } else {
      alert(retVal.response_msg);
    }
  }
  return (
    <section
      style={{
        marginTop: 32,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div style={{ flex: 1 }} />
      <div
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <CustomButton
          text="퀴즈 풀기"
          onClick={() => {
            fncGetQuiz();
          }}
          bold
        />
      </div>
    </section>
  );
}

const ComponentArticle = styled("article")({
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FCD798",
});
const ComponentContentSection = styled("section")({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffffff",
});

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
