import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import MyButton from '../components/MyButton';
import { register } from '../access/methods';
import CustomMessage from '../components/MessageCustom';

const RegisterScreen = ({ navigation }) => {
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const [messageDescription, setMessageDescription] = useState(null);

    const registerSchema = Yup.object().shape({
        nombres: Yup.string().required('Los nombres son requeridos'),
        apellidos: Yup.string().required('Los apellidos son requeridos'),
        correo: Yup.string()
            .email('Ingrese un correo válido')
            .required('El correo es requerido'),
        clave: Yup.string()
            .required('La clave es requerida')
            .min(8, "La clave debe tener al menos 8 caracteres")
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = (data) => {
        const submit_data = {
            "user": {
                "nombres": data.nombres,
                "apellidos": data.apellidos,
            },
            "cuenta": {
                "correo": data.correo,
                "clave": data.clave
            }
        };

        register(submit_data).then((response) => {
            if (response.code === 201) {
                setMessage('¡Registro exitoso!');
                setMessageType('success');
                setMessageDescription('Bienvenido a nuestra aplicación.');
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 1500);
            } else {
                setMessage('Error');
                setMessageType('danger');
                setMessageDescription(response.detail || 'Por favor, intenta nuevamente.');
            }
        });
    };

    const handleDismiss = () => {
        setMessage(null);
        setMessageType(null);
        setMessageDescription(null);
    };
    

    return (
        <View style={styles.mainContainer}>
            {message && (
                <CustomMessage
                    message={message}
                    description={messageDescription}
                    type={messageType}
                    onDismiss={handleDismiss}
                />
            )}
            <View>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 40, marginBottom: 15, fontWeight: 'bold' }}>Registrate Aquí!</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={require('../../public/img2.png')}
                    style={{ width: 150, height: 150, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 }}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Nombres:</Text>
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
                        name="nombres"
                        defaultValue=""
                    />
                    {errors.nombres && <Text style={styles.error}>{errors.nombres.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Apellidos:</Text>
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
                        name="apellidos"
                        defaultValue=""
                    />
                    {errors.apellidos && <Text style={styles.error}>{errors.apellidos.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Correo electrónico:</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                            />
                        )}
                        name="correo"
                        defaultValue=""
                    />
                    {errors.correo && <Text style={styles.error}>{errors.correo.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Clave:</Text>
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
                    <MyButton title="Registrarse" onPress={handleSubmit(onSubmit)} />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 70,
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

export default RegisterScreen;