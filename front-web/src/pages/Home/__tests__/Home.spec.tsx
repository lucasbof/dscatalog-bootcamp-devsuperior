import React from 'react';
import Home from '..';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';

test('should render Home', () => {

    render(
        <Router history={history}>
            <Home />
        </Router>
    );

    const titleElement = 'Conheça o melhor catálogo de produtos';
    const subTitleElement = 'Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.';

    expect(screen.getByText(titleElement)).toBeInTheDocument();
    expect(screen.getByText(subTitleElement)).toBeInTheDocument();
    expect(screen.getByText(/INICIE AGORA A SUA BUSCA/i)).toBeInTheDocument();
    expect(screen.getByTestId('main-image')).toBeInTheDocument();
    

});