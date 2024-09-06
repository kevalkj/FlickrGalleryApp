import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function AddManager(props) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_4270_7945)" fill="#557CA4">
        <Path d="M18.208 8.708h-1.583V7.125a.792.792 0 00-1.584 0v1.583h-1.583a.792.792 0 100 1.583h1.583v1.584a.792.792 0 001.584 0V10.29h1.583a.792.792 0 000-1.583zM7.125 9.5a4.75 4.75 0 100-9.5 4.75 4.75 0 000 9.5zm0-7.917a3.167 3.167 0 110 6.334 3.167 3.167 0 010-6.334zM7.125 11.083A7.133 7.133 0 000 18.208a.792.792 0 101.583 0 5.542 5.542 0 1111.084 0 .792.792 0 001.583 0 7.133 7.133 0 00-7.125-7.125z" />
      </G>
      <Defs>
        <ClipPath id="clip0_4270_7945">
          <Path fill="#fff" d="M0 0H19V19H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default AddManager
