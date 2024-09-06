import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IEmail(props) {
    return (
        <Svg
            width={27}
            height={26}
            viewBox="0 0 27 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M22.438 6.5H4.563v13h17.875v-13z"
                stroke="#0832FF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4.563 6.5l8.53 7.58 8.532-7.58"
                stroke="#0832FF"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path d="M22.438 6.5h-1.625v13h1.625v-13z" fill="#0832FF" />
        </Svg>
    )
}

export default IEmail
