import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BookWarehouse(props) {
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
        d="M7 6a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1V6zm1.5 1.5h7v-1h-7v1zM4 4.5A2.5 2.5 0 016.5 2H18a2.5 2.5 0 012.5 2.5v7.232a6.456 6.456 0 00-1.5-.558V4.5a1 1 0 00-1-1H6.5a1 1 0 00-1 1V18h5.519c.04.52.14 1.022.294 1.5H5.5a1 1 0 001 1h5.232A6.518 6.518 0 0012.81 22H6.5A2.5 2.5 0 014 19.5v-15zm19 13a5.5 5.5 0 10-11 0 5.5 5.5 0 0011 0zm-5 .5l.001 2.503a.5.5 0 11-1 0V18h-2.505a.5.5 0 010-1H17v-2.5a.5.5 0 111 0V17h2.497a.5.5 0 010 1H18z"
        fill="#557CA4"
      />
    </Svg>
  )
}

export default BookWarehouse