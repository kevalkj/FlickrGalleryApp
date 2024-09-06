import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Add(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.75 3a.75.75 0 01.743.648l.007.102.001 7.25h7.254a.75.75 0 01.101 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 01-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 01-.101-1.493L3.752 11h7.25L11 3.75a.75.75 0 01.75-.75z"
        fill="#0C447D"
      />
    </Svg>
  )
}

export default Add