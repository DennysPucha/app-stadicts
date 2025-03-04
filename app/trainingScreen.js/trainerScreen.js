import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddTrainingForm from '../components/forms/AddTrainingForm';
import MyButton from '../components/MyButton';
import CustomModal from '../components/CustomModal';
import { useGetTrainersMyUser, PostTraining, DeleteTraining } from '../access/hooks/trainers';
import { getUserData } from '../access/session';
import CustomMessage from '../components/MessageCustom';
import LoadingIndicator from '../components/loadingIndicator';

const TrainingScreen = ({ route }) => {
    const { date } = route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState(null);

    const { trainings, loading, refetch } = useGetTrainersMyUser(date);

    function handlePress(item) {
        navigation.navigate('Exercise', { item: item });
    }

    const onSubmit = async (item) => {
        const user = await getUserData();
        const data = {
            nombre: item.nombre,
            descripcion: item.descripcion,
            fecha: date,
            user_id: user.id
        };
        const response = await PostTraining(data);
        setModalVisible(false);
        setTimeout(() => {
            if (response.code === 201) {
                refetch();
                setMessage({
                    message: 'Entrenamiento creado',
                    description: 'El entrenamiento se ha creado correctamente',
                    type: 'success',
                });
            } else {
                setMessage({
                    message: 'Error al crear entrenamiento',
                    description: 'Ha ocurrido un error al crear el entrenamiento',
                    type: 'error'
                });
            }
        }, 200);
    };

    const handleDelete = async (external_id) => {
        Alert.alert(
            'Eliminar Entrenamiento',
            '¿Estás seguro de que deseas eliminar este entrenamiento?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        const response = await DeleteTraining(external_id);
                        if (response.code === 200) {
                            setMessage({
                                message: 'Entrenamiento eliminado',
                                description: 'El entrenamiento se ha eliminado correctamente',
                                type: 'success',
                            });
                            refetch();
                        } else {
                            setMessage({
                                message: 'Error al eliminar entrenamiento',
                                description: 'Ha ocurrido un error al eliminar el entrenamiento',
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
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Entrenamientos del:</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{date}</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <MyButton title="Agregar entrenamiento" onPress={() => setModalVisible(true)} />
            </View>
            <FlatList
                data={trainings}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TrainingCard
                        title={item.nombre}
                        description={item.descripcion}
                        iconPath={require('../../public/img2.png')}
                        onPress={() => handlePress(item)}
                        onLongPress={() => handleDelete(item.external_id)}
                    />
                )}
                contentContainerStyle={styles.container}
                style={{ marginTop: 20 }}
            />
            <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <AddTrainingForm onSubmit={onSubmit} />
            </CustomModal>

            {message && (
                <CustomMessage
                    message={message.message}
                    description={message.description}
                    type={message.type}
                    duration={5000}
                    onDismiss={() => setMessage(null)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
