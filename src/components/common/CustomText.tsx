interface CustomTextProps {
  text: string;
  type: "H1" | "H2" | "H3" | "H4" | "P1" | "P2" | "P3" | "P4";
  bold?: boolean;
  color?: string;
  pointApply?: boolean;
}
export default function CustomText(props: CustomTextProps) {
  const { text, type, bold, color, pointApply } = props;
  function fncGetTypeValue() {
    switch (type) {
      case "H1":
        return 32;
      case "H2":
        return 28;
      case "H3":
        return 24;
      case "H4":
        return 20;
      case "P1":
        return 18;
      case "P2":
        return 16;
      case "P3":
        return 14;
      case "P4":
        return 12;
    }
  }
  return (
    <div
      style={{
        fontSize: fncGetTypeValue(),
        fontWeight: bold ? "bold" : 400,
        color: color ? color : "#000000",
        overflow: pointApply ? "hidden" : "visible",
        textOverflow: pointApply ? "ellipsis" : "unset",
        whiteSpace: pointApply ? "nowrap" : "unset",
      }}
    >
      {text}
    </div>
  );
}
