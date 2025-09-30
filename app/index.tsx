
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

SplashScreen.preventAutoHideAsync();
const logo1 = require('../assets/logo1.png');
const bg1 = require('../assets/background1.jpg');

const Page = () => {
      const [loaded, error] = useFonts({
    'El Messiri': require('../assets/fonts/ElMessiriRegular.ttf'),
    'El Messiri Bold': require('../assets/fonts/ElMessiriBold.ttf'),
    'Maven Pro': require('../assets/fonts/MavenProRegular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg1} style={styles.background}>
        <StatusBar style="light" />
        <View style={styles.innerContent}>
          <Image source={logo1} style={{ width: 210, height: 230, objectFit: 'contain' }} />
          <Text style={styles.title}>Welcome to QuestBourne Realms</Text>
          <Text style={styles.paragraph}>
            Welcome to your journey! Follow the steps below to begin exploring your adventure with ease and excitement.
          </Text>
          <Text style={styles.button}>Get Started</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  innerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  title: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'El Messiri',
    fontWeight: 'bold',
  },
  paragraph: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: 386,
    marginTop: 30,
    marginBottom: 70,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#BF9C77',
    color: '#181717',
    fontSize: 20,
    textAlign: 'center',
    overflow: 'hidden',
    fontFamily: 'El Messiri',
  },
});

export default Page;