import React from 'react';
import ButtonIcon from '..';
import { render, screen } from '@testing-library/react';

test('should render ButtonIcon', () => {

    render(
        <ButtonIcon text="logar" />
    );

    expect(screen.getByText('logar')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
});