import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Plus({ props, color }) {
    return (
        <Svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M9.25 0a.75.75 0 01.743.648L10 .75 10 8h7.253a.75.75 0 01.102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 01-1.493.101l-.007-.102L8.5 9.5H1.252a.75.75 0 01-.102-1.493L1.252 8H8.5L8.5.75A.75.75 0 019.25 0z"
                fill={color}
            />
        </Svg>
    )
}

export default Plus
