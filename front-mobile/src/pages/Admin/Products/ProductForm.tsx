import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Modal, Image, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Category, Product } from '../../../types';

import { getToken } from '../../../services/auth';

import arrow from '../../../assets/leftArrow.png';
import downArrow from '../../../assets/downArrow.png';
import { api, getCategories, getProduct, insertNewProduct, updateProduct, uploadImage } from '../../../services';
import Categories from '../Categories';
import { admin, colors, text, theme } from '../../../styles';
import { CheckBox } from '../../../components';
import Toast from 'react-native-tiny-toast';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';

type Props = {
    productId: number;
    setScreen: Function;
}

type CBox = {
    [key: string]: boolean;
};

const ProductForm = ({ productId, setScreen }: Props) => {

    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [product, setProduct] = useState<Product>({
        name: '',
        id: 0,
        categories: [],
        date: '',
        description: '',
        imgUrl: '',
        price: ''
    });
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [productCategories, setProductCategories] = useState<Category[]>([]);

    const [allChecks, setCheck] = useState<CBox>({});

    const [selectLabel, setSelectLabel] = useState('');
    const isEditing = productId !== 0;

    const updateCategories = () => {
        while (product.categories && product.categories.length > 0) {
            product.categories.pop();
        }
        categories.forEach((category) => {
            if (allChecks[`${category.name}${category.id}`]) {
                product.categories.push(category);
            }
        });

    }

    const handleOnSave = () => {
        if (!isEditing) newProduct();
        else editProduct();
    }

    const getRawPrice = (price: string) => {
        if(price.includes('R$')) {
            price = price.slice(2);
        }
        return price.replace(/\./g, '').replace(/,/g, '.');
    }
    

    const editProduct = async () => {
        setIsLoading(true)
        let data = { ...product };

        data.price = Number(getRawPrice(data.price));

        try {
            const res = await updateProduct(data);
            Toast.showSuccess('Produto salvo com sucesso!')
            setScreen('products');
        }
        catch (e) {
            Toast.show('Erro ao salvar!');
        }

        setIsLoading(false);
    }

    const newProduct = async () => {
        setIsLoading(true)
        let data = { ...product };
        delete data.id;
        data.price = Number(getRawPrice(data.price));
        try {
            const res = await insertNewProduct(data);
            Toast.showSuccess('Produto salvo com sucesso!')
            setScreen('products');
        }
        catch (e) {
            Toast.show('Erro ao salvar!');
        }

        setIsLoading(false);
    }

    const setInitialCategories = () => {
        const checks: CBox = {};
        categories.forEach(category => {
            if (isEditing) {
                if (productCategories.some(cat => cat.id === category.id)) {
                    checks[`${category.name}${category.id}`] = true;
                }
                else {
                    checks[`${category.name}${category.id}`] = false;
                }
            }
            else {
                checks[`${category.name}${category.id}`] = false;
            }
        });
        setCheck({ ...checks });
    }

    const loadProduct = async () => {
        if (isEditing) {
            setIsLoading(true);
            const res = await getProduct(productId);
            
            setProduct({ ...res.data, price: String(res.data.price.toFixed(2)) });

            setImage(res.data.imgUrl);
            
            setProductCategories([...res.data.categories]);
            setIsLoading(false);
        }
    }

    const loadCategories = async () => {
        setIsCategoryLoading(true);
        const res = await getCategories();
        setCategories([...res.data.content]);
        setIsCategoryLoading(false);
    }

    const getCategoriesLabel = () => {
        let label = '';

        if (!Object.values(allChecks).includes(true)) {
            label = 'Categoria, ';
        }

        categories.forEach((category) => {
            if (allChecks[`${category.name}${category.id}`]) {
                label += category.name + ', ';
            }
        });

        label = label.slice(0, -2);
        if (label.length > 35) {
            label = label.substring(0, 33) + '...';
        }
        return label;
    }

    const handleCheck = (property: string) => {
        const obj = allChecks;
        obj[property] = !obj[property];
        setCheck({ ...obj });
    }

    const selectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if(result.cancelled === false) {
            setImage(result.uri);
        }
    }

    const handleUpload = () => {
        uploadImage(image)
        .then(response => {
            const { uri } = response?.data;
            setProduct({...product, imgUrl: uri});
        })
        .catch((error) => {
            Toast.show('Erro ao fazer o upload da imagem!')
        })
    }

    useEffect(() => {
        loadCategories();
        loadProduct();
        async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if(status !== 'granted') {
                Alert.alert('Precisamos de acesso à biblioteca de imagens!');
            }
        }
    }, []);

    useEffect(() => {
        setIsCategoryLoading(true);
        setTimeout(() => {
            setInitialCategories();
            setSelectLabel(getCategoriesLabel());
            setIsCategoryLoading(false);
        }, 500);
    }, [categories, productCategories]);

    useEffect(() => {
        updateCategories();
        setSelectLabel(getCategoriesLabel());
    }, [allChecks]);

    useEffect(() => {
        image && image !== product.imgUrl ? handleUpload() : null
    }, [image]);

    return (
        <View style={theme.formContainer}>
            {
                isLoading ? (<ActivityIndicator color="gray" size="large" />)
                    : (
                        <View style={theme.formCard}>
                            <ScrollView>
                                <Modal
                                    visible={showCategories}
                                    animationType="fade"
                                    transparent={true}
                                    presentationStyle="overFullScreen"
                                >
                                    <View style={theme.modalContainer}>
                                        <ScrollView contentContainerStyle={theme.modalContent}>
                                            {
                                                isCategoryLoading ? (<ActivityIndicator color="gray" size="large" />)
                                                    :
                                                    (categories.map(category => (
                                                        <View key={category.id} style={theme.modalItem}>
                                                            <CheckBox
                                                                label={category.name.length > 37 ? category.name.substring(0, 33) + '...' : category.name}
                                                                labelStyle={{ color: 'black', fontSize: 16 }}
                                                                value={allChecks[`${category.name}${category.id}`]}
                                                                onChange={() => handleCheck(`${category.name}${category.id}`)}
                                                            />
                                                        </View>
                                                    )))
                                            }
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={theme.okBtn}
                                                onPress={() => setShowCategories(!showCategories)}
                                            >
                                                <Text style={text.addButtonText}>Ok</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </View>
                                </Modal>

                                <TouchableOpacity
                                    onPress={() => setScreen('products')}
                                    style={theme.goBackContainer}
                                >
                                    <Image source={arrow} />
                                    <Text style={text.goBackText}>Voltar</Text>
                                </TouchableOpacity>

                                <TextInput
                                    placeholder="Nome do Produto"
                                    style={theme.formInput}
                                    value={product.name}
                                    onChangeText={(text) => setProduct({ ...product, name: text })}
                                />

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setShowCategories(!showCategories)}
                                    style={theme.selectInput}
                                >
                                    {
                                        isCategoryLoading ? (<ActivityIndicator color="gray" size="large" />)
                                            :
                                            (<Text
                                                style={!Object.values(allChecks).includes(true) ? { color: '#9E9E9E' } : { color: 'black' }}
                                            >
                                                {selectLabel}
                                            </Text>)
                                    }

                                    <Image source={downArrow} />
                                </TouchableOpacity>

                                <TextInputMask
                                    type={"money"}
                                    placeholder="Preço"
                                    value={product.price}
                                    style={theme.formInput}
                                    onChangeText={(price) => setProduct({ ...product, price: price })}
                                />

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={theme.uploadBtn}
                                    onPress={selectImage}
                                >
                                    <Text style={text.uploadText}>Carregar imagem</Text>
                                </TouchableOpacity>
                                <Text style={text.fileSize}>As imagens devem ser  JPG ou PNG e não devem ultrapassar 5 mb.</Text>

                                {
                                    image !== '' && (
                                        <TouchableOpacity
                                            onPress={selectImage}
                                            activeOpacity={0.9}
                                            style={{
                                                width: '100%',
                                                height: 300,
                                                borderRadius: 10,
                                                marginVertical: 10
                                            }}
                                        >
                                            <Image 
                                                source={{ uri: image }}
                                                style={{ width: '100%', height: '100%', borderRadius: 10 }} 
                                            />
                                        </TouchableOpacity>
                                    )
                                }

                                <TextInput
                                    multiline
                                    placeholder="Descrição"
                                    style={theme.textArea}
                                    value={product.description}
                                    onChangeText={(text) => setProduct({ ...product, description: text })}
                                />

                                <View style={theme.buttonContainer}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={theme.deleteBtn}
                                        onPress={() => Alert.alert('Deseja cancelar?', 'Os dados preenchidos serão perdidos', [
                                            {
                                                text: 'Voltar',
                                                style: 'cancel'
                                            },
                                            {
                                                text: 'Confirmar',
                                                onPress: () => setScreen('products'),
                                                style: 'default'
                                            }
                                        ])}
                                    >
                                        <Text style={text.deleteTxt}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={theme.saveBtn}
                                        onPress={handleOnSave}
                                    >
                                        <Text style={text.saveBtn}>Salvar</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>

                    )
            }

        </View>
    );
};

export default ProductForm;