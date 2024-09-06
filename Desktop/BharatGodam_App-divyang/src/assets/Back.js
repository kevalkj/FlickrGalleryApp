import * as React from "react"
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg"
const { width, height } = Dimensions.get('window');

function Back(props) {
    return (
        <Svg
            width={width * 0.06666666666}
            height={height * 0.03}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M3.293 11.293a1 1 0 000 1.414l6.364 6.364a1 1 0 001.414-1.414L5.414 12l5.657-5.657A1 1 0 009.657 4.93l-6.364 6.364zM20 13a1 1 0 100-2v2zM4 13h16v-2H4v2z"
                fill="#000"
            />
        </Svg>
    )
}

export default Back
