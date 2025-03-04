import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddTrainingForm from '../components/forms/AddTrainingForm';
import MyButton from '../components/MyButton';
import CustomModal from '../components/CustomModal';

const TrainingScreen = ({ route }) => {
    const { date } = route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);


    const trainings = [
        { id: '1', title: 'Pecho', description: 'Dia básico de pecho'},
        { id: '2', title: 'Espalda', description: 'Dia básico de espalda'},
        { id: '3', title: 'Piernas', description: 'Dia básico de piernas'},
        { id: '4', title: 'Hombros', description: 'Dia básico de hombros'},
        { id: '5', title: 'Biceps', description: 'Dia básico de biceps'},
        { id: '6', title: 'Triceps', description: 'Dia básico de triceps'},
        { id: '7', title: 'Cardio', description: 'Dia básico de cardio'},
        { id: '8', title: 'Abdomen', description: 'Dia básico de abdomen'},
        { id: '9', title: 'Full Body', description: 'Dia básico de full body'},
        { id: '10', title: 'Gluteos', description: 'Dia básico de gluteos'},
    ];

    function handlePress(item) {
        navigation.navigate('Exercise', { title: item.title });
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Entrenamientos del:</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{date}</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <MyButton title="Agregar entrenamiento" onPress={() => setModalVisible(true)} />
            </View>
            <FlatList
                data={trainings}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TrainingCard
                        title={item.title}
                        description={item.description}
                        number="0"
                        iconPath={require('../../public/img2.png')}
                        onPress={() => handlePress(item)}
                    />
                )}
                contentContainerStyle={styles.container}
                style={{ marginTop: 20 }}
            />
            <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <AddTrainingForm />
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