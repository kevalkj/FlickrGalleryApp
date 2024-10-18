import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function MyRideCard({image,name,date,time,status}){
    const [showLocation,setShowLocation] = useState(false);

    function openLocation(){
        setShowLocation(!showLocation);
    }
    return(
        <View style={styles.OutterConatiner}>
        <Pressable onPress={openLocation} style={styles.container}>
            <View style={styles.circle}>
                {image && <Image source={image} style={styles.image} resizeMode="cover"/>}
            </View>
            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.relation}>{date} - {time}</Text>
            </View>
            <View style={styles.statusbtn} onPress={''}>
                <Text style={[styles.status, status=='Complete'?{color:'#2BBD7E'}:{color:'#EA0000'}]}>{status}</Text>
            </View>
        </Pressable>
            { showLocation && 
            <View>
            <View style={styles.locationBox}>
                    <View style={styles.dots}>
                        <View style={styles.outterCircle}>
                            <View style={styles.innerCircle}/>
                        </View>
                        <View style={styles.dottedLine}></View>
                        <View style={[styles.outterCircle,{borderColor:'#0F6DDC'}]}>
                            <View style={[styles.innerCircle, {backgroundColor:'#0F6DDC'}]} />
                        </View>
                    </View>
                    <View style={styles.inputs}>
                        <View>
                            <Text style={styles.locationTxt}>Your Location</Text>
                            <Text style={styles.locationLable}>Unit No 1/1A, Ground Floor, NOB Building, Blue Ridge Approach Road, Township, Pune...............</Text> 
                            <Text style={styles.tripTime}>54 min trip</Text>
                        </View>
                        <View>
                            <Text style={styles.locationTxt}>Drop Location</Text>
                            <Text style={styles.locationLable}>Unit No 1/1A, Ground Floor, NOB Building, Blue Ridge Approach Road, Township, Pune...............</Text> 
                        </View>
                    </View>
                </View>
                <View style={styles.totalpay}>
                    <Text style={styles.totalpayTxt}>Total pay:</Text>
                    <Text style={styles.price}>₹ 110.50</Text>
                </View>
            </View>}
        </View>
    )
}
export default MyRideCard;


const styles = StyleSheet.create({
    OutterConatiner:{
        borderBottomWidth:0.5,
        paddingBottom:15,
        borderColor:'rgba(223,223,223,0.7)',
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
        
    },
    circle:{
        width:45,
        height:45,
        borderRadius:23,
        backgroundColor:'#808080',
        overflow:'hidden'
    },
    details:{
        marginHorizontal:10,
        width:'55%',
        justifyContent:'center',
    },
    image:{
        width:45,
        height:45,
    },
    name:{
        fontFamily:'Inter',
        fontWeight:'700',
        fontSize:14,
        color:'#121323',
        lineHeight:18.9
    },
    number:{
        fontFamily:'Inter',
        fontWeight:'400',
        fontSize:12,
        color:'#808080',
        lineHeight:16.2
    },
    relation:{
        fontFamily:'Inter',
        fontWeight:'400',
        fontSize:12,
        color:'#0F6DDC',
        lineHeight:16.2
    },
    statusbtn:{
        width:68,
        height:18,
        backgroundColor:'rgba(223, 223, 223, 0.5)',
        borderRadius:9
    },
    status:{
        fontFamily:'Inter',
        fontWeight:'600',
        fontSize:12,
        textAlign:'center'
    },
    locationBox:{
        width:'100%',
        flexDirection:'row',
        gap:20,
        marginVertical:15
    },
    locationLable:{
        fontSize:14,
        fontFamily:'Inter',
        fontWeight:'400',
        color:'#606060',
    },
    locationTxt:{
        fontSize:14,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#121323',
        padding:0
    },
    tripTime:{
        fontSize:12,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#0F6DDC',
    },
    dots:{
      // justifyContent:'center',
      marginTop:5
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
        height:75,
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
    totalpay:{
        flexDirection:'row',
        width:'100%'
    },
    price:{
        fontSize:15,
        fontWeight:'800',
        fontFamily:'Inter',
        color:'#121323',
        textAlign:'right',
        paddingHorizontal:4
    },
    totalpayTxt:{
        fontSize:12,
        fontWeight:'600',
        fontFamily:'Inter',
        color:'#979797'
    }
})