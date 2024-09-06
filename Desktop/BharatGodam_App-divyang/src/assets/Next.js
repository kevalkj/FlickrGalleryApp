import * as React from "react"
import Svg, { Path } from "react-native-svg"


function Next(props) {
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
        d="M1 1.723l6 6-6 6"
        stroke= {props.color ? props.color :"#fff"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Next