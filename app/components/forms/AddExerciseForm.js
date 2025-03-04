import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre requerido'),
});

const AddExerciseForm = ({ onSubmit }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { repeticiones: '', peso: '' },
    });

    const submitData = (data) => {
        onSubmit(data);
        reset();
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre</Text>
            <Controller
                control={control}
                name="nombre"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.nombre && <Text style={styles.errorText}>{errors.nombre.message}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleSubmit(submitData)}>
                <Text style={styles.buttonText}>Guardar</Text>
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

export default AddExerciseForm;