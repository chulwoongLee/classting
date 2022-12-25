import useSWR from "swr";

export function SwrQuizList() {
  const { data = [], mutate } = useSWR("/SwrQuizList");

  return {
    swrQuizListValue: data,
    setSwrQuizList: mutate,
  };
}

export function SwrQuizIndex() {
  const { data = 0, mutate } = useSWR("/SwrQuizIndex");

  return {
    swrQuizIndexValue: data,
    setSwrQuizIndex: mutate,
  };
}

export function SwrQuizAnswerList() {
  const { data = new Array(4).fill(""), mutate } = useSWR("/SwrQuizAnswerList");

  return {
    swrQuizAnswerListValue: data,
    setSwrQuizAnswerList: mutate,
  };
}

export function SwrQuizFinishData() {
  const {
    data = {
      successCount: 0,
      failCount: 0,
      takenTime: "",
    },
    mutate,
  } = useSWR("/SwrQuizFinishData");

  return {
    swrQuizFinishDataValue: data,
    setSwrQuizFinishData: mutate,
  };
}
