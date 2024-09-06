import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import EmailInput from './EmailInput'
import PhoneInput from './PhoneInput'
import CustomInput from './CustomInputText'
import Dropdown from './Dropdown'
import statesOfIndia from './State'
import textStyles from './textStyles'

const KycPersonalDetail = () => {

    const [isClicked, setIsClicked] = useState<boolean | undefined>(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);


    const mappingFunction = (item: { name: any; id: any }) => `${item.name}`;
    // const commodities = [
    //     { name: 'Commodity 1', id: 1 },
    //     { name: 'Commodity 2', id: 2 },
    //     // Add more commodity objects as needed
    // ];

    // const customMappingFunction = (item: { name: any; id: any }) => `${item.name} - ${item.id}`;


    return (
        <View>
            {/* <Text>KycPersonalDetail</Text> */}
            <View style={{ marginHorizontal: "5%", marginVertical: '2%', borderWidth: 1, borderRadius: 7 }}>
                <CustomInput PlaceHolder='First Name' />

                <View style={{ borderTopWidth: 1, width: "100%" }}></View>

                <CustomInput PlaceHolder='Last Name' />
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: '2%', }}>
                <EmailInput />
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: '2%', }}>
                <PhoneInput />
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: '2%', borderWidth: 1, borderRadius: 7 }}>
                <CustomInput PlaceHolder='Flat no / Building name' />
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: '2%', borderWidth: 1, borderRadius: 7 }}>
                <CustomInput PlaceHolder='Locality / Area / Street ' />
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: '2%', borderWidth: 1, borderRadius: 7 }}>
                <CustomInput PlaceHolder='Landmark (optional)' />
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: '2%', borderWidth: 1, borderRadius: 7, zIndex: -1 }}>
                <CustomInput PlaceHolder='Pin code' />
            </View>
            <View style={{ marginHorizontal: "5%", marginVertical: '2%', borderWidth: 1, borderRadius: 7 }}>
                <CustomInput PlaceHolder='City' />
            </View>
            {isClicked ? <View><ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollView}>
                {statesOfIndia.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{ width: '100%', borderRadius: 8, height: 50, justifyContent: 'center' }}
                        onPress={() => {
                            setSelectedItem(item);
                            setIsClicked(false);
                        }}>
                        <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>{mappingFunction(item)}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView></View> : null}
            <TouchableOpacity style={{ width: '100%', marginVertical: '2%', height: 55, justifyContent: 'center', borderWidth: 1, borderRadius: 7 }} onPress={() => { setIsClicked(!isClicked) }}>
                <View style={{ height: '100%', justifyContent: 'space-evenly', paddingHorizontal: 12, position: 'absolute' }}>
                    {selectedItem == null ? null : <Text style={textStyles.bodyB4}>State</Text>}
                    <Text style={selectedItem == null ? textStyles.bodyB3 : [textStyles.headingH8, { color: 'black' }]}>
                        {selectedItem == null ? 'State' : mappingFunction(selectedItem)}
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default KycPersonalDetail

const styles = StyleSheet.create({
    ScrollView: {
        backgroundColor: 'white',
        width: '100%',
        zIndex: 2,
        position: 'absolute',
        top: -300,
        // left: '5%',
        height: 300,
        borderWidth: 0.5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})