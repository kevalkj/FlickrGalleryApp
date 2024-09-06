import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function Ticked(props) {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={12} cy={12.5} r={12} fill="#00A241" />
      <Path
        d="M5.453 12.539a.713.713 0 00-1.009 1.008l4.28 4.28a.713.713 0 001.008 0l10.46-10.461a.713.713 0 00-1.008-1.009l-9.956 9.957-3.775-3.775z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Ticked;
