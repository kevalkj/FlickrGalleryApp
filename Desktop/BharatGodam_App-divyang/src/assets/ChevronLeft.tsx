import React from "react";
import { ColorValue } from "react-native";
import Svg, { NumberProp, Path } from "react-native-svg";

type ChevronLeftProps = {
  stroke?: ColorValue;
  strokeWidth?: NumberProp;
  width?: NumberProp;
  height?: NumberProp;
};

const ChevronLeft: React.FC<ChevronLeftProps> = (props) => {
  const { stroke, strokeWidth, width, height } = props;

  return (
    <Svg
      width={width ? width : 24}
      height={height ? height : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 6L9 12L15 18"
        stroke={stroke ? stroke : "black"}
        strokeWidth={strokeWidth ? strokeWidth : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronLeft;
