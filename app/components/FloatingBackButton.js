import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../loginScreen/loginScreen';

const FloatingBackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
            <Image source={require('../../public/back-icon.png')} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: height * 0.02,
        left: width * 0.01,
        padding: 10,
        borderRadius: 25,
        zIndex: 10,
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: '#bb86fc',
    },
});

export default FloatingBackButton;
