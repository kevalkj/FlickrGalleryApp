import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WeightBridge(props) {
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
        d="M19.813 2H4.188A2.187 2.187 0 002 4.188v15.624C2 21.021 2.979 22 4.188 22h15.625A2.188 2.188 0 0022 19.812V4.188C22 2.979 21.021 2 19.813 2zm.937 17.812c0 .261-.104.492-.274.663a.931.931 0 01-.663.275H4.188a.931.931 0 01-.663-.275.931.931 0 01-.275-.663V4.188c0-.261.104-.492.275-.664a.932.932 0 01.663-.274h15.625a.933.933 0 01.938.938v15.624z"
        fill="#557CA4"
      />
      <Path
        d="M7 6.652l1.03 3h4.55l.639-2.654.388.079.388.079-.418 2.496h2.391l1.031-3a9.655 9.655 0 00-5-1.386c-1.828 0-3.539.507-4.999 1.386z"
        fill="#557CA4"
      />
    </Svg>
  )
}

export default WeightBridge