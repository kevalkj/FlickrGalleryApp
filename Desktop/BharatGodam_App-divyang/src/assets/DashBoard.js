import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DashBoard(props) {
  return (
    <Svg
      width={21}
      height={23}
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.39 9.5H3.61a2.092 2.092 0 00-2.11 2.075v7.85A2.092 2.092 0 003.61 21.5h3.78a2.092 2.092 0 002.11-2.074v-7.85A2.091 2.091 0 007.39 9.5zM7.39 1.5H3.61A2.053 2.053 0 001.5 3.492v1.352a2.053 2.053 0 002.11 1.99h3.78a2.053 2.053 0 002.11-1.99V3.491a2.053 2.053 0 00-2.11-1.99zM14.275 13.5h3.78a2.092 2.092 0 002.11-2.074v-7.85A2.092 2.092 0 0018.056 1.5h-3.78a2.092 2.092 0 00-2.11 2.075v7.85a2.091 2.091 0 002.11 2.074zM14.275 21.5h3.78a2.053 2.053 0 002.11-1.99v-1.353a2.053 2.053 0 00-2.109-1.99h-3.78a2.053 2.053 0 00-2.11 1.99v1.35a2.053 2.053 0 002.11 1.993z"
        fill={
          props.selected == undefined
            ? '#557CA4'
            : props.selected
            ? '#0C447D'
            : '#545554'
        }
        stroke={
          props.selected == undefined
            ? '#557CA4'
            : props.selected
            ? '#0C447D'
            : '#545554'
        }
        strokeWidth={1.536}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DashBoard;
