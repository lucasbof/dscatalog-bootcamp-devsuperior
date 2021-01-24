import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { text, theme } from '../styles';
import { Product } from '../types';

type Props = {
    product: Product;
    role?: string;
    setScreen?: Function;
    setProductId?: Function;
    handleDelete?: Function;
}

const ProductCard = ({ product, role, setScreen, setProductId, handleDelete }: Props) => {

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
                    <TextInputMask 
                        type={"money"}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            suffixUnit: '',
                            unit: ' '
                        }}
                        value={product.price}
                        editable={false}
                        style={text.productPrice}
                    />
                </View>
            </View>

            {role === "admin" && (
                <View style={theme.buttonContainer}>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={theme.deleteBtn}
                        onPress={() => Alert.alert('Deseja excluir este produto?', 'Os dados do produto serão deletados, caso confirme', [
                            {
                                text: 'Voltar',
                                style: 'cancel'
                            },
                            {
                                text: 'Confirmar',
                                onPress: () => handleDelete && handleDelete(product.id ? product.id : 0),
                                style: 'default'
                            }
                        ])}
                    >
                        <Text style={text.deleteTxt}>Excluir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={theme.editBtn}
                        activeOpacity={0.8}
                        onPress={() => {
                            if(setScreen) setScreen('productForm');
                            if(setProductId) setProductId(product.id);
                        }}
                    >
                        <Text style={text.editText}>Editar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    );
}

export default ProductCard;