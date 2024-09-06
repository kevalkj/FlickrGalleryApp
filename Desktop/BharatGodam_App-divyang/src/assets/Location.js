import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Location(props) {
    return (
        <Svg
            width={15}
            height={17}
            viewBox="0 0 15 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M12.63 12.63l-1.008.998c-.743.73-1.708 1.668-2.894 2.815a1.912 1.912 0 01-2.658 0l-2.967-2.886c-.372-.366-.685-.675-.936-.926a7.399 7.399 0 1110.464 0zM9.524 7.633a2.125 2.125 0 10-4.249 0 2.125 2.125 0 004.25 0z"
                fill="#0038FF"
            />
        </Svg>
    )
}

export default Location
