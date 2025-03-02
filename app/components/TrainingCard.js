import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TrainingCard = ({ title, description, iconPath, number, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            {iconPath && (
                <View style={styles.iconContainer}>
                    <Image source={iconPath} style={styles.icon} />
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
            {number && <Text style={styles.number}>{number}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#424242',
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    iconContainer: {
        marginRight: 16,
    },
    icon: {
        width: 24,
        height: 24,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    description: {
        fontSize: 14,
        color: '#bdbdbd',
    },
    number: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#bb86fc',
    },
});

export default TrainingCard;