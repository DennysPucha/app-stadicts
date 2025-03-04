import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
    repeticiones: Yup.number()
        .typeError('Debe ser un número')
        .integer('Debe ser un número entero')
        .min(1, 'Mínimo 1 repetición')
        .required('Repeticiones requeridas'),
    peso: Yup.number()
        .typeError('Debe ser un número')
        .min(1, 'El peso debe ser mayor a 0')
        .required('Peso requerido'),
});

const AddSerieForm = ({ onSubmit }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { repeticiones: '', peso: '' },
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [unidadPeso, setUnidadPeso] = useState('kg');

    const selectUnidadPeso = (unidad) => {
        setUnidadPeso(unidad);
        setModalVisible(false);
    };

    const submitData = (data) => {
        onSubmit({ ...data, unidad_peso: unidadPeso });
        reset();
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.label}>Repeticiones</Text>
            <Controller
                control={control}
                name="repeticiones"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value.toString()}
                    />
                )}
            />
            {errors.repeticiones && <Text style={styles.errorText}>{errors.repeticiones.message}</Text>}

            <View style={styles.weightContainer}>
                <View style={styles.weightInputContainer}>
                    <Text style={styles.label}>Peso</Text>
                    <Controller
                        control={control}
                        name="peso"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value.toString()}
                            />
                        )}
                    />
                    {errors.peso && <Text style={styles.errorText}>{errors.peso.message}</Text>}
                </View>
                
                <TouchableOpacity
                    style={styles.comboBox}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.comboBoxText}>{unidadPeso}</Text>
                </TouchableOpacity>
            </View>

            <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Pressable style={styles.modalOption} onPress={() => selectUnidadPeso('kg')}>
                            <Text style={styles.modalOptionText}>Kilogramos (kg)</Text>
                        </Pressable>
                        <Pressable style={styles.modalOption} onPress={() => selectUnidadPeso('lb')}>
                            <Text style={styles.modalOptionText}>Libras (lb)</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(submitData)}>
                <Text style={styles.buttonText}>Guardar Serie</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: { padding: 20 },
    label: { fontSize: 16, color: '#fff', marginBottom: 5 },
    input: { backgroundColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
    errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
    button: { backgroundColor: '#425ed0', padding: 10, borderRadius: 5, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16 },
    weightContainer: { flexDirection: 'row', alignItems: 'center' },
    weightInputContainer: { flex: 1 },
    comboBox: { backgroundColor: '#333', padding: 10, borderRadius: 5, marginLeft: 10, marginTop: 18 },
    comboBoxText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' },
    modalContent: { backgroundColor: '#222', borderRadius: 10, padding: 20, width: '80%' },
    modalOption: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#444' },
    modalOptionText: { fontSize: 16, textAlign: 'center', color: '#fff' },
});

export default AddSerieForm;