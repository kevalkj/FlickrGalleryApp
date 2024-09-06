import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WishList(props) {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.82 1.58l-.821.822-.823-.824A5.375 5.375 0 101.574 9.18l7.896 7.895a.75.75 0 001.06 0l7.902-7.897a5.376 5.376 0 00-.002-7.599 5.38 5.38 0 00-7.61 0zm6.548 6.54L10 15.485 2.635 8.12a3.875 3.875 0 115.48-5.48l1.357 1.357a.75.75 0 001.074-.012L11.88 2.64a3.88 3.88 0 015.488 5.48z"
        fill="#557CA4"
      />
    </Svg>
  )
}

export default WishList