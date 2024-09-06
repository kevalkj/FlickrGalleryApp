import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import textStyles from './textStyles';

const Dropdown = ({ items, mappingFunction, }) => {
    const [isClicked, setIsClicked] = useState<boolean | undefined>(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    return (
        <View style={{ height: 'auto' }}>
            {isClicked ? <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollView}>
                {items.map((item, index) => (
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
            </ScrollView> : null}
            <TouchableOpacity style={{ width: '100%', borderRadius: 8, height: 55, justifyContent: 'center' }} onPress={() => { setIsClicked(!isClicked) }}>
                <View style={{ height: '100%', justifyContent: 'space-evenly', paddingHorizontal: 12 }}>
                    {selectedItem == null ? null : <Text style={textStyles.bodyB4}>State</Text>}
                    <Text style={selectedItem == null ? textStyles.bodyB3 : [textStyles.headingH8, { color: 'black' }]}>
                        {selectedItem == null ? 'State' : mappingFunction(selectedItem)}
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    ScrollView: {
        backgroundColor: 'white',
        width: '100%',
        zIndex: 2,
        position: 'absolute',
        top: -305,
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
