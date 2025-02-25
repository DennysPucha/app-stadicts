import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import MyButton from '../components/MyButton';
import { login } from '../access/methods';
import { storeSession } from '../access/session';
export const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const loginSchema = Yup.object().shape({
        correo: Yup.string().email("Ingrese un correo válido").required("El correo es requerido"),
        clave: Yup.string().required("La clave es requerida"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        await login(data.correo, data.clave).then((response) => {
            if (response.code === 200) {
                storeSession(response.data.access_token).then(() => {
                    console.log('Sesión guardada');
                    alert('Inicio de sesión correcto');
                    navigation.replace('Home');
                });
                
            } else {
                alert('Correo o clave incorrectos');
            }
        });
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Hola de nuevo!</Text>
                    </View>
                    <Image
                        source={require('../../public/img1.png')}
                        style={{ width: 300, height: 300, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 }}
                    />
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
                            <Text style={styles.linkText}>¿Aún no tienes una cuenta?  Regístrate aquí</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#30343f',
        borderRadius: 20,
    },
    titleContainer: {
        position: 'relative',
        top: -(height * 0.01),
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
    mainContainer: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingInline: width * 0.05,
        paddingBlock: height * 0.05,
        backgroundColor: '#61667a',
    },
    scrollContainer: {
        flexGrow: 1
    },
});

export default LoginScreen;