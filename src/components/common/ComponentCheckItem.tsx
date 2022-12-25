import { useState } from "react";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import CustomText from "./CustomText";
interface ComponentCheckItemProps {
  text: string;
  checked: boolean;
  clickEvnet?: Function;
  wrongCheckType?: boolean;
  correct_answer?: string;
}
export default function ComponentCheckItem(props: ComponentCheckItemProps) {
  const { text, checked, clickEvnet, wrongCheckType, correct_answer } = props;
  const [overStatus, setOverStatus] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        cursor: wrongCheckType ? "default" : "pointer",
        marginTop: 24,
        alignItems: "center",
        justifyContent: "flex-start",
        display: "flex",
        border: "1px solid #000000",
        borderRadius: 24,
        padding: "8px",
        transition: "all 0.4s",
        backgroundColor:
          text === correct_answer
            ? "#47C83E"
            : checked || overStatus
            ? wrongCheckType
              ? "#980000"
              : "#efefef"
            : "#ffffff",
      }}
      onMouseOver={() => {
        if (!wrongCheckType) {
          setOverStatus(true);
        }
      }}
      onMouseOut={() => {
        if (!wrongCheckType) {
          setOverStatus(false);
        }
      }}
      onClick={() => {
        if (!wrongCheckType && clickEvnet) {
          clickEvnet();
        }
      }}
    >
      {checked ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
      <CustomText type="P1" text={text} bold />
    </div>
  );
}
