import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={18}
            height={20}
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M8.975 0a7.49 7.49 0 017.496 7.25l.004.25v4.097l1.38 3.156a1.249 1.249 0 01-1.145 1.75l-4.735.002a3 3 0 01-5.994.177l-.006-.179H1.25a1.251 1.251 0 01-1.146-1.747l1.371-3.158V7.5C1.476 3.345 4.828 0 8.975 0zm1.5 16.503l-3 .002a1.5 1.5 0 002.994.145l.006-.147zM8.975 1.5c-3.32 0-6 2.674-6 6v4.41l-1.344 3.094h14.697l-1.353-3.093V7.513l-.003-.225A5.988 5.988 0 008.975 1.5z"
                fill="#212121"
            />
        </Svg>
    )
}

export default SvgComponent
