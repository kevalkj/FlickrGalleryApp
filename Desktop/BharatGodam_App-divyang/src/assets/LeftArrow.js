import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LeftArrow(props) {
  return (
    <Svg
      width={8}
      height={15}
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 13.5l6-6-6-6"
        stroke="#545554"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LeftArrow
