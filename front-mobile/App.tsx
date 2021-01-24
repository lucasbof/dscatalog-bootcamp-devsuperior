import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';
import * as Updates from 'expo-updates';

const App = () => {

  const checkUpdates = async () => {
    const update = await Updates.checkForUpdateAsync();

    if(update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  useEffect(() => {
    checkUpdates();
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default App;
