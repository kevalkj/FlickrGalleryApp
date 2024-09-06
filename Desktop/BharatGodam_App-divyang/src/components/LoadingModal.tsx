import React from 'react';
import { Modal, View, ActivityIndicator, Dimensions } from 'react-native';

const CustomModal = ({ isVisible, setIsVisible }) => {
    const { width, height } = Dimensions.get('window');

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator style={{ position: 'absolute' }} color='white' size={'large'} />
            </View>
        </Modal>
    );
}

export default CustomModal;
