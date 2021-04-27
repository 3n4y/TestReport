import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ContestItem from '../../../../../src/components/Cart/ContestItem';

// https://stackoverflow.com/a/60862815
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('When ContestItem component is rendered', () => {
  test('it shows contest messaging correctly over £100', () => {
    // Arrange
    const testContestItem = { total: 110.00 };
    // Act
    const { container } = render(<ContestItem contest_item={testContestItem} />);
    // Assert
    expect(container.querySelector('.competitionSuccess')).toBeDefined();
    expect(container.querySelector('.competitionFailure')).toBeNull();
  });

  test('it shows contest messaging correctly under £100', () => {
    // Arrange
    const testContestItem = { total: 90.00 };
    // Act
    const { container } = render(
      <MemoryRouter><ContestItem contest_item={testContestItem} /></MemoryRouter>,
    );
    // Assert
    expect(container.querySelector('.competitionSuccess')).toBeNull();
    expect(container.querySelector('.competitionFailure')).toBeDefined();
  });
});
