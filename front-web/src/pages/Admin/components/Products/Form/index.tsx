import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    description: string;
    imageUrl: string;
}

const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ url: '/products', method: 'POST', data });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="cadastrar um produto">
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
                                name="imageUrl"
                                type="text"
                                ref={register({ required: "Campo obrigatório" })}  
                                className={`form-control input-base ${errors.imageUrl && 'is-invalid'}`}
                                placeholder="Url da imagem" 
                            />
                            {errors.imageUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imageUrl.message}
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