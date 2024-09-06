import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckMark(props) {
  return (
    <Svg
      width={17}
      height={13}
      viewBox="0 0 17 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.98 6.885A.745.745 0 00.924 7.939l4.471 4.47a.745.745 0 001.054 0L17.38 1.48A.745.745 0 0016.326.426L5.923 10.83 1.98 6.885z"
        fill={props.color ? props.color :"#0C447D"}
      />
    </Svg>
  )
}

export default CheckMark
