import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function IPhone(props) {
    return (
        <Svg
            width={12}
            height={20}
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M2.344.25C1.224.25.313 1.162.313 2.281v15.437c0 1.12.911 2.032 2.03 2.032h7.313c1.12 0 2.031-.912 2.031-2.031V2.28c0-1.12-.911-2.031-2.03-2.031H2.343zm0 .813h7.312a1.22 1.22 0 011.219 1.218V3.5h-9.75V2.281a1.22 1.22 0 011.219-1.219zm2.031.812a.406.406 0 100 .812.406.406 0 000-.812zm1.625 0a.406.406 0 000 .813h1.625a.406.406 0 000-.813H6zM1.125 4.313h9.75v10.562h-9.75V4.312zm0 11.375h9.75v2.03a1.22 1.22 0 01-1.219 1.22H2.344a1.22 1.22 0 01-1.219-1.22v-2.03zM6 16.5a.812.812 0 100 1.625.812.812 0 000-1.625z"
                fill="url(#paint0_linear_1125_6214)"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_1125_6214"
                    x1={0.3125}
                    y1={10}
                    x2={9.99344}
                    y2={10}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#000092" />
                    <Stop offset={1} stopColor="#FF00F3" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default IPhone
