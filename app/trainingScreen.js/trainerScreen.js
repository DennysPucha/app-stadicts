import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TrainingScreen = ({ route }) => {
    const { date } = route.params;
    const navigation = useNavigation();


    const trainings = [
        { id: '1', title: 'Pecho', description: 'Dia básico de pecho'},
        { id: '2', title: 'Espalda', description: 'Dia básico de espalda'},
        { id: '3', title: 'Piernas', description: 'Dia básico de piernas'},
        { id: '4', title: 'Hombros', description: 'Dia básico de hombros'},
        { id: '5', title: 'Biceps', description: 'Dia básico de biceps'},
        { id: '6', title: 'Triceps', description: 'Dia básico de triceps'},
    ];

    function handlePress(item) {
        navigation.navigate('Exercise', { title: item.title });
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Entrenamientos del día</Text>
                <Text style={{fontSize:15, color: 'white'}}>{date}</Text>
            </View>
            <View style={styles.container}>

                <FlatList
                    data={trainings}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TrainingCard
                            title={item.title}
                            description={item.description}
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

export default TrainingScreen;