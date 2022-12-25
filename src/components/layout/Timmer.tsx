import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { SwrQuizFinishData } from "src/swr/SwrQuizInfo";
import CustomText from "../common/CustomText";

export default function Timmer() {
  const { swrQuizFinishDataValue, setSwrQuizFinishData } = SwrQuizFinishData();
  const [startTime, setStartTime] = useState(new Date());
  const [checkTime, setCheckTime] = useState("");
  //let settingInterval = null;
  useEffect(() => {
    let settingInterval = setInterval(() => {
      setCheckTime(printTimeDifference(startTime, new Date()));
    }, 1000);
    return () => {
      clearInterval(settingInterval);
    };
  }, []);

  useEffect(() => {
    if (
      swrQuizFinishDataValue.successCount + swrQuizFinishDataValue.failCount >
      0
    ) {
      setSwrQuizFinishData({ ...swrQuizFinishDataValue, takenTime: checkTime });
    }
  }, [swrQuizFinishDataValue]);

  function printTimeDifference(startDate: Date, endDate: Date) {
    // 기간을 초단위로 계산
    let timeDifference = endDate.getTime() - startDate.getTime();
    // 기간을 시간, 분, 초로 변환
    let hours = Math.floor(timeDifference / (1000 * 60 * 60));
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    // 출력
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  }

  return (
    <ComponentArticle>
      <CustomText type="P1" text={"소요시간: " + checkTime} />{" "}
    </ComponentArticle>
  );
}

const ComponentArticle = styled("article")({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
});
