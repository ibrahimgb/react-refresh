import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChartBox from './ChartBox';

describe('<ChartBox />', () => {
  test('it should mount', () => {
    render(<ChartBox />);
    
    const chartBox = screen.getByTestId('ChartBox');

    expect(chartBox).toBeInTheDocument();
  });
});