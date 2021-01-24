import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-tiny-toast';
import { SearchInput, ProductCard } from '../../../components';
import { deleteProduct, getProducts } from '../../../services';
import {  text, admin } from '../../../styles';
import { Product } from '../../../types';

type Props = {
    setScreen: Function;
    setProductId: Function;
}

const ProductsList = ({ setScreen, setProductId }: Props) => {

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (id : number) => {
        try {
            setIsLoading(true);
            const res = await deleteProduct(id);
            Toast.showSuccess('Produto deletado com sucesso!');
            fillProducts();
        }
        catch(e) {
            Toast.show('Erro ao deletar o produto!')
        }
    }

    const fillProducts = async () => {
        setIsLoading(true);
        const res = await getProducts();
        setProducts(res.data.content);
        setIsLoading(false);
    }

    useEffect(() => {
        fillProducts();
    }, []);

    const data = search.length > 0 ? products.filter(
        product => product.name.toLowerCase().includes(search.toLowerCase())) : products;

    return (
        <View>
            <ScrollView contentContainerStyle={admin.container}>
                <TouchableOpacity 
                    style={admin.addButton}
                    activeOpacity={0.8}
                    onPress={() => {
                        setScreen('productForm');
                        setProductId(0);
                    }}
                >
                    <Text style={text.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
                <SearchInput
                    placeholder="Nome do produto"
                    search={search}
                    setSearch={setSearch}
                />
                {
                    isLoading ?
                        (<ActivityIndicator color="gray" size="large" />)
                        :
                        (data.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                role="admin"
                                setScreen={setScreen}
                                setProductId={setProductId}
                                handleDelete={handleDelete}
                            />
                        )))
                }
            </ScrollView>
        </View>
    );
};

export default ProductsList;