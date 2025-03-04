import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
    const [correo, setCorreo] = useState("dennys@gmail.com");
    const [clave, setClave] = useState("123456789");
    const [nuevaClave, setNuevaClave] = useState("");
    const [confirmarClave, setConfirmarClave] = useState("");

    const handleSave = () => {
        if (nuevaClave !== confirmarClave) {
            alert("Las contraseñas no coinciden");
            return;
        }
        alert("Configuración guardada correctamente");
    };

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <Text style={styles.menuTitle}>Opciones</Text>
                <TouchableOpacity style={styles.menuItem}>
                    {/* <Ionicons name="person-outline" size={20} color="white" /> */}
                    <Text style={styles.menuText}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
                    {/* <Ionicons name="log-out-outline" size={20} color="white" /> */}
                    <Text style={styles.menuText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Configuración de perfil</Text>

                <TextInput style={styles.input} value={correo} onChangeText={setCorreo} placeholder="Correo" placeholderTextColor="gray" />
                <TextInput style={styles.input} value={clave} onChangeText={setClave} placeholder="Clave actual" placeholderTextColor="gray" secureTextEntry />
                <TextInput style={styles.input} value={nuevaClave} onChangeText={setNuevaClave} placeholder="Nueva clave" placeholderTextColor="gray" secureTextEntry />
                <TextInput style={styles.input} value={confirmarClave} onChangeText={setConfirmarClave} placeholder="Confirmar clave" placeholderTextColor="gray" secureTextEntry />

                <Button title="Guardar cambios" onPress={handleSave} color="#4CAF50" />
            </View>
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
        width: '30%',
        backgroundColor: '#30343f',
        paddingVertical: 20,
        paddingHorizontal: 10,
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
});

export default SettingsScreen;
