import React from 'react';
import {StyleSheet, View, Image, useWindowDimensions, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';
import Pagination from './Pagination';
import MovingTruck from '../assets/MovingTruck';
import textStyles from './textStyles';

interface ImageData {
  key: string;
  id?: any; // Adjust the type according to your image data type
  color?: any; // Adjust the type according to your image data type
}

interface CustomImageCarousalProps {
  data: any[];
  autoPlay: boolean;
  pagination: boolean;
}

const CustomImageCarousal: React.FC<CustomImageCarousalProps> = ({
  data,
  autoPlay,
  pagination,
}) => {
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const interval = React.useRef<NodeJS.Timeout | null>(null);
  const [isAutoPlay, setIsAutoPlay] = React.useState(autoPlay);
  const [newData] = React.useState<ImageData[]>([
    {key: 'spacer-left'},
    ...data,
    {key: 'spacer-right'},
  ]);
  const {width} = useWindowDimensions();
  const SIZE = width * 0.6;
  const SPACER = (width - SIZE) / 8;
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  React.useEffect(() => {
    if (isAutoPlay === true) {
      let _offSet = x.value;
      interval.current = setInterval(() => {
        if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
          _offSet = 0;
        } else {
          _offSet = Math.floor(_offSet + SIZE);
        }
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({x: _offSet, y: 0, animated: true});
        }
      }, 2000);
    } else {
      if (interval.current) clearInterval(interval.current);
    }
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [SIZE, isAutoPlay, data.length, x]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE + 16}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {newData.map((item, index) => {
          const style = {
            transform: [
              {
                scale: interpolate(
                  x.value,
                  [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                  [1, 1, 1],
                ),
              },
            ],
          };
          if (!item.id) {
            return <View style={{width: SPACER}} key={index} />;
          }
          return (
            <View
              style={{
                width: SIZE,
                height: 133,
                marginRight: 16,
                marginBottom: 20,
              }}
              key={index}>
              <Animated.View
                style={[
                  styles.imageContainer,
                  style,
                  {backgroundColor: item.color},
                ]}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MovingTruck />
                </View>
                <Text style={[textStyles.headingH7, {color: '#151515'}]}>
                  Logistics tracking
                </Text>
                <Text style={[textStyles.bodyTable, {color: '#151515'}]}>
                  {' '}
                  Follow your shipment from anywhere.
                </Text>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      {pagination && <Pagination data={data} x={x} size={SIZE + 20} />}
    </View>
  );
};

export default CustomImageCarousal;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 16,
    height: '100%',
    borderWidth: 1,
    borderColor: '#C1C4C2',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
    // marginRight: 16,
    // backgroundColor: 'pink',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
});
