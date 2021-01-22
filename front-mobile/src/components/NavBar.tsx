import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { nav, text } from '../styles';
import menu from '../assets/menu.png';
import { TouchableOpacity as TouchableOpacityGestureHandler } from 'react-native-gesture-handler';
import { isAuthenticated, doLogout } from '../services/auth';

const NavBar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [show, setShow] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);


    const logged = async () => {
        const result = await isAuthenticated();

        result ? setAuthenticated(true) : setAuthenticated(false);
    }

    useEffect(() => {
        logged();
    }, []);

    const logout = () => {
        doLogout();
        navigation.navigate('Login');
    }

    const navigate = async (path: any) => {
        if (path) {
            setShow(false);
            navigation.navigate(path);

        }
        setShow(false);
    }
    return (
        <>
            {
                authenticated ? (
                    <TouchableOpacity style={nav.logoutBtn} onPress={() => logout()}>
                        <Text style={text.logoutText}>Sair</Text>
                    </TouchableOpacity>
                )
                    :
                    (
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
                                        onPress={() => navigate('Login')}
                                    >
                                        <Text
                                            style={[nav.textOption, (route.name === 'Login' || route.name === 'Dashboard') && nav.textActive]}
                                        >ADM</Text>
                                    </TouchableOpacityGestureHandler>
                                </View>)
                            }
                        </TouchableOpacity>
                    )
            }
        </>
    );
};

export default NavBar;