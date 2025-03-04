import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import MyButton from '../components/MyButton';
import CustomModal from '../components/CustomModal';
import AddSerieForm from '../components/forms/AddSerieForm';

const SerieScreen = ({ route }) => {
    const { title } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [series, setSeries] = useState([
        { id: '1', repeticiones: '5', peso: '20', unidad_peso: 'kg' },
        { id: '2', repeticiones: '4', peso: '20', unidad_peso: 'kg' },
        { id: '3', repeticiones: '2', peso: '20', unidad_peso: 'kg' },
        { id: '4', repeticiones: '3', peso: '20', unidad_peso: 'kg' },
        { id: '5', repeticiones: '1', peso: '20', unidad_peso: 'kg' },
        { id: '6', repeticiones: '5', peso: '20', unidad_peso: 'kg' },
        { id: '7', repeticiones: '4', peso: '20', unidad_peso: 'kg' },
        { id: '8', repeticiones: '2', peso: '20', unidad_peso: 'kg' },
        { id: '9', repeticiones: '3', peso: '20', unidad_peso: 'kg' },
        { id: '10', repeticiones: '1', peso: '20', unidad_peso: 'kg' },
    ]);

    const handleAddSerie = (data) => {
        setSeries([...series, { ...data, id: (series.length + 1).toString() }]);
        setModalVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Series de:</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{title}</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <MyButton title="Agregar serie" onPress={() => setModalVisible(true)} />
            </View>
            <FlatList
                data={series}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TrainingCard
                        title={`${index + 1} Serie`}
                        description={`${item.peso} ${item.unidad_peso}`}
                        number={item.repeticiones}
                        iconPath={require('../../public/img2.png')}
                        onPress={() => console.log('Navegar a detalle del entrenamiento:', item.id)}
                    />
                )}
                contentContainerStyle={styles.container}
                style={{ marginTop: 20 }}
            />
            <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <AddSerieForm onSubmit={handleAddSerie} />
            </CustomModal>
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
        padding: 16,
        backgroundColor: '#30343f',
        borderRadius: 20,
        paddingBottom: 25,
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
