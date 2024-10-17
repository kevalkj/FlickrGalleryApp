import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoadingScreen = ({navigation}) => {
  const [loaderIndex, setLoaderIndex] = useState(0);
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoaderIndex(prevIndex => (prevIndex + 1) % 4);
      console.log('jjjjjj');
    }, 500);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      console.log('gyfgfg');
      navigation.navigate('DriverIdentifierScreen');
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const loaderStyle = index => {
    const opacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });
    return {
      opacity: loaderIndex === index ? opacity : 0.5,
    };
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/basemap.png')}
        style={styles.map}
      />
      <TouchableOpacity
        style={styles.profileIconContainer}
        onPress={() => {
          console.log('ChooseLocation');
          navigation.openDrawer();
        }}>
        {/* <Ionicons name="person-circle" size={40} color="gray" /> */}
        <Image source={require('../assets/personIcon.png')} />
      </TouchableOpacity>
      <View style={styles.loadingContainer}>
        <Image
          source={require('../assets/OBJECT.png')}
          style={styles.autoRickshaw}
        />
        <Text style={styles.loadingText}>
          Please hold on while we find the best available option for you.
        </Text>
        <View style={styles.indicatorContainer}>
          <Animated.View style={[styles.indicator, loaderStyle(0)]} />
          <Animated.View style={[styles.indicator, loaderStyle(1)]} />
          <Animated.View style={[styles.indicator, loaderStyle(2)]} />
          <Animated.View style={[styles.indicator, loaderStyle(3)]} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  autoRickshaw: {
    width: 99,
    height: 68,
    margin: 30,
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    textAlign: 'center',
    color: '#979797',
    marginBottom: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  indicator: {
    width: 60,
    height: 7,
    color: 'yellow',
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
    borderColor: 'yellow',
    marginHorizontal: 5,
  },
  profileIconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    // backgroundColor:'gray',
    width: 40,
    height: 43,
    borderRadius: 100,
    borderWidth: 0,
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#F8C218',
    borderWidth: 1,
    paddingTop: 16,
    paddingRight: 131,
    paddingBottom: 16,
    paddingLeft: 131,
    borderRadius: 27.5,
  },
  text: {
    color: '#F8C218',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '800',
    fontFamily: 'Inter',
  },
});

export default LoadingScreen;
