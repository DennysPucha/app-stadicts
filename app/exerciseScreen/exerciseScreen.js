import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddExerciseForm from '../components/forms/AddExerciseForm';
import MyButton from '../components/MyButton';
import CustomModal from '../components/CustomModal';
import { useGetExercicesMyTrain, PostExercice, DeleteExercice } from '../access/hooks/exercices';
import CustomMessage from '../components/MessageCustom';
import LoadingIndicator from '../components/loadingIndicator';
import FloatingBackButton from '../components/FloatingBackButton';

const ExcerciseScreen = ({ route }) => {
    const { item: train } = route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState(null);

    const { exercises, loading, refetch } = useGetExercicesMyTrain(train.id);


    function handlePress(item) {
        navigation.navigate('Serie', { item: item });
    }

    const onSubmit = async (item) => {
        const data = {
            nombre: item.nombre,
            is_copy: false,
            entrenamiento_id: train.id
        };
        const response = await PostExercice(data);
        setModalVisible(false);
        setTimeout(() => {
            if (response.code === 201) {
                setMessage({
                    message: 'Ejercicio creado',
                    description: 'El ejercicio se ha creado correctamente',
                    type: 'success',
                });
                refetch();
            } else {
                setMessage({
                    message: 'Error al crear ejercicio',
                    description: 'Ha ocurrido un error al crear el ejercicio',
                    type: 'error'
                });
            }
        }, 1000);
    }

    const handleDelete = async (external_id) => {
        Alert.alert(
            'Eliminar Ejercicio',
            '¿Estás seguro de que deseas eliminar este ejercicio?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        const response = await DeleteExercice(external_id);
                        if (response.code === 200) {
                            setMessage({
                                message: 'Ejercicio eliminado',
                                description: 'El ejericicio se ha eliminado correctamente',
                                type: 'success',
                            });
                            refetch();
                        } else {
                            setMessage({
                                message: 'Error al eliminar ejercicio',
                                description: 'Ha ocurrido un error al eliminar el ejercicio',
                                type: 'error',
                            });
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };


    if (loading) {
        return <LoadingIndicator />;
    }



    return (
        <View style={styles.mainContainer}>
            <FloatingBackButton />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Ejercicios de:</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{train.nombre}</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <MyButton title="Agregar ejercicio" onPress={() => setModalVisible(true)} />
            </View>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TrainingCard
                        title={item.nombre}
                        iconPath={require('../../public/exercise.png')}
                        onPress={() => handlePress(item)}
                        onLongPress={() => handleDelete(item.external_id)}
                    />
                )}
                contentContainerStyle={styles.container}
                style={{ marginTop: 20 }}
            />
            <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <AddExerciseForm onSubmit={onSubmit} />
            </CustomModal>
            {message && (
                <CustomMessage
                    message={message.message}
                    description={message.description}
                    type={message.type}
                    onDismiss={() => setMessage(null)}
                />
            )}
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