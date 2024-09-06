import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Profile(props) {
  return (
    <>
    {props.filled ? <Svg
      width={props.fill ? "50%" : 17}
      height={props.fill ? "50%" : 24}
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.255 12.5a2.249 2.249 0 012.248 2.25v.918a2.75 2.75 0 01-.512 1.598c-1.546 2.164-4.07 3.235-7.49 3.235-3.422 0-5.945-1.072-7.487-3.236a2.75 2.75 0 01-.51-1.596v-.92A2.249 2.249 0 012.753 12.5h11.502zM8.5.505a5 5 0 110 10 5 5 0 010-10z"
        fill={props.color ? props.color : "#0C447D"}
      />
    </Svg> :
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18.255 14.5a2.249 2.249 0 012.248 2.25v.575c0 .894-.32 1.759-.9 2.438-1.57 1.833-3.957 2.738-7.103 2.738s-5.532-.905-7.098-2.74a3.75 3.75 0 01-.898-2.434v-.578A2.249 2.249 0 016.753 14.5h11.502zm0 1.5H6.752a.749.749 0 00-.75.75v.577c0 .535.192 1.053.54 1.46 1.253 1.469 3.22 2.214 5.957 2.214 2.739 0 4.706-.745 5.963-2.213a2.25 2.25 0 00.54-1.463v-.576a.749.749 0 00-.748-.749zM12.5 2.505a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
        fill={
          props.selected == undefined
            ? '#557CA4'
            : props.selected
            ? '#0C447D'
            : '#545554'
        }
      />
    </Svg>}
    
    </>
  );
}

export default Profile;
