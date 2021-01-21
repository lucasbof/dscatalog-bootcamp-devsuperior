import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Catalog, Home, ProductDetails } from '../pages';

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
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
            />
        </Stack.Navigator>
    );
}

export default Routes;