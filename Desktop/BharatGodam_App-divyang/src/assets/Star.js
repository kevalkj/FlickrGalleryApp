import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Star(props) {
    return (
        <Svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M11.981 4.552a.376.376 0 00-.299-.251l-3.689-.564L6.34.216a.375.375 0 00-.68 0l-1.652 3.52-3.69.565a.376.376 0 00-.211.632l2.68 2.749-.633 3.882a.374.374 0 00.551.39L6 10.13l3.295 1.822a.378.378 0 00.398-.022.374.374 0 00.154-.367l-.634-3.882 2.68-2.749a.375.375 0 00.088-.38z"
                fill="#FFDC25"
            />
        </Svg>
    )
}

export default Star
