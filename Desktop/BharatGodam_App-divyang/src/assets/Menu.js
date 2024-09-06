import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Menu(props) {
    return (
        <Svg
            width={20}
            height={15}
            viewBox="0 0 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M0 .75A.75.75 0 01.75 0h15.5a.75.75 0 010 1.5H.75A.75.75 0 010 .75zm0 13A.75.75 0 01.75 13h10.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75zM.75 6.5a.75.75 0 000 1.5h18.5a.75.75 0 000-1.5H.75z"
                fill="#212121"
            />
        </Svg>
    )
}

export default Menu
