import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomMessage from '../components/MessageCustom';
import { PostChangeUser } from '../access/hooks/user';
import { getUserData } from '../access/session';

const schema = Yup.object().shape({
    correo: Yup.string().email('Correo inválido').required('El correo es requerido'),
    clave: Yup.string().required('La clave actual es requerida'),
    nuevaClave: Yup.string()
        .min(8, 'La nueva clave debe tener al menos 8 caracteres')
        .required('La nueva clave es requerida'),
    confirmarClave: Yup.string()
        .oneOf([Yup.ref('nuevaClave'), null], 'Las contraseñas no coinciden')
        .required('Confirmar clave es requerida'),
});

const SettingsScreen = ({ navigation }) => {

    const [userData, setUserData] = useState({});
    const [activeSection, setActiveSection] = useState('perfil');
    const [message, setMessage] = useState(null);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            correo: '',
        }
    });

    useEffect(() => {
        getUserData().then((data) => {
            if (data) {
                setUserData(data);
                reset({correo: data.correo});
            }
        }).catch((err) => console.error("Error al obtener datos del usuario:", err));
    }, []);

    

    const onSubmit = async (data) => {
        try {
            const submitData = {
                correo: data.correo,
                clave: data.clave,
                nueva_clave: data.nuevaClave,
                confirmar_clave: data.confirmarClave,
            };
            const response = await PostChangeUser(submitData, userData.cuenta_external_id);
            if (response.code === 200) {
                setMessage({
                    type: 'success',
                    message: 'Datos actualizados',
                    description: 'Los datos de tu perfil han sido actualizados correctamente.',
                });
            } else {
                setMessage({
                    type: 'error',
                    message: response.detail || 'Error al actualizar',
                    description: 'Ha ocurrido un error al actualizar los datos de tu perfil.',
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                message: 'Error de conexión',
                description: 'No se pudo conectar con el servidor.',
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <Text style={styles.menuTitle}>Opciones</Text>
                <TouchableOpacity style={styles.menuItem} onPress={() => setActiveSection('perfil')}>
                    <Text style={styles.menuText}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => setActiveSection('configuracion')}>
                    <Text style={styles.menuText}>Configuración</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.menuText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {activeSection === 'perfil' && (
                    <View style={styles.userDataSection}>
                        <Text style={styles.title}>Mis datos</Text>
                        <Image
                            source={require('../../public/user.png')}
                            style={styles.userImage}
                        />
                        <Text style={styles.userDataText}>Nombre: {userData?.nombre || 'N/A'}</Text>
                        <Text style={styles.userDataText}>Correo: {userData?.correo || 'N/A'}</Text>
                    </View>
                )}

                {activeSection === 'configuracion' && (
                    <View>
                        <Text style={styles.title}>Configuración de perfil</Text>

                        <Controller
                            control={control}
                            name="correo"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Correo"
                                    placeholderTextColor="gray"
                                />
                            )}
                        />
                        {errors.correo && <Text style={styles.errorText}>{errors.correo.message}</Text>}

                        <Controller
                            control={control}
                            name="clave"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Clave actual"
                                    placeholderTextColor="gray"
                                    secureTextEntry
                                />
                            )}
                        />
                        {errors.clave && <Text style={styles.errorText}>{errors.clave.message}</Text>}

                        <Controller
                            control={control}
                            name="nuevaClave"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Nueva clave"
                                    placeholderTextColor="gray"
                                    secureTextEntry
                                />
                            )}
                        />
                        {errors.nuevaClave && <Text style={styles.errorText}>{errors.nuevaClave.message}</Text>}

                        <Controller
                            control={control}
                            name="confirmarClave"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Confirmar clave"
                                    placeholderTextColor="gray"
                                    secureTextEntry
                                />
                            )}
                        />
                        {errors.confirmarClave && <Text style={styles.errorText}>{errors.confirmarClave.message}</Text>}

                        <Button title="Guardar cambios" onPress={handleSubmit(onSubmit)} color="#4CAF50" />
                    </View>
                )}
            </View>

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
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#21253b',
    },
    menu: {
        width: '40%',
        backgroundColor: '#30343f',
        paddingVertical: 20,
        paddingHorizontal: 10,
        paddingTop: 40,
    },
    menuTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#40444b',
    },
    menuText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    content: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#40444b',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    userDataSection: {
        alignItems: 'center',
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        tintColor: '#bb86fc',
    },
    userDataText: {
        fontSize: 10,
        color: 'white',
        marginBottom: 10,
    },
});

export default SettingsScreen;
