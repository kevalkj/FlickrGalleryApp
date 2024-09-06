import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface filterNumericData {
  'Distance from rake point (km)': number[];
  'Distance from APMC point (km)': number[];
}
interface SliderProps {
  min: number;
  max: number;
  onChange: (
    option: keyof filterNumericData,
    data: number,
    variant: string,
  ) => void;
  option: string;
}
export default function Slider(props: SliderProps) {
  const width = Dimensions.get('window').width;
  const [min, setMin] = useState<string>(props.min.toString());
  const [max, setMax] = useState<string>(props.max.toString());
  const sliderOneValuesChange = (values: number[]) => {
    setMin(values[0].toString());
    setMax(values[1].toString());
    props.onChange(
      props.option as keyof filterNumericData,
      parseInt(min),
      'min',
    );
    props.onChange(
      props.option as keyof filterNumericData,
      parseInt(max),
      'max',
    );
  };
  return (
    <View>
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={[
            min === '' ? props.min : parseInt(min),
            max === '' ? props.max : parseInt(max),
          ]}
          sliderLength={width * 0.76}
          min={props.min}
          max={props.max}
          step={1}
          trackStyle={{
            backgroundColor: '#CEDAE5',
          }}
          selectedStyle={{
            backgroundColor: '#86A2BE',
          }}
          customMarker={() => (
            <View
              style={{
                backgroundColor: '#0C447D',
                width: '40%',
                aspectRatio: 1,
                borderRadius: 100,
              }}></View>
          )}
          onValuesChange={sliderOneValuesChange}
          allowOverlap
          snapped
        />
      </View>

      <View
        style={[
          styles.filterOptionContainer,
          {
            justifyContent: 'space-between',
          },
        ]}>
        <View
          style={{
            width: '35%',
          }}>
          <Text style={styles.filterOptionSilderText}>Minimum</Text>
          <TextInput
            style={styles.filterInput}
            cursorColor={'black'}
            keyboardType="numeric"
            value={min}
            placeholder={`${min}`}
            placeholderTextColor={'black'}
            onChangeText={value => {
              if (value === '') {
                setMin('');
                props.onChange(
                  props.option as keyof filterNumericData,
                  props.min,
                  'min',
                );
              }
              if (parseInt(value) > parseInt(max)) {
                return;
              }
              if (parseInt(value) > props.min && parseInt(value) <= props.max) {
                const temp = parseInt(value);
                setMin(temp.toString());
                props.onChange(
                  props.option as keyof filterNumericData,
                  temp,
                  'min',
                );
              }
            }}
          />
        </View>
        <View
          style={{
            width: '35%',
          }}>
          <Text style={styles.filterOptionSilderText}>Maximum</Text>
          <TextInput
            style={styles.filterInput}
            cursorColor={'black'}
            value={max}
            keyboardType="numeric"
            placeholder={`${max}`}
            placeholderTextColor={'black'}
            onChangeText={value => {
              if (value === '') {
                setMax('');
                props.onChange(
                  props.option as keyof filterNumericData,
                  props.max,
                  'max',
                );
              }
              if (parseInt(value) > props.min && parseInt(value) <= props.max) {
                const temp = parseInt(value);
                setMax(temp.toString());
                props.onChange(
                  props.option as keyof filterNumericData,
                  temp,
                  'max',
                );
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterInput: {
    width: '90%',
    aspectRatio: 2.5,
    borderWidth: 1,
    borderColor: '#939CA3',
    borderRadius: 8,
    color: 'black',
    fontFamily: 'NotoSerif-Regular',
    paddingLeft: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterOptionContainer: {
    flexDirection: 'row',
  },
  filterOptionSilderText: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: '2%',
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
