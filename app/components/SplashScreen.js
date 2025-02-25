import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.shadowContainer}>
        <Image
          source={require('../../public/icono-stadicts.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Asegura que la imagen no se distorsione
  },
  shadowContainer: {
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 5, // Sombra en Android
    backgroundColor: 'transparent', // Fondo transparente para el contenedor
  },
});

export default SplashScreen;