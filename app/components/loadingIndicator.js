import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingIndicator = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../public/animation.json')}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
                resizeMode='cover'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21253b',
    },
});

export default LoadingIndicator;