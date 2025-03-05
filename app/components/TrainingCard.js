import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TrainingCard = ({ title, description, iconPath, isCopy, number, onPress, onLongPress, rightIcon }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.card}
        >
            {iconPath && (
                <View style={styles.iconContainer}>
                    <Image source={iconPath} style={styles.icon} />
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
            {number && (
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>{number}</Text>
                    <Text style={styles.numberLabel}>repeticiones</Text>
                </View>
            )}
            {isCopy && (
                <View style={styles.copyLabelContainer}>
                    <Text style={styles.copyLabel}>Meta Pasada</Text>
                </View>
            )}
            {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#424242',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        marginRight: 16,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#bb86fc',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#bdbdbd',
    },
    numberContainer: {
        alignItems: 'center',
        marginLeft: 16,
    },
    number: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#bb86fc',
    },
    numberLabel: {
        fontSize: 12,
        color: '#bdbdbd',
        marginTop: 4,
    },
    copyLabelContainer: {
        backgroundColor: '#3700b3',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 16,
    },
    copyLabel: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    rightIconContainer: {
        marginLeft: 16,
    },
});

export default TrainingCard;