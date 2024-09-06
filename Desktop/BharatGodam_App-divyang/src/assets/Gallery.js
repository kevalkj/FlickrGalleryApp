import * as React from "react"
import Svg, {Path} from "react-native-svg"

function Gallery(props) {
  return (
    <Svg
      width={24}
      height={20}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 5c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm16-2.5V16H4V2.5A2.5 2.5 0 016.5 0h15A2.5 2.5 0 0124 2.5zm-19 0v12.32l8.03-8.03 3.3 3.3L23 3.42V2.5c0-.83-.67-1.5-1.5-1.5h-15C5.67 1 5 1.67 5 2.5zM23 15V4.83l-6.67 6.67-3.3-3.3-6.79 6.79H23V15zM1 6.5c0-.65.42-1.2 1-1.41V4.05A2.5 2.5 0 000 6.5V20h20v-1H1V6.5z"
        fill="#000"
      />
    </Svg>
  )
}

export default Gallery
