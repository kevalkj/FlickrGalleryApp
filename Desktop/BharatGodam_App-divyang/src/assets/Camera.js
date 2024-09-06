import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Camera(props) {
  return (
    <Svg
      width={14}
      height={13}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.059 0c.539 0 1.038.285 1.31.75l.551.937h1.4c1.212 0 2.196.984 2.196 2.197v6.42a2.196 2.196 0 01-2.197 2.196H2.196A2.196 2.196 0 010 10.304v-6.42C0 2.67.983 1.687 2.196 1.687h1.406l.591-.962A1.52 1.52 0 015.49 0h2.57zM6.758 3.715a3.041 3.041 0 100 6.082 3.041 3.041 0 000-6.082zm0 1.013a2.027 2.027 0 110 4.055 2.027 2.027 0 010-4.055z"
        fill="#0038FF"
      />
    </Svg>
  )
}

export default Camera
