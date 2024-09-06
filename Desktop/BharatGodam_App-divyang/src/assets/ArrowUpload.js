import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowUpload(props) {
    return (
        <Svg
            width={15}
            height={20}
            viewBox="0 0 15 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14.25 1.51a.75.75 0 100-1.5l-13-.004a.75.75 0 100 1.5l13 .004zM7.648 19.998l.102.007a.75.75 0 00.743-.649l.007-.101L8.499 5.57l3.722 3.72a.75.75 0 00.976.073l.085-.073a.75.75 0 00.072-.977l-.073-.084-4.997-4.996a.75.75 0 00-.976-.073l-.085.072L2.22 8.23a.75.75 0 00.976 1.134l.084-.073 3.719-3.713L7 19.255c0 .38.282.693.648.743z"
                fill="#fff"
            />
        </Svg>
    )
}

export default ArrowUpload
