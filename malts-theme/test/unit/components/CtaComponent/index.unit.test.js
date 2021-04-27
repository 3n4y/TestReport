import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CtaComponent from '../../../../src/components/CtaComponent';

jest.mock('../../../../src/components/HeaderComponent', () => jest.fn().mockImplementation(() => 'HeaderComponent Stub'));

const mockLocale = 'testLocale';
jest.mock('gatsby', () => ({
  useStaticQuery: () => ({
    site: {
      siteMetadata: {
        title: 'testTitle',
        locale: mockLocale,
      },
    },
  }),
  graphql: jest.fn(() => 'foo'),
}));

// https://stackoverflow.com/a/60862815
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

const squareClasses = ['d-none', 'd-md-block', 'col-md-4', 'mt-0', 'mb-0', 'mb-sm-3', 'square'];
const rectangleClasses = ['col-sm-12', 'col-md-8', 'mt-0', 'mb-0', 'mb-sm-3', 'rectangular'];

describe('When CtaComponent component is rendered', () => {
  const data = {
    Left_Column: {
      link: 'testLeftColumnLink',
    },
    Right_Column: {
      link: 'testRightColumnLink',
    },
  };

  test('that the basics (className, anchor tag href and the HeaderComponent) are correct', () => {
    // Arrange
    data.className = 'testClassName';
    const order = {
      order: 'x',
    };

    const mockConsoleLog = jest.fn();
    // eslint-disable-next-line no-console
    console.log = mockConsoleLog;

    // Act
    const { container } = render(<CtaComponent data={data} order={order} />);

    // Assert
    expect(screen.getAllByText('HeaderComponent Stub')).toHaveLength(2);

    const firstHeaderComponent = screen.getAllByText('HeaderComponent Stub')[0];
    const firstHrefPattern = RegExp(`^.+/${mockLocale}/${data.Left_Column.link}$`);
    expect(firstHeaderComponent.href).toMatch(firstHrefPattern);

    const secondHeaderComponent = screen.getAllByText('HeaderComponent Stub')[1];
    const secondHrefPattern = RegExp(`^.+/${mockLocale}/${data.Right_Column.link}$`);
    expect(secondHeaderComponent.href).toMatch(secondHrefPattern);

    // Although React Testing Library discourages testing for classes,
    // the classes are kind of the main point of the code under test so
    // I reverted to testing for them.
    expect(container.getElementsByClassName('testClassName').item(0)).toBeInTheDocument();

    // The code should not be emitting a console log in this part of the switch statement,
    // but it is so I'm testing for it. Something else should happen in this case.
    // https://blacksquare.atlassian.net/browse/MAL-642
    // eslint-disable-next-line no-console
    expect(mockConsoleLog).toHaveBeenCalledWith('Unexpected Action');
  });

  test('case 11 renders the correct styles', () => {
    // Arrange
    const order = {
      order: '11',
    };

    // Act
    const { container } = render(<CtaComponent data={data} order={order} />);

    // Assert

    // Although React Testing Library discourages testing for classes,
    // the classes are kind of the main point of the code under test so
    // I reverted to testing for them.
    const pwRow = container.getElementsByClassName('page-width');
    const leftColClasses = pwRow.item(0).children.item(0).classList;
    const rightColClasses = pwRow.item(0).children.item(1).classList;
    const desiredClasses = ['col-xs-12', 'col-md-6', 'mt-0', 'mb-0', 'mb-sm-3'];

    const desiredClassesToAppearOnBothLeftAndRightCols = desiredClasses.every(
      (cls) => leftColClasses.contains(cls) && rightColClasses.contains(cls),
    );
    expect(desiredClassesToAppearOnBothLeftAndRightCols).toBe(true);
  });

  test('case 12 renders the correct styles', () => {
    // Arrange
    const order = {
      order: '12',
    };

    // Act
    const { container } = render(<CtaComponent data={data} order={order} />);

    // Assert

    // Although React Testing Library discourages testing for classes,
    // the classes are kind of the main point of the code under test so
    // I reverted to testing for them.
    const pwRow = container.getElementsByClassName('page-width');
    const leftColClasses = pwRow.item(0).children.item(0).classList;
    const rightColClasses = pwRow.item(0).children.item(1).classList;

    const desiredLeftColClassesAppearOnLeftCol = squareClasses.every(
      (cls) => leftColClasses.contains(cls),
    );
    expect(desiredLeftColClassesAppearOnLeftCol).toBe(true);

    const desiredRightColClassesAppearOnRightCol = rectangleClasses.every(
      (cls) => rightColClasses.contains(cls),
    );
    expect(desiredRightColClassesAppearOnRightCol).toBe(true);
  });

  test('case 21 renders the correct styles', () => {
    // Arrange
    const order = {
      order: '21',
    };

    // Act
    const { container } = render(<CtaComponent data={data} order={order} />);

    // Assert

    // Although React Testing Library discourages testing for classes,
    // the classes are kind of the main point of the code under test so
    // I reverted to testing for them.
    const pwRow = container.getElementsByClassName('page-width');
    const leftColClasses = pwRow.item(0).children.item(0).classList;
    const rightColClasses = pwRow.item(0).children.item(1).classList;

    const desiredLeftColClassesAppearOnLeftCol = rectangleClasses.every(
      (cls) => leftColClasses.contains(cls),
    );
    expect(desiredLeftColClassesAppearOnLeftCol).toBe(true);

    const desiredRightColClassesAppearOnRightCol = squareClasses.every(
      (cls) => rightColClasses.contains(cls),
    );
    expect(desiredRightColClassesAppearOnRightCol).toBe(true);
  });
});
