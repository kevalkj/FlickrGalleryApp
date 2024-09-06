import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/Header'
import textStyles from '../../components/textStyles'
import Location from '../../assets/Location'
import CustomButton from '../../components/CustomButton'
import Call from '../../assets/Call'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'
import { RootStackParamList } from '../../types/navigationTypes'
type SearchScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'RejectedBookingDetails'
>;

const RejectedBookingDetails: React.FC<SearchScreenProps> = ({navigation,route}) => {

    //const navigation = useNavigation<NavigationProp<Record<string, object>>>();
    const booking = route.params.booking
    console.log("booking : ",booking);
    
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComponent title={'Booking rejected'} />
            <View style={{ alignItems: 'center' }}>
                <View>
                    <Text style={[textStyles.headingH6_5, { color: 'black' }]}>{booking?.warehouse?.warehouse_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ padding: 5 }}><Location /></View>
                    <Text style={[textStyles.bodyB3, { color: 'black' }]}>{`${booking?.warehouse?.city}, ${booking?.warehouse?.State}`}</Text>

                </View>
                <View style={{ width: 328, backgroundColor: '#F7F7F7', marginVertical: 24, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 8, gap: 12 }}>
                    <Text style={[textStyles.bodyB3, { color: '#1C1C1C' }]}>We are sorry, your booking for the warehouse is rejected due to the following reasons</Text>
                    <View style={{ gap: 4 }}>
                        <Text style={[textStyles.bodyB3, { color: '#1C1C1C', }]}>  &bull;  Missing information</Text>
                        <Text style={[textStyles.bodyB3, { color: '#1C1C1C', }]}>  &bull;  Missing information</Text>
                        <Text style={[textStyles.bodyB3, { color: '#1C1C1C', }]}>  &bull;  Missing information</Text>
                    </View>
                </View>
                <Text style={[textStyles.bodyB3, { color: '#1C1C1C', width: 328 }]}>Please revise your application according to the feedback provided.</Text>
                <Text style={[textStyles.bodyB3, { color: '#1C1C1C', width: 328, marginTop: 24 }]}>You can search for available warehouses and try booking again.</Text>
                <View style={{ marginTop: 16, marginBottom: 24 }}>
                    <CustomButton text='Search warehouse' txtcolor='#FFFFFF' bgcolor='#0C447D' borderColor='#0C447D' role='iButton' onPress={() => navigation.navigate('SearchWarehouse')} />
                </View>
                <View style={{ gap: 8, flexDirection: 'row' }}>
                    <Text style={[textStyles.bodyB3, { color: '#1C1C1C', }]}>For further inquiries,</Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}><Call /><TouchableOpacity><Text style={[textStyles.buttonTextUnderline,]}>+915d4df66666</Text></TouchableOpacity></View>
                </View>
            </View>
        </View>
    )
}

export default RejectedBookingDetails

const styles = StyleSheet.create({})