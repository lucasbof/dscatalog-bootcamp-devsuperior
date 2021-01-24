import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { api } from '../services';
import { Product } from '../types';
import leftArrow from '../assets/leftArrow.png';
import { text, theme } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

type Props = {
    route: {
        params: {
            productId: number;
        }
    }
}

const ProductDetails = ({ route }: Props) => {
    const { productId } = route.params;
    const navigation = useNavigation();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);

    const getProduct = async () => {
        setIsLoading(true);
        const res = await api.get(`/products/${productId}`);
        setProduct(res.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <View style={theme.detailsContainer}>
            {
                isLoading ?
                    (<ActivityIndicator color="gray" size="large" />)
                    :

                    (<View style={theme.detailCard}>
                        <TouchableOpacity
                            style={theme.goBackContainer}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={leftArrow} />
                            <Text style={text.goBackText}>Voltar</Text>
                        </TouchableOpacity>
                        <View style={theme.productImageContainer}>
                            <Image style={theme.productImage} source={{ uri: product?.imgUrl }} />
                        </View>
                        <Text style={text.productDetailsTitle}>{product?.name}</Text>
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
                                value={product?.price}
                                editable={false}
                                style={text.productPrice}
                            />
                        </View>
                        <ScrollView style={theme.scrollTextContainer}>
                            <Text style={text.productDescription}>{product?.description}</Text>
                        </ScrollView>
                    </View>)
            }
        </View>
    );
};

export default ProductDetails;