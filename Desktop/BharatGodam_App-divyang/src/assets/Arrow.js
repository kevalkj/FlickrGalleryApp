import * as React from "react"
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg"
const { width, height } = Dimensions.get('window');

function Arrow(props) {
    return (
        <Svg
            width={20}
            height={16}
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M1 7a1 1 0 000 2V7zm18.707 1.707a1 1 0 000-1.414L13.343.929a1 1 0 10-1.414 1.414L17.586 8l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM1 9h18V7H1v2z"
                fill="#565656"
            />
        </Svg>
    )
}

export default Arrow
