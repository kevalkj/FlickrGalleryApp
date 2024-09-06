import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Edit(props) {
  return (
    <Svg
      width={17}
      height={18}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.744 1.54a2.982 2.982 0 114.217 4.217l-.743.744-4.217-4.217.743-.743zm-1.627 1.628L1.785 11.5a2.588 2.588 0 00-.687 1.23l-.913 3.835a.625.625 0 00.753.753l3.834-.913c.466-.111.892-.35 1.23-.688l8.332-8.332-4.217-4.217z"
        fill="#0038FF"
      />
    </Svg>
  )
}

export default Edit
