import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Tick(props) {
    return (
        <Svg
            width={18}
            height={13}
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M1.53 6.97A.75.75 0 00.47 8.03l4.5 4.5a.75.75 0 001.06 0l11-11A.75.75 0 0015.97.47L5.5 10.94 1.53 6.97z"
                fill="#212121"
            />
        </Svg>
    )
}

export default Tick
