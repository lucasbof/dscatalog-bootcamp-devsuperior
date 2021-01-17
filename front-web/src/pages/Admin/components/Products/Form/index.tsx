import React, { useEffect, useState } from 'react';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'core/types/Product';

type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'editar um produto' : 'cadastrar um produto';
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if(isEditing) {
            makeRequest({url: `/products/${productId}`})
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);
                    setValue('categories', response.data.categories);

                });
        }
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ 
            url: isEditing ? `/products/${productId}` : '/products', 
            method: isEditing ? 'PUT' : 'POST', 
            data 
        })
            .then(() => {
                toast.info('Produto salvo com sucesso!');
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Erro ao salvar produto!');
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
                title={formTitle}
            >
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                name="name"
                                type="text"
                                ref={register({ 
                                    required: "Campo obrigatório",
                                    minLength: {value: 5, message: 'O campo deve ter pelo menos 5 caracteres'},                                
                                    maxLength: {value: 60, message: 'O campo deve ter até 60 caracteres'}                                
                                })} 
                                className="form-control input-base"
                                placeholder="Nome do produto"
                                data-testid="name" 
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                                <label htmlFor="categories" className="d-none">Categorias</label>
                                <Controller
                                    as={Select}
                                    name="categories"
                                    inputId="categories"
                                    rules={{ required: true }}
                                    control={control}
                                    isLoading={isLoadingCategories}
                                    isMulti
                                    placeholder="Categorias"
                                    classNamePrefix="categories-select" 
                                    options={categories}
                                    getOptionLabel={ (option: Category) => option.name }
                                    getOptionValue={ (option: Category) => String(option.id) } 
                                />
                                {errors.categories && (
                                    <div className="invalid-feedback d-block">
                                        Campo obrigatório
                                    </div>
                                )}
                        </div>
                        <div className="margin-bottom-30">
                            <input 
                                name="price"
                                type="number"
                                ref={register({ required: "Campo obrigatório" })} 
                                className="form-control input-base"
                                placeholder="Preço"
                                data-testid="price" 
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                name="imgUrl"
                                type="text"
                                ref={register({ required: "Campo obrigatório" })}  
                                className="form-control input-base"
                                placeholder="Imagem" 
                                data-testid="imgUrl" 
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea 
                            name="description"
                            className="form-control input-base"
                            ref={register({ required: "Campo obrigatório" })} 
                            placeholder="Descrição"    
                            cols={30} 
                            rows={10}
                            data-testid="description"  
                        />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>

            </BaseForm>
        </form>
    );
}

export default Form;