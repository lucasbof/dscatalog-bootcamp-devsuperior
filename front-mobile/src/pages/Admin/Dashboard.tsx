import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TabBar } from '../../components';
import { theme } from '../../styles';

import ProductsList  from './Products/ProductsList';
import Categories from './Categories';
import Users  from './Users';
import ProductForm from './Products/ProductForm';

const Dashboard = () => {

    const [screen, setScreen] = useState('products');
    const [productId, setProductId] = useState(0);

    return (
        <View>
           <TabBar screen={screen} setScreen={setScreen} />
           {screen === 'products' && <ProductsList setScreen={setScreen} setProductId={setProductId} />}
           {screen === 'categories' && <Categories />}
           {screen === 'users' && <Users />}
           {screen === 'productForm' && <ProductForm productId={productId} setScreen={setScreen} />}
        </View>
    );
};

export default Dashboard;