import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Home(props) {
  return (
    <Svg
      width={19}
      height={20}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.95 1.033a2.25 2.25 0 00-2.9 0L1.3 6.728a2.25 2.25 0 00-.8 1.72v9.305c0 .966.784 1.75 1.75 1.75h3A1.75 1.75 0 007 17.753V13.75c0-.68.542-1.232 1.217-1.25h2.566A1.25 1.25 0 0112 13.75v4.003c0 .966.784 1.75 1.75 1.75h3a1.75 1.75 0 001.75-1.75V8.447a2.25 2.25 0 00-.8-1.72l-6.75-5.694z"
        fill={
          props.selected == undefined
            ? '#557CA4'
            : props.selected
            ? '#0C447D'
            : '#545554'
        }
      />
    </Svg>
  );
}

export default Home;
