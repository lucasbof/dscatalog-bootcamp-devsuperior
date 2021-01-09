import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import Card from '../Card';

const List = () => {
    const history = useHistory();
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }

        setIsLoading(true);
        makeRequest({url: '/products', params})
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este produto?');
        if(confirm) {
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
            .then(() => { 
                toast.info('O produto foi excluído com sucesso!');
                getProducts();
            })
            .catch(() => toast.error('Houve erro na exclusão do produto'));
        }
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
                {productsResponse?.content.map((product => (
                    <Card
                        onRemove={onRemove} 
                        product={product} 
                        key={product.id} 
                    />
                )))}
                 {productsResponse && 
                    <Pagination 
                        totalPages={productsResponse.totalPages}
                        activePage={activePage} 
                        onChange={page => setActivePage(page)}
                    />
        }
            </div>
        </div>
    );
}

export default List;