import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const navigation = useNavigation();

    const daysInMonth = Array.from({ length: selectedDate.daysInMonth() }, (_, i) =>
        selectedDate.clone().startOf('month').add(i, 'days')
    );

    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const handleDayPress = (day) => {
        console.log('Día seleccionado:', day.format('YYYY-MM-DD'));
        setSelectedDate(day);
        navigation.navigate('Training', { date: day.format('YYYY-MM-DD') });
    };


    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
                    <Text style={styles.settingsText}>⚙️</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Días de Entrenamiento</Text>

            </View>
            <View style={styles.container}>

                {/* Mes y botones de navegación */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setSelectedDate(prev => prev.clone().subtract(1, 'month'))}>
                        <Text style={styles.navButton}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.month}>{selectedDate.format('MMMM YYYY')}</Text>
                    <TouchableOpacity onPress={() => setSelectedDate(prev => prev.clone().add(1, 'month'))}>
                        <Text style={styles.navButton}>{'>'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Días de la semana */}
                <View style={styles.weekDays}>
                    {weekDays.map((day, index) => (
                        <Text key={index} style={styles.weekDayText}>{day}</Text>
                    ))}
                </View>

                {/* Días del mes */}
                <FlatList
                    data={daysInMonth}
                    keyExtractor={(item) => item.format('YYYY-MM-DD')}
                    numColumns={7}
                    contentContainerStyle={styles.calendar}
                    renderItem={({ item }) => {
                        const isSelected = item.isSame(selectedDate, 'day');
                        return (
                            <TouchableOpacity
                                style={[styles.dayContainer, isSelected && styles.selectedDay]}
                                onPress={() => handleDayPress(item)}
                            >
                                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                                    {item.date()}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: width * 0.1,
        backgroundColor: '#21253b',
    },
    container: {
        flex: 1,
        backgroundColor: '#30343f',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.9,
        marginBottom: 25,
    },
    navButton: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#bb86fc',
    },
    month: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'capitalize',
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width * 0.9,
        marginBottom: 5,
    },
    weekDayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#bdbdbd',
    },
    calendar: {
        width: width * 0.9,
    },
    dayContainer: {
        width: width * 0.125,
        height: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 8,
    },
    dayText: {
        fontSize: 18,
        color: '#ffffff',
    },
    selectedDay: {
        backgroundColor: '#bb86fc',
    },
    selectedDayText: {
        color: '#000000',
        fontWeight: 'bold',
    },
    settingsButton: {
        display: 'flex',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    settingsText: {
        fontSize: 24,
        color: 'white',
    },
});

export default CustomCalendar;
