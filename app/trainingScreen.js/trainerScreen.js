import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddTrainingForm from '../components/forms/AddTrainingForm';
import MyButton from '../components/MyButton';
import CustomModal from '../components/CustomModal';
import { useGetTrainersMyUser, PostTraining, DeleteTraining, CopyTraining } from '../access/hooks/trainers';
import { getUserData } from '../access/session';
import CustomMessage from '../components/MessageCustom';
import LoadingIndicator from '../components/loadingIndicator';
import { Calendar } from 'react-native-calendars';
import FloatingBackButton from '../components/FloatingBackButton';

const TrainingScreen = ({ route }) => {
    const { date } = route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [copyModalVisible, setCopyModalVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const [selectedDate, setSelectedDate] = useState(date);
    const [showCalendar, setShowCalendar] = useState(true);

    const { trainings, loading, refetch } = useGetTrainersMyUser(date);
    const { trainings: newTrainings, refetch: refetchNewTrainings, loading: loadingNewTrainings } = useGetTrainersMyUser(selectedDate);

    function handlePress(item) {
        navigation.navigate('Exercise', { item: item });
    }

    const onSubmit = async (item) => {
        const user = await getUserData();
        const data = {
            nombre: item.nombre,
            descripcion: item.descripcion,
            fecha: date,
            is_copy: false,
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

    const handleCopyTraining = async (training) => {
        const response = await CopyTraining(training.id, date);
        setCopyModalVisible(false);
        setTimeout(() => {
            if (response.code === 201) {
                setMessage({
                    message: 'Entrenamiento copiado',
                    description: 'El entrenamiento se ha copiado correctamente',
                    type: 'success',
                });
                refetch();
            } else {
                setMessage({
                    message: 'Error al copiar entrenamiento',
                    description: 'Ha ocurrido un error al copiar el entrenamiento',
                    type: 'error',
                });
            }
        }, 200);
    };

    useEffect(() => {
        if (selectedDate !== date) {
            refetchNewTrainings();
        }
    }, [selectedDate]);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <View style={styles.mainContainer}>
            <FloatingBackButton />
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
                        iconPath={require('../../public/train.png')}
                        onPress={() => handlePress(item)}
                        onLongPress={() => handleDelete(item.external_id)}
                    />
                )}
                contentContainerStyle={styles.container}
                style={{ marginTop: 20 }}
            />

            <TouchableOpacity style={styles.floatingButton} onPress={() => {
                setCopyModalVisible(true);
                setShowCalendar(true);
            }}>
                <Image source={require('../../public/copy.png')} style={styles.buttonIcon} />
            </TouchableOpacity>

            {/* Modal para copiar entrenamiento */}
            <CustomModal visible={copyModalVisible} onClose={() => setCopyModalVisible(false)}>
                {loadingNewTrainings ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom:50 }}>
                        <LoadingIndicator />
                    </View>
                ) : (
                    <>
                        <Text style={styles.modalTitle}>Copiar Entrenamiento</Text>
                        {showCalendar ? (
                            <Calendar
                                onDayPress={(day) => {
                                    setSelectedDate(day.dateString);
                                    setShowCalendar(false);
                                }}
                                markedDates={{ [selectedDate]: { selected: true, selectedColor: '#ff4081' } }}
                                theme={{
                                    backgroundColor: '#21253b',
                                    calendarBackground: '#21253b',
                                    textSectionTitleColor: 'white',
                                    selectedDayBackgroundColor: '#ff4081',
                                    selectedDayTextColor: 'white',
                                    todayTextColor: '#ff4081',
                                    dayTextColor: 'white',
                                    textDisabledColor: '#555',
                                    monthTextColor: 'white',
                                    arrowColor: 'white',
                                }}
                            />
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Entrenamientos del {selectedDate}</Text>
                                <FlatList
                                    data={newTrainings}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <TrainingCard
                                            title={item.nombre}
                                            description={item.descripcion}
                                            iconPath={require('../../public/img2.png')}
                                            onPress={() => handleCopyTraining(item)}
                                        />
                                    )}
                                />
                            </>
                        )}
                    </>
                )}
            </CustomModal>

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
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff4081',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
    },
    buttonIcon: {
        width: 30,
        height: 30,
        tintColor: 'white',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default TrainingScreen;