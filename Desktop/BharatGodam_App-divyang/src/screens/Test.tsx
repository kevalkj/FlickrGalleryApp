import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListComponent = () => {
    const [items, setItems] = useState([]);
    const [inputs, setInputs] = useState({
        Warehouse_name: '',
        Warehouse_ID: '',
        Locality_area_street: '',
        Pin_code: '',
        City: '',
        Mobile_number: '',
        Total_capacity: '',
        Filled_capacity: '',
    });

    useEffect(() => {
        const loadItems = async () => {
            try {
                const storedItems = await AsyncStorage.getItem('@items_list');
                if (storedItems !== null) {
                    setItems(JSON.parse(storedItems));
                }
            } catch (e) {
                console.error(e);
            }
        };

        loadItems();
    }, []);

    const saveItems = async (newItems) => {
        try {
            await AsyncStorage.setItem('@items_list', JSON.stringify(newItems));
            setItems(newItems);
        } catch (e) {
            console.error(e);
        }
    };

    const addItem = () => {
        const {
            Warehouse_name,
            Warehouse_ID,
            Locality_area_street,
            Pin_code,
            City,
            Mobile_number,
            Total_capacity,
            Filled_capacity,
        } = inputs;

        if (
            Warehouse_name.trim() !== '' &&
            Warehouse_ID.trim() !== '' &&
            Locality_area_street.trim() !== '' &&
            Pin_code.trim() !== '' &&
            City.trim() !== '' &&
            Mobile_number.trim() !== '' &&
            Total_capacity.trim() !== '' &&
            Filled_capacity.trim() !== ''
        ) {
            const newItem = {
                Warehouse_name,
                Warehouse_ID,
                Locality_area_street,
                Pin_code,
                City,
                Mobile_number,
                Total_capacity: parseInt(Total_capacity, 10),
                Filled_capacity: parseInt(Filled_capacity, 10),
            };
            const newItems = [...items, newItem];
            saveItems(newItems);
            setInputs({
                Warehouse_name: '',
                Warehouse_ID: '',
                Locality_area_street: '',
                Pin_code: '',
                City: '',
                Mobile_number: '',
                Total_capacity: '',
                Filled_capacity: '',
            });
        }
    };

    const handleInputChange = (key, value) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [key]: value,
        }));
    };

    const clearItems = async () => {
        try {
            await AsyncStorage.removeItem('@items_list');
            setItems([]);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            {Object.keys(inputs).map((key) => (
                <TextInput
                    key={key}
                    style={styles.input}
                    value={inputs[key]}
                    onChangeText={(value) => handleInputChange(key, value)}
                    placeholder={key.replace(/_/g, ' ')}
                    keyboardType={key.includes('capacity') || key === 'Pin_code' || key === 'Mobile_number' ? 'numeric' : 'default'}
                />
            ))}
            <Button title="Add Item" onPress={addItem} />
            <Button title="Clear Items" onPress={clearItems} />
            {items.length === 0 ? (
                <Text style={styles.emptyMessage}>No items available.</Text>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            {Object.keys(item).map((key) => (
                                <Text key={key}>
                                    {key.replace(/_/g, ' ')}: {item[key]}
                                </Text>
                            ))}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default ListComponent;
