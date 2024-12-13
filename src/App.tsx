import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import './navigation/screens/gesture-handler'


Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          // Change the scheme to match your app's scheme defined in app.json
          'helloworld://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}

// import React, { useState, useEffect } from 'react';
// import { Navigation } from './navigation';
// import { TermsScreen } from './navigation/screens/TermsScreen';
// import * as SplashScreen from 'expo-splash-screen';
// import AsyncStorage from './navigation/screens/AsyncStorageUtility';

// SplashScreen.preventAutoHideAsync();

// export function App() {
//   const [hasSeenTerms, setHasSeenTerms] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkTerms = async () => {
//       try {
//         const value = await AsyncStorage.getItem('hasSeenTerms');
//         setHasSeenTerms(value !== null);
//       } catch (error) {
//         console.error('Error checking terms:', error);
//         setHasSeenTerms(false);
//       }
//     };
  
//     checkTerms();
//   }, []);

//   if (hasSeenTerms === null) {
//     return null;
//   }

//   return hasSeenTerms ? (
//     <Navigation
//       onReady={() => {
//         SplashScreen.hideAsync();
//       }}
//     />
//   ) : (
//     <TermsScreen setHasSeenTerms={setHasSeenTerms} />
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { Navigation } from './navigation';
// import * as SplashScreen from 'expo-splash-screen';
// import AsyncStorage from './navigation/screens/AsyncStorageUtility';
// import { TermsScreen } from './navigation/screens/TermsScreen';
// import { NavigationContainer } from '@react-navigation/native';

// export function App() {
//   const [hasSeenTerms, setHasSeenTerms] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkTermsStatus = async () => {
//       try {
//         const termsStatus = await AsyncStorage.getItem('hasSeenTerms');
//         setHasSeenTerms(termsStatus === 'true');
//       } catch (error) {
//         console.error('Error checking terms status:', error);
//         setHasSeenTerms(false);
//       } finally {
//         SplashScreen.hideAsync();
//       }
//     };

//     checkTermsStatus();
//   }, []);

//   // Show loading state while checking terms
//   if (hasSeenTerms === null) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   // If terms not seen, show Terms screen
//   if (!hasSeenTerms) {
//     return (
//       <NavigationContainer>
//         <TermsScreen 
//           setHasSeenTerms={setHasSeenTerms} 
//           onAcceptTerms={() => {
//             // This could be a no-op since setting hasSeenTerms to true 
//             // will trigger a re-render with the main navigation
//           }} 
//         />
//       </NavigationContainer>
//     );
//   }

//   // Otherwise, show main navigation
//   return (
//     <NavigationContainer>
//       <Navigation
//         linking={{
//           enabled: 'auto',
//           prefixes: ['helloworld://'],
//         }}
//       />
//     </NavigationContainer>
//   );
// }