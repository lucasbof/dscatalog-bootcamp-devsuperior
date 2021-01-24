import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { text, theme } from '../styles';
import { useNavigation } from '@react-navigation/native';

import eyesOpened from '../assets/eyes-opened.png';
import eyesClosed from '../assets/eyes-closed.png';
import arrow from '../assets/arrow.png';
import { UserInfo } from '../types';
import { login } from '../services/auth';


const Login = () => {
    const navigation = useNavigation();

    const [hidePassword, setHidePassword] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo>({ username: '', password: '' });

    const handleLogin = async () => {
        try {
            await login(userInfo);
            navigation.navigate('Dashboard');
        }
        catch(e) {
            console.warn('Erro no login');
        }
    }

    return (
        <View style={theme.container}>
            <View style={theme.loginCard}>
                <Text style={text.loginTitle}>Login</Text>
                <View style={theme.form}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={theme.textInput}
                        value={userInfo.username}
                        onChangeText={
                            e => {
                                const newUserInfo = { ...userInfo };
                                newUserInfo.username = e;
                                setUserInfo(newUserInfo);
                            }
                        }
                    />
                    <View style={theme.passwordGroup}>
                        <TextInput
                            placeholder="Senha"
                            autoCapitalize="none"
                            style={theme.textInput}
                            value={userInfo.password}
                            onChangeText={
                                e => {
                                    const newUserInfo = { ...userInfo };
                                    newUserInfo.password = e;
                                    setUserInfo(newUserInfo);
                                }
                            }
                            secureTextEntry={hidePassword}
                        />
                        <TouchableOpacity
                            onPress={() => setHidePassword(!hidePassword)}
                            style={theme.toggle}
                        >
                            <Image
                                source={hidePassword ? eyesClosed : eyesOpened}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={theme.primaryButton}
                    activeOpacity={0.8}
                    onPress={() => handleLogin()}
                >
                    <View>
                        <Text style={text.primaryText}>Fazer Login</Text>
                    </View>
                    <View style={theme.arrowContainer}>
                        <Image source={arrow} />
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default Login;