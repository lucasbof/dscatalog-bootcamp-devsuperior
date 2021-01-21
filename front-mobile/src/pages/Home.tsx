import React from 'react';
import { Text, View, Image } from 'react-native';
import { text, theme } from '../styles';
import arrow from '../assets/arrow.png';
import draw from '../assets/draw.png';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={theme.container}>
                <View style={theme.card}>
                    <Image source={draw} style={theme.draw} />
                    <View style={theme.textContainer}>
                        <Text style={text.bold}>Conheça o melhor catálogo de produtos</Text>
                        <Text style={text.regular}>Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Catalog')} 
                        style={theme.primaryButton}
                        activeOpacity={0.8}
                    >
                        <Text style={text.primaryText}>
                            INICIE AGORA A SUA BUSCA
                        </Text>
                        <View style={theme.arrowContainer}>
                            <Image source={arrow} />
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default Home;