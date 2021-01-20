import React from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default App;
