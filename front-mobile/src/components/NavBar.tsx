import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { nav } from '../styles';
import menu from '../assets/menu.png';
import { TouchableOpacity as TouchableOpacityGestureHandler } from 'react-native-gesture-handler';

const NavBar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [show, setShow] = useState(false);

    const navigate= (path: any) => {
        if(path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={nav.drawer}
            onPress={() => setShow(!show)}
        >
            <Image source={menu} />
            {
                show &&
                (<View
                    style={nav.options}
                >
                    <TouchableOpacityGestureHandler
                        style={nav.option}
                        onPress={() => navigate('Home')}
                    >
                        <Text 
                            style={[nav.textOption, route.name === 'Home' && nav.textActive]}
                        >Home</Text>
                    </TouchableOpacityGestureHandler>
                    <TouchableOpacityGestureHandler
                        style={nav.option}
                        onPress={() => navigate('Catalog')}
                    >
                        <Text
                            style={[nav.textOption, route.name === 'Catalog' && nav.textActive]}
                        >Catalogo</Text>
                    </TouchableOpacityGestureHandler>
                    <TouchableOpacityGestureHandler
                        style={nav.option}
                        onPress={() => navigate('ADM')}
                    >
                        <Text
                            style={[nav.textOption, route.name === 'Admin' && nav.textActive]}
                        >ADM</Text>
                    </TouchableOpacityGestureHandler>
                </View>)
            }
        </TouchableOpacity>
    );
};

export default NavBar;