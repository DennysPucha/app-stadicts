import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddExerciseForm from '../components/forms/AddExerciseForm';
import MyButton from '../components/MyButton';
import CustomModal from '../components/CustomModal';

const ExcerciseScreen = ({ route }) => {
    const { title } = route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const exercises = [
        { id: '1', title: 'Press Militar'},
        { id: '2', title: 'Press Banca'},
        { id: '3', title: 'Sentadillas'},
        { id: '4', title: 'Peso Muerto'},
        { id: '5', title: 'Dominadas'},
        { id: '6', title: 'Fondos'},
        { id: '7', title: 'Curl de Biceps'},
        { id: '8', title: 'Extension de Triceps'},
        { id: '9', title: 'Prensa de Piernas'},
        { id: '10', title: 'Elevaciones Laterales'},
    ];

    function handlePress(item) {
        navigation.navigate('Serie', { title: item.title });
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Ejercicios de:</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{title}</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <MyButton title="Agregar ejercicio" onPress={() => setModalVisible(true)} />
            </View>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TrainingCard
                        title={item.title}
                        number="0"
                        iconPath={require('../../public/img2.png')}
                        onPress={() => handlePress(item)}
                    />
                )}
                contentContainerStyle={styles.container}
                style={{ marginTop: 20 }}
            />
            <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <AddExerciseForm />
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