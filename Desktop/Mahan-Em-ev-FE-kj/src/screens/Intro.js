import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import IntroLabel from "../components/IntroLabel";
import AppIntroSlider from "react-native-app-intro-slider";
import { useEffect, useRef, useState } from "react";

let slides = [
    {
      id: 1,
      title: 'Welcome to Your Ultimate Transportation Solution',
      description:'Your Ultimate Transportation Solution: Reliable, Convenient and Affordable Services at Your Fingertips',
      image: require('../assets/intro1.png'),
    },
    {
      id: 2,
      title: 'Book a Ride Anywhere, Anytime!',
      description:"Book a Ride Anywhere, Anytime! Enjoy quick, reliable and affordable transportation at your fingertips.",
      image: require('../assets/intro2.png'),
    },
    {
      id: 3,
      title: 'Make your ride comfortable and easy.',
      description:'Make your ride comfortable and easy with our seamless and convenient transportation services.',
      image: require('../assets/intro3.png'),
    },
    {
      id: 4,
      title: 'Fast and Affordable Delivery for Everything You Need',
      description:'Fast and Affordable Delivery for Everything You Need, Right at Your Fingertips!',
      image: require('../assets/intro4.png'),
    }
  ]

function Intro({navigation}){

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 3000);

      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if (sliderRef.current) {
          sliderRef.current.goToSlide(currentIndex);
      }
  }, [currentIndex]);


    function gotoLogin(){
        console.log("ksdkckdc")
        navigation.navigate('Login');
    };

  

    const renderSlide = ({ item }) => (
        <View style={styles.container}>
        <Image style={styles.img} source={item.image} resizeMode="cover"/>
        <IntroLabel 
                text1={item.title} 
                text2={item.description}
        />
        </View>
    );

    
    return(
        <>
        <AppIntroSlider
         renderItem={renderSlide}
         data={slides}
         ref={sliderRef}  
        activeDotStyle={{
            backgroundColor: "#000",
            width: 10,
            height:10,
            marginBottom:400,
            
          }}
          dotStyle={{
              marginBottom:400,
              width: 10,
              height:10,
              backgroundColor: "#fff",
          }}
        />
        <CustomButton title={'Get Started'} onPress={gotoLogin} />
        </>
    )
}

export default Intro;

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        justifyContent:'center'

    },
    img:{
        height:450,
        width:'100%',
    },
    btn:{
        justifyContent:"center",
        alignItems:"center",
        height:50,
        borderRadius:50,
        marginHorizontal:15,
        backgroundColor:"#F8C218"
    }

})