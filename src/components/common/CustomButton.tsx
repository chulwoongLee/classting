import { Button } from "@mui/material";
import { defaultHeight } from "src/script/code";
import CustomText from "./CustomText";
interface ButtonProps {
  text: any;
  onClick: Function;
  disabledStatus?: boolean;
  fullWidth?: boolean;
  customWidth?: number;
  type?: "black";
  bold?: boolean;
}

export default function CustomButton(props: ButtonProps) {
  const { text, disabledStatus, onClick, fullWidth, customWidth, type, bold } =
    props;
  const settingColor = fncGetColor();
  function fncGetColor() {
    let retVal = {
      backgroundColor: "#ffffff",
      borderColor: "#000000",
      color: "#000000",
    };
    if (type === "black") {
      retVal = {
        backgroundColor: "#000000",
        borderColor: "#ffffff",
        color: "#ffffff",
      };
    }
    return retVal;
  }
  return (
    <Button
      fullWidth={fullWidth}
      style={{
        width: fullWidth ? "100%" : customWidth ? customWidth : "auto",
        height: defaultHeight,
        border: `1px solid ${settingColor.borderColor}`,
        backgroundColor: settingColor.backgroundColor,
        opacity: disabledStatus ? 0.3 : 1,
      }}
      color="primary"
      onClick={() => {
        onClick();
      }}
      variant="contained"
      disabled={disabledStatus}
    >
      {typeof text === "string" ? (
        <CustomText
          type="P2"
          text={text}
          color={settingColor.color}
          pointApply
          bold={bold}
        />
      ) : (
        text
      )}
    </Button>
  );
}
