import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import { Dimensions } from 'react-native';

const SerieScreen = ({ route }) => {
    const { title } = route.params;

    const series = [
        { id: '1', repeticiones: '5', peso: '20', unidad_peso: 'kg' },
        { id: '2', repeticiones: '4', peso: '20', unidad_peso: 'kg' },
        { id: '3', repeticiones: '2', peso: '20', unidad_peso: 'kg' },
        { id: '4', repeticiones: '3', peso: '20', unidad_peso: 'kg' }
    ];

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Series de:</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{title}</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={series}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TrainingCard
                            title={`${index + 1} Serie`}
                            description={`${item.peso} ${item.unidad_peso}`}
                            number={item.repeticiones}
                            iconPath={require('../../public/img1.png')}
                            onPress={() => console.log('Navegar a detalle del entrenamiento:', item.id)}
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

export default SerieScreen;