import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import MyButton from '../components/MyButton';

export const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const loginSchema = Yup.object().shape({
        correo: Yup.string().email("Ingrese un correo válido").required("El correo es requerido"),
        clave: Yup.string().required("La clave es requerida"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Iniciar Sesión</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Correo electrónico: </Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="correo"
                    defaultValue=""
                />
                {errors.correo && <Text style={styles.error}>{errors.correo.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>Clave: </Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                    name="clave"
                    defaultValue=""
                />
                {errors.clave && <Text style={styles.error}>{errors.clave.message}</Text>}
            </View>
            <View style={{ marginTop: 20 }}>
                <MyButton title="Iniciar sesión" onPress={handleSubmit(onSubmit)} />
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>¿Aún no te registras? Regístrate aquí</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#30343f',
    },
    titleContainer: {
        position: 'relative',
        top: -(height * 0.1),
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 50,
        borderBottomColor: '#fafaff',
        borderBottomWidth: 3,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: 'white',
    },
    error: {
        color: '#d43139',
        marginBottom: 8,
    },
    inputContainer: {
        marginBottom: 16,
    },
    text: {
        color: 'white',
    },
    linkText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 30,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;