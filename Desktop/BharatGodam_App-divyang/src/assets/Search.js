import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Search({props, color}) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.874 10.582a6 6 0 11.707-.707l5.273 5.271a.5.5 0 01-.707.708l-5.273-5.272zM11 6A5 5 0 111 6a5 5 0 0110 0z"
        fill={color}
      />
    </Svg>
  );
}

export default Search;
