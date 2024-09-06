import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { NumberProp, Path } from "react-native-svg";

type ChevronRightProps = {
    stroke?: ColorValue;
    strokeWidth?: NumberProp;
    width?: NumberProp;
    height?: NumberProp;
}

const ChevronRight:React.FC<ChevronRightProps> = (props) => {
    const {
        stroke,
        strokeWidth,
        width,
        height,
    } = props;
    return (
        <Svg
            width={ width ? width : 24}
            height={ height ? height : 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
            d="M9 18L15 12L9 6"
            stroke={ stroke ? stroke : "black"}
            strokeWidth={ strokeWidth ? strokeWidth : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </Svg>
    )
};
export default ChevronRight;
