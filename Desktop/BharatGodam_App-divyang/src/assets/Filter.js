import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Filter(props) {
    return (
        <Svg
            width={23}
            height={23}
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M4 6.5h16M4 11.5h16M4 16.5h16"
                stroke="#545554"
                strokeLinecap="round"
            />
            <Circle cx={7.5} cy={6.5} r={1.5} fill="#545554" />
            <Circle cx={15.5} cy={11.5} r={1.5} fill="#545554" />
            <Circle cx={7.5} cy={16.5} r={1.5} fill="#545554" />
        </Svg>
    )
}

export default Filter
