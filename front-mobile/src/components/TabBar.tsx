import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { tabbar } from '../styles';

type Props = {
    screen: string;
    setScreen: Function;
}

const TabBar = ({ screen, setScreen }: Props) => {

    return (
        <View style={tabbar.container}>
            <TouchableOpacity 
                style={[tabbar.pill, (screen === 'products' || screen === 'productForm') && tabbar.pillActive]}
                activeOpacity={0.8}
                onPress={() => setScreen('products')}
            >
                <Text style={[tabbar.pillText, (screen === 'products' || screen === 'productForm') && tabbar.pillTextActive]}>Produtos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[tabbar.pill, screen === 'categories' && tabbar.pillActive]}
                activeOpacity={0.8}
                onPress={() => setScreen('categories')}
            >
                <Text style={[tabbar.pillText, screen === 'categories' && tabbar.pillTextActive]}>Categorias</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[tabbar.pill, screen === 'users' && tabbar.pillActive]}
                activeOpacity={0.8}
                onPress={() => setScreen('users')}
            >
                <Text style={[tabbar.pillText, screen === 'users' && tabbar.pillTextActive]}>Usuários</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TabBar;