import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { ProductCard, SearchInput } from '../components';
import { getProducts } from '../services';
import { theme } from '../styles';
import { Product } from '../types';


const Catalog = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
        <ScrollView contentContainerStyle={theme.scrollContainer}>
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
                    />
                )))
            }
        </ScrollView>
    )
}

export default Catalog;