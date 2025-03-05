import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/es';
import CustomMessage from '../components/MessageCustom';
import { width } from '../loginScreen/loginScreen';

const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [showMessage, setShowMessage] = useState(false);
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    "Cerrar Sesión",
                    "¿Estás seguro de que quieres cerrar sesión?",
                    [
                        { text: "Cancelar", style: "cancel" },
                        { text: "Sí", onPress: () => navigation.navigate('Login') }
                    ]
                );
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [navigation])
    );

    const handleDayPress = (day) => {
        console.log('Día seleccionado:', day.dateString);
        setSelectedDate(day.dateString);
        navigation.navigate('Training', { date: day.dateString });
    };

    return (
        <View style={styles.mainContainer}>
            {showMessage && (
                <CustomMessage
                    message="Saliendo..."
                    description="Has cerrado sesión"
                    type="error"
                    duration={3000}
                    onDismiss={() => setShowMessage(false)}
                />
            )}
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
                    <Image source={require('../../public/settings.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={styles.title}>Días de Entrenamiento</Text>
            </View>

            <Image
                source={require('../../public/img3.png')}
                style={{ width: 150, height: 150, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 }}
            />

            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: '#bb86fc' }
                    }}
                    theme={{
                        backgroundColor: '#30343f',
                        calendarBackground: '#30343f',
                        textSectionTitleColor: '#bdbdbd',
                        selectedDayBackgroundColor: '#bb86fc',
                        selectedDayTextColor: '#000',
                        todayTextColor: '#bb86fc',
                        dayTextColor: '#ffffff',
                        textDisabledColor: '#555',
                        monthTextColor: '#ffffff',
                        arrowColor: '#bb86fc',
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#21253b',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    calendarContainer: {
        backgroundColor: '#30343f',
        padding: 16,
        borderRadius: 20,
        margin: 16,
    },
    settingsButton: {
        position: 'absolute',
        right: 20,
        top: width * -0.10,
    },
});

export default CustomCalendar;