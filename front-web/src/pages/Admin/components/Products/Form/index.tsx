import React, { useEffect } from 'react';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';

type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'editar um produto' : 'cadastrar um produto'

    useEffect(() => {
        if(isEditing) {
            makeRequest({url: `/products/${productId}`})
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);

                });
        }
    }, [productId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ 
            url: isEditing ? `/products/${productId}` : '/products', 
            method: isEditing ? 'PUT' : 'POST', 
            data 
        })
            .then(() => {
                toast.info('Produto cadastrado com sucesso!');
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
                                className={`form-control input-base ${errors.name && 'is-invalid'}`}
                                placeholder="Nome do produto" 
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input 
                                name="price"
                                type="text"
                                ref={register({ required: "Campo obrigatório" })} 
                                className={`form-control input-base ${errors.price && 'is-invalid'}`}
                                placeholder="Preço"
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
                                className={`form-control input-base ${errors.imgUrl && 'is-invalid'}`}
                                placeholder="Url da imagem" 
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
                            className={`form-control input-base ${errors.description && 'is-invalid'}`}
                            ref={register({ required: "Campo obrigatório" })} 
                            placeholder="Descrição"    
                            cols={30} 
                            rows={10} 
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