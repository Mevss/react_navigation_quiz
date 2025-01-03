import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Navigation } from './navigation';
import './navigation/screens/gesture-handler';
import { fetch } from "@react-native-community/netinfo";

SplashScreen.preventAutoHideAsync();

export function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Ładowanie fontów
        await Font.loadAsync({
          PoppinsMedium: require('../assets/fonts/PoppinsMedium.ttf'),
          RobotoMedium: require('../assets/fonts/RobotoMedium.ttf'),
        }).catch(error => {
          console.error('Error loading fonts:', error);
        });
        // Sprawdzanie połączenia
        fetch().then(state => {
          console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
        });
        
        await Asset.loadAsync([
          ...NavigationAssets,
          require('./assets/newspaper.png'),
          require('./assets/bell.png'),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: ['helloworld://'],
      }}
    />
  );
}