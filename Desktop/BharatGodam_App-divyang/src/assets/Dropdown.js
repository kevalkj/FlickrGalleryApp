import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Dropdown(props) {
  return (
    <Svg
      width={14}
      height={8}
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1 1l6 6 6-6"
        stroke={props.color ? props.color : '#1C1C1C'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Dropdown;
