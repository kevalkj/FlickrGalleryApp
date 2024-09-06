import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function User(props) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1646_10138)">
        <Path
          d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 37c-9.388 0-17-7.612-17-17S14.612 7 24 7s17 7.612 17 17-7.612 17-17 17zm0-16c-6.076 0-11 3.456-11 7s4.924 7 11 7 11-3.456 11-7-4.924-7-11-7zm0-1a6 6 0 100-12 6 6 0 000 12z"
          fill="#557CA4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1646_10138">
          <Path fill="#fff" d="M0 0H48V48H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default User