import { CircularProgressBase, CircularProgressWithChild } from 'react-native-circular-progress-indicator';

// accepts any react element as child



import { View, Text } from 'react-native'
import React from 'react'

export default function Circles() {
    const props = {
        activeStrokeWidth: 25,
        inActiveStrokeWidth: 25,
        inActiveStrokeOpacity: 0.2
      };
  return (
    <View>
    <CircularProgressBase
    {...props}
    value={80}
    radius={125}
    activeStrokeColor={'#e84118'}
    inActiveStrokeColor={'#e84118'}
  >
    <CircularProgressBase
      {...props}
      value={87}
      radius={100}
      activeStrokeColor={'#badc58'}
      inActiveStrokeColor={'#badc58'}
    >
      <CircularProgressBase
        {...props}
        value={62}
        radius={75}
        activeStrokeColor={'#18dcff'}
        inActiveStrokeColor={'#18dcff'}
      />
    </CircularProgressBase>
  </CircularProgressBase>
  </View>
  )
}