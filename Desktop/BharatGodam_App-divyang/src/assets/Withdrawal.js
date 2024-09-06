import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Withdrawal(props) {
  return (
    <Svg
      width={24}
      height={22}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 8a1 1 0 00-1 1v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l2.999 3a1 1 0 001.414 0l2.999-2.993a1 1 0 10-1.414-1.414L13 14.59V9a1 1 0 00-1-1z"
        fill="#557CA4"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 0a3 3 0 013 3v4a3 3 0 01-3 3h-2v9a3 3 0 01-3 3H8a3 3 0 01-3-3v-9H3a3 3 0 01-3-3V3a3 3 0 013-3h18zm1 7a1 1 0 01-1 1h-2V6h1a1 1 0 100-2H4a1 1 0 000 2h1v2H3a1 1 0 01-1-1V3a1 1 0 011-1h18a1 1 0 011 1v4zM7 6v13a1 1 0 001 1h8a1 1 0 001-1V6H7z"
        fill="#557CA4"
      />
    </Svg>
  )
}

export default Withdrawal