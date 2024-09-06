import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TimeIMG(props) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10 5v5h3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#707371"
                strokeWidth={1.344}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default TimeIMG
