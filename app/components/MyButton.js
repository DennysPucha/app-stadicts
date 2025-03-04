import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#425ed0', // Color de fondo
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 8, // Bordes redondeados
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginBottom: 7,
    },
    text: {
        color: '#FFFFFF', // Color del texto
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyButton;