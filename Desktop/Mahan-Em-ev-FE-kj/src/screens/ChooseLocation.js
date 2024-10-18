import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import GeoLocation from "react-native-geolocation-service";
import LastTripHeading from "../components/LastTripHeading";
import LastTripCard from "../components/LastTripCard";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDropoffLocation,setPickupLocation,setStops } from "../redux/slices/ride";

function ChooseLocation({navigation}){
    const data=[1,2,3,9];
    const dispatch = useDispatch();
    const pickUpLocation = useSelector(state=>state.ride.pickupLocation);
    const dropoffLocation = useSelector(state=>state.ride.dropoffLocation);
    const stops = useSelector(state=>state.ride.stops);
    useEffect(()=>{
        if(!pickUpLocation){
                GeoLocation.getCurrentPosition(
                    (position)=>{
                        console.log("Got location",position);
                        dispatch(setPickupLocation({
                            label : "Your current location",
                            type : "Point",
                            coordinate : [position.coords.latitude,position.coords.longitude]
                        }));
                    },
                    (error)=>{
                        console.log(error);
                    },
                    {enableHighAccuracy:true,timeout:15000,maximumAge:10000}
                )
        }
    },[])
    return(
        <>
        <View style={styles.container}>
            <CustomHeader />
            <View style={styles.topContainer}>
                <View style={styles.locationBox}>
                    <View style={styles.dots}>
                        <View style={styles.outterCircle}>
                            <View style={styles.innerCircle}/>
                        </View>
                        <View style={styles.dottedLine}></View>
                        <View style={styles.outterCircle}>
                            <View style={styles.innerCircle} />
                        </View>
                    </View>
                    <View style={styles.inputs}>
                        <View>
                            <Text style={styles.locationLable}>Start Location</Text>
                            <TextInput 
                                value={pickUpLocation ? pickUpLocation.label : 'choose your location'}
                                style={styles.locationTxt}
                                onChangeText={(text)=>{setPickupLocation({label : text,
                                    type : "Point",
                                    coordinate : [73.321, 23.232]})}}
                            />
                        </View>
                        <View>
                            <Text style={styles.locationLable}>Your Destination</Text>
                            <TextInput 
                                value={dropoffLocation ? dropoffLocation.label : 'choose your destination'}
                                style={styles.locationTxt}
                                onChangeText={(text)=>{
                                    dispatch(setDropoffLocation({
                                        label : text,
                                        type : "Point",
                                        coordinate : [73.321, 23.232]
                                    }));
                                }}
                            />
                        </View>
                    </View>
                </View>
                <Pressable style={styles.scheduleBtn}>
                    <Image style={styles.calenderIcon} source={require('../assets/MapIcon.png')} resizeMode="contain"/>
                    <Text style={styles.placeholderTxt}>Select on map</Text>
                </Pressable>
            </View>
            <LastTripHeading />
            <FlatList 
                data={data}
                renderItem={(item)=><LastTripCard />}
            />
            
        </View>
        <CustomButton title={'Done'} onPress={()=>{
            console.log(pickUpLocation,dropoffLocation);
            if(pickUpLocation && dropoffLocation)
                navigation.navigate('ChooseVehicle',);
            else if(!pickUpLocation && !dropoffLocation){
                Alert.alert("Please select your pickup and dropoff location");
            }
            else if(!pickUpLocation){
                Alert.alert("Please select your pickup location");
            }
            else{
                Alert.alert("Please select your destination ");
            }
        }} />
        </>
    )
}
export default ChooseLocation;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffff',
        flex:1,
        paddingHorizontal:20,
    },
    header:{
        paddingVertical:20,
    },
    topContainer:{
        borderBottomWidth:0.5,
        borderColor:'#979797'
    },
    locationBox:{
        backgroundColor:'rgba(223, 223, 223, 0.5)',
        borderRadius:27.5,
        paddingHorizontal:20,
        paddingVertical:15,
        flexDirection:'row',
        gap:20
    },
    locationLable:{
        fontSize:12,
        fontFamily:'Inter',
        fontWeight:'400',
        color:'#808080',
    },
    locationTxt:{
        fontSize:14,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#121323',
        padding:0
    },
    dots:{
       justifyContent:'center'
    },
    outterCircle:{
        borderWidth:1,
        borderColor:'#BFBFBF',
        borderRadius:7,
        height:14,
        width:14,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    innerCircle:{
        borderWidth:1,
        borderColor:'#BFBFBF',
        borderRadius:7,
        height:8,
        width:8,
        backgroundColor:'#000'
    },
    dottedLine:{
        height:52,
        width:0,
        borderWidth:0.7,
        borderStyle:"dashed",
        marginLeft:6.5,
        borderColor:'#BFBFBF'
        
    },
    inputs:{
        gap:20
    },
    placeholderTxt:{
        fontSize:10,
        fontWeight:'500',
        fontFamily:'Inter',
        color:'#808080'
      },
      scheduleBtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(223, 223, 223, 0.5)',
        borderRadius:27,
        paddingHorizontal:10,
        paddingVertical:5,
        marginVertical:20,
        width:110,
      },
      calenderIcon:{
        height:17,
        width:15,
        marginRight:5
      },
})