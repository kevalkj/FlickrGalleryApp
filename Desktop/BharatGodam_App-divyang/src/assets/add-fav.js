import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const HeartIcon = () => {
  return (
    <Svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx="14" cy="14" r="14" fill="black" fillOpacity="0.8" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 8.99995C12.2006 6.90293 9.19377 6.25486 6.93923 8.1751C4.68468 10.0953 4.36727 13.3059 6.13778 15.577C7.60984 17.4652 12.0648 21.4477 13.5249 22.7367C13.6882 22.8809 13.7699 22.953 13.8652 22.9813C13.9483 23.006 14.0393 23.006 14.1225 22.9813C14.2178 22.953 14.2994 22.8809 14.4628 22.7367C15.9229 21.4477 20.3778 17.4652 21.8499 15.577C23.6204 13.3059 23.3417 10.0751 21.0484 8.1751C18.7551 6.27506 15.7994 6.90293 14 8.99995Z"
        stroke="white"
        strokeWidth="1.152"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HeartIcon;
