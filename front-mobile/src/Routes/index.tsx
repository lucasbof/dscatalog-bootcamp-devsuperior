import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Catalog, Home } from '../pages';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home" 
                component={Home}
            />
            <Stack.Screen
                name="Catalog"
                component={Catalog}
            />
        </Stack.Navigator>
    );
}

export default Routes;