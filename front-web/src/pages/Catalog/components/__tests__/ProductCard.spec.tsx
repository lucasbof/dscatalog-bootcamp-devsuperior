import React from 'react';
import ProductCard from '../ProductCard';
import { render, screen } from '@testing-library/react';
import { Product } from 'core/types/Product';

test('should render ProductCard', () => {
    const product = {
        name: 'computador',
        imgUrl: 'image.png',
        price: 1200
    } as Product;

    render(
        <ProductCard product={product} />
    );

    expect(screen.getByText('computador')).toBeInTheDocument();
    expect(screen.getByAltText('computador')).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('1,200.00')).toBeInTheDocument();
});