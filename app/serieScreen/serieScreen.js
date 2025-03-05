import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Alert } from 'react-native';
import TrainingCard from '../components/TrainingCard';
import MyButton from '../components/MyButton';
import CustomModal from '../components/CustomModal';
import AddSerieForm from '../components/forms/AddSerieForm';
import { useGetSeriesByExercise, PostSerie, DeleteSerie } from '../access/hooks/series';
import CustomMessage from '../components/MessageCustom';
import LoadingIndicator from '../components/loadingIndicator';
import FloatingBackButton from '../components/FloatingBackButton';

const SerieScreen = ({ route }) => {
    const { item: exercise } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState(null);

    const { series, loading, refetch } = useGetSeriesByExercise(exercise.id);

    // Filtrar las series en dos listas
    const copiedSeries = series.filter((item) => item.is_copy === true);
    const newSeries = series.filter((item) => !item.is_copy);

    const onSubmit = async (item) => {
        const data = {
            peso: item.peso,
            repeticiones: item.repeticiones,
            unidad_peso: item.unidad_peso,
            is_copy: false,
            ejercicio_id: exercise.id
        };
        const response = await PostSerie(data);
        setModalVisible(false);
        setTimeout(() => {
            if (response.code === 201) {
                setMessage({
                    message: 'Serie creada',
                    description: 'La serie se ha creado correctamente',
                    type: 'success',
                });
                refetch();
            } else {
                setMessage({
                    message: 'Error al crear serie',
                    description: 'Ha ocurrido un error al crear la serie',
                    type: 'error'
                });
            }
        }, 1000);
    };

    const handleDelete = async (external_id) => {
        Alert.alert(
            'Eliminar Serie',
            '¿Estás seguro de que deseas eliminar esta serie?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        const response = await DeleteSerie(external_id);
                        if (response.code === 200) {
                            setMessage({
                                message: 'Serie eliminada',
                                description: 'La serie se ha eliminado correctamente',
                                type: 'success',
                            });
                            refetch();
                        } else {
                            setMessage({
                                message: 'Error al eliminar serie',
                                description: 'Ha ocurrido un error al eliminar la serie',
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

    const renderSection = (title, data) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TrainingCard
                        title={`${index + 1} Serie`}
                        description={`${item.peso} ${item.unidad_peso}`}
                        number={item.repeticiones}
                        iconPath={require('../../public/repeat.png')}
                        onLongPress={() => handleDelete(item.external_id)}
                        isCopy={item.is_copy}
                    />
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FloatingBackButton />
            <FlatList
                contentContainerStyle={styles.scrollViewContainer}
                data={[]}
                keyExtractor={() => 'root'}
                renderItem={null}
                ListHeaderComponent={
                    <View style={styles.mainContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Series de:</Text>
                            <Text style={{ fontSize: 15, color: 'white' }}>{exercise.nombre}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                            <MyButton title="Agregar serie" onPress={() => setModalVisible(true)} />
                        </View>

                        {/* Lista de series copiadas (Meta Pasada) */}
                        {copiedSeries.length > 0 && renderSection('Meta Pasada', copiedSeries)}

                        {/* Lista de series nuevas */}
                        {renderSection('Nuevas Series', newSeries)}

                        <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                            <AddSerieForm onSubmit={onSubmit} />
                        </CustomModal>
                        {message && (
                            <CustomMessage
                                message={message.message}
                                description={message.description}
                                type={message.type}
                                duration={3000}
                                onDismiss={() => setMessage(null)}
                            />
                        )}
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        paddingInline: 16,
        backgroundColor: '#21253b',
    },
    mainContainer: {
        flex: 1,
        paddingTop: Dimensions.get('window').width * 0.1,
        backgroundColor: '#21253b',
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
    sectionContainer: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#bb86fc',
        marginLeft: 16,
        marginBottom: 8,
    },
    listContainer: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#30343f',
        borderRadius: 20,
        paddingBottom: 25,
    },
    deleteIcon: {
        width: 24,
        height: 24,
    },
});

export default SerieScreen;