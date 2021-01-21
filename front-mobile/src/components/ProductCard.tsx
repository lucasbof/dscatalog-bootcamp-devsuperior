import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { text, theme } from '../styles';
import { Product } from '../types';

type Props = {
    product: Product;
}

const ProductCard = ({ product }: Props) => {

    const navigation = useNavigation();

    const handleOnPress = (product: Product) => {
        navigation.navigate('ProductDetails', { productId: product.id });
    }

    return (
        <TouchableOpacity 
            style={theme.productCard}
            onPress={() => { handleOnPress(product) }}
        >
            <Image source={{uri: product.imgUrl }} style={theme.productImg} />
            <View style={theme.productDescription}>
                <Text style={text.productName}>{product.name}</Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <Text style={text.productPrice}>{product.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ProductCard;