import * as React from "react"
import Svg, { G,Defs,ClipPath,Path} from "react-native-svg"

function Delete(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1217_13413)">
        <Path
          d="M15.853 10.854L12.707 14l3.146 3.146a.5.5 0 01-.708.707l-3.146-3.146-3.146 3.146a.498.498 0 01-.708 0 .5.5 0 010-.707L11.291 14l-3.146-3.146a.5.5 0 01.707-.707l3.146 3.146 3.146-3.146a.5.5 0 01.707.707h.002zM22.999 4.5a.5.5 0 01-.5.5h-1.5c0 .015 0 .03-.002.046l-1.37 14.867A4.48 4.48 0 0115.146 24H8.874a4.479 4.479 0 01-4.48-4.08L3.002 5.047 3 5H1.5a.5.5 0 010-1h5.028c.25-2.247 2.16-4 4.472-4h2a4.506 4.506 0 014.472 4H22.5a.5.5 0 01.499.5zM7.535 4h8.928a3.505 3.505 0 00-3.464-3h-2a3.505 3.505 0 00-3.464 3zm12.462 1H4.001l1.387 14.826A3.483 3.483 0 008.872 23h6.272a3.483 3.483 0 003.485-3.179L19.995 5h.002z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1217_13413">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Delete