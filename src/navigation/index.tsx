import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Test } from './screens/Test';
import { Test2 } from './screens/Test2';
import { Test3 } from './screens/Test3';
import { Result } from './screens/Result';
import './screens/gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    Test2: {
      screen: Test2,
      options: {
        title: 'Test2',
        headerShown: false,
      },
    },
    Test3: {
      screen: Test3,
      options: {
        title: 'Test3',
        headerShown: false,
      },
    },
  },
  // initialRouteName: 'Result',
});
export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
