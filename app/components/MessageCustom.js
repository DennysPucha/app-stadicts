import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const CustomMessage = ({ message, description, type = 'success', duration = 3000, onDismiss }) => {
    const [slideAnim] = useState(new Animated.Value(-50));

    useEffect(() => {
        Animated.sequence([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -50,
                duration: 500,
                delay: duration,
                useNativeDriver: true,
            }),
        ]).start(() => onDismiss && onDismiss());
    }, [slideAnim, duration, onDismiss]);

    const backgroundColor = type === 'success' ? '#222' : '#D32F2F';

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }], backgroundColor }]}>
            <View style={styles.textContainer}>
                <Text style={styles.message}>{message}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
            <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
                <Text style={styles.closeText}>✖</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    textContainer: {
        flex: 1,
    },
    message: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        color: 'white',
        fontSize: 14,
        marginTop: 2,
    },
    closeButton: {
        padding: 5,
    },
    closeText: {
        color: 'white',
        fontSize: 18,
    },
});

export default CustomMessage;
