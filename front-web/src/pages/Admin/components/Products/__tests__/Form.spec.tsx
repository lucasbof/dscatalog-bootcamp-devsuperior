import React from 'react';
import Form from '../Form';
import { render, screen, waitFor } from '@testing-library/react';
import { Router, useParams } from 'react-router-dom';
import history from 'core/utils/history';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { categoriesResponse, fillFormData, productResponse } from './fixtures';
import { ToastContainer } from 'react-toastify';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

const server = setupServer(
    rest.get('http://localhost:8080/categories', (req, res, ctx) => {
      return res(ctx.json(categoriesResponse));
    }),
    rest.post('http://localhost:8080/products', (req, res, ctx) => {
      return res(ctx.status(201));
    }),
    rest.get('http://localhost:8080/products/:productId', (req, res, ctx) => {
      return res(ctx.json(productResponse));
    }),
    rest.put('http://localhost:8080/products/:productId', (req, res, ctx) => {
      return res(ctx.status(200));
    })
);
  
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close());

describe('creating a product', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    });
    test('should render Form and submit with success', async () => {

        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );
    
        const submitButton = screen.getByRole('button', { name: /salvar/i });
        const categoriesInput =screen.getByLabelText('Categorias');
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
        
        fillFormData();
    
        userEvent.click(submitButton);
    
        await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
        expect(history.location.pathname).toBe('/admin/products');
        expect(screen.getByText(/cadastrar um produto/i)).toBeInTheDocument();
    });
    
    test('should render Form and submit with error', async () => {
        server.use(
            rest.post('http://localhost:8080/products', (req, res, ctx) => {
              return res(ctx.status(500))
            })
        );
    
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );
    
        const submitButton = screen.getByRole('button', { name: /salvar/i });
        const categoriesInput =screen.getByLabelText('Categorias');
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
        
        fillFormData();
    
        userEvent.click(submitButton);
    
        await waitFor(() => expect(screen.getByText('Erro ao salvar produto!')).toBeInTheDocument());
    });
    
    test('should show required field message on the form when the fields are empty', async () => {
    
        render(
            <Router history={history}>
                <Form />
            </Router>
        );
    
        const submitButton = screen.getByRole('button', { name: /salvar/i });
        userEvent.click(submitButton);
    
        await waitFor(() => expect(screen.getAllByText('Campo obrigatório')).toHaveLength(5));
        
        const categoriesInput =screen.getByLabelText('Categorias');
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
        
        fillFormData();
    
        await waitFor(() => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0));
    });
    
    test('should show validation message on the form when the name field has length less than 5 caracters', async () => {
    
        render(
            <Router history={history}>
                <Form />
            </Router>
        );
    
        const submitButton = screen.getByRole('button', { name: /salvar/i });
        const nameInput = screen.getByTestId('name');
    
        userEvent.type(nameInput, 'Comp');
        userEvent.click(submitButton);
    
        await waitFor(() => expect(screen.getByText('O campo deve ter pelo menos 5 caracteres')).toBeInTheDocument());
    
        userEvent.clear(nameInput);
        userEvent.type(nameInput, 'Compu');
    
        await waitFor(() => expect(screen.queryByText('O campo deve ter pelo menos 5 caracteres')).not.toBeInTheDocument());
    });
    
    test('should show validation message on the form when the name field has length more than 60 caracters', async () => {
    
        render(
            <Router history={history}>
                <Form />
            </Router>
        );
    
        const submitButton = screen.getByRole('button', { name: /salvar/i });
        const nameInput = screen.getByTestId('name');
    
        userEvent.type(nameInput, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        userEvent.click(submitButton);
    
        await waitFor(() => expect(screen.getByText('O campo deve ter até 60 caracteres')).toBeInTheDocument());
    
        userEvent.clear(nameInput);
        userEvent.type(nameInput, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    
        await waitFor(() => expect(screen.queryByText('O campo deve ter até 60 caracteres')).not.toBeInTheDocument());
    });
});

describe('editing a product', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: '3'
        })
    });
    test('should render Form and submit with success', async () => {
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );
        
        const submitButton = screen.getByRole('button', { name: /salvar/i });

        await waitFor(() => expect(screen.getByTestId('name')).toHaveValue('Macbook Pro'));
        expect(screen.getByText('Computadores')).toBeInTheDocument();
        expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
        expect(screen.getByTestId('price')).toHaveValue(1250);
        expect(screen.getByTestId('imgUrl')).toHaveValue('image.jpg');
        expect(screen.getByTestId('description')).toHaveValue(':)');

        expect(screen.getByText(/editar um produto/i)).toBeInTheDocument();
        
        userEvent.click(submitButton);

        await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
        expect(history.location.pathname).toBe('/admin/products');
    });
});