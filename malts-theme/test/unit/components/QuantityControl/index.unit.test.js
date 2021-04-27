import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import QuantityControl from '../../../../src/components/QuantityControl';

describe('When QuantityControl component is rendered', () => {
  const testQuantity = 2;
  const updateListener = jest.fn();

  test('the quantity is set correctly', () => {
    // Arrange

    // Act
    render(
      <QuantityControl quantity={testQuantity} min={1} max={10} updateListener={updateListener} />,
    );

    // Assert
    expect(screen.getByText(testQuantity.toString())).toBeInTheDocument();
  });

  test('- button decrements quantity', () => {
    // Arrange

    // Act
    render(
      <QuantityControl quantity={testQuantity} min={1} max={10} updateListener={updateListener} />,
    );

    // Assert
    fireEvent.click(screen.getByText('-'));
    expect(updateListener).toHaveBeenCalledTimes(1);
    expect(updateListener).toHaveBeenCalledWith(testQuantity - 1);
  });

  test('- button does not call updateListener when quantity equals minimum', () => {
    // Arrange
    const minimumQuantity = 1;

    // Act
    render(
      <QuantityControl
        quantity={minimumQuantity}
        min={minimumQuantity}
        max={10}
        updateListener={updateListener}
      />,
    );

    // Assert
    fireEvent.click(screen.getByText('-'));
    expect(updateListener).not.toHaveBeenCalled();
  });

  test('+ button increments quantity', () => {
    // Arrange

    // Act
    render(
      <QuantityControl quantity={testQuantity} min={1} max={10} updateListener={updateListener} />,
    );

    // Assert
    fireEvent.click(screen.getByText('+'));
    expect(updateListener).toHaveBeenCalledTimes(1);
    expect(updateListener).toHaveBeenCalledWith(testQuantity + 1);
  });

  test('+ button does not call updateListener when quantity equals maximum', () => {
    // Arrange
    const maximumQuantity = 10;

    // Act
    render(
      <QuantityControl
        quantity={maximumQuantity}
        min={1}
        max={maximumQuantity}
        updateListener={updateListener}
      />,
    );

    // Assert
    fireEvent.click(screen.getByText('+'));
    expect(updateListener).not.toHaveBeenCalled();
  });
});
