import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Test } from './screens/Test';
import { Result } from './screens/Result';
import { TermsScreen } from './screens/TermsScreen';
import './screens/gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fetchAndStoreTests, Test as TestType } from './screens/Tasks';
import _ from 'lodash';

const CustomDrawerContent = (props: any) => {
  const [tests, setTests] = useState<TestType[]>([]);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const fetchedTests = await fetchAndStoreTests();
      setTests(fetchedTests);
    } catch (error) {
      console.error('Blad podczas ladowania testow:', error);
    }
  };

  const handleSyncTests = async () => {
    try {
      const tests = await fetchAndStoreTests();
      setTests(tests);
      Alert.alert(
        'Sukces',
        `Zsynchronizowano ${tests.length} testow`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Blad',
        'Nie udalo sie zsynchronizowac testow.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleRandomTest = () => {
    if (tests.length > 0) {
      const randomTest = tests[Math.floor(Math.random() * tests.length)];
      props.navigation.navigate('Test', { testId: randomTest.id });
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
      <DrawerItem
        label="Sync Tests"
        onPress={handleSyncTests}
        icon={({ color, size }) => (
          <Image 
            source={bell} 
            style={{ width: size, height: size, tintColor: color }}
          />
        )}
      />

      <DrawerItem
        label="Random Test"
        onPress={handleRandomTest}
        icon={({ color, size }) => (
          <Image 
            source={newspaper} 
            style={{ width: size, height: size, tintColor: color }}
          />
        )}
      />

      <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 10 }} />

      {tests.map((test) => (
        <DrawerItem
          key={test.id}
          label={test.name}
          onPress={() => props.navigation.navigate('Test', { testId: test.id })}
        />
      ))}
    </DrawerContentScrollView>
  );
};

const RootStack = createDrawerNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Result: {
      screen: Result,
      options: {
        title: 'Result',
        headerShown: false,
      },
    },
    Test: {
      screen: Test,
      options: {
        title: 'Test',
        headerShown: false,
      },
    },
    // TermsScreen: {
    //   screen: TermsScreen,
    //   options: {
    //     title: 'TermsScreen',
    //     headerShown: false,
    //   },
    // },
  },
  drawerContent: (props) => <CustomDrawerContent {...props} />,
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = {
  Home: undefined;
  Result: undefined;
  Test: { testId: string };
  TermsScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}