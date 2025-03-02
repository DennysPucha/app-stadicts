import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExcerciseScreen = ({ route }) => {
    const { title } = route.params;
    const navigation = useNavigation();

    const exercises = [
        { id: '1', title: 'Press Militar'},
        { id: '2', title: 'Press Banca'},
        { id: '3', title: 'Sentadillas'},
        { id: '4', title: 'Peso Muerto'},
        { id: '5', title: 'Dominadas'},
        { id: '6', title: 'Fondos'},
    ];

    function handlePress(item) {
        navigation.navigate('Serie', { title: item.title });
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Ejercicios de:</Text>
                <Text style={{fontSize:15, color: 'white'}}>{title}</Text>
            </View>
            <View style={styles.container}>

                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TrainingCard
                            title={item.title}
                            iconPath={require('../../public/img1.png')}
                            onPress={() => handlePress(item)}
                        />
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: Dimensions.get('window').width * 0.1,
        backgroundColor: '#21253b',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#30343f',
        borderRadius: 20,
    },

    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
});

export default ExcerciseScreen;