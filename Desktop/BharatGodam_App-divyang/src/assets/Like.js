import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Like(props) {
    return (
        <Svg
            width={20}
            height={18}
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                clipRule="evenodd"
                d="M10 3C8.2.903 5.194.255 2.94 2.175.684 4.095.366 7.305 2.137 9.577c1.472 1.888 5.927 5.87 7.387 7.16.163.144.245.216.34.244a.456.456 0 00.258 0c.095-.028.176-.1.34-.244 1.46-1.29 5.915-5.272 7.387-7.16 1.77-2.271 1.492-5.502-.802-7.402C14.755.275 11.8.903 10 3z"
                stroke="#1C1C1C"
                strokeWidth={1.152}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default Like
