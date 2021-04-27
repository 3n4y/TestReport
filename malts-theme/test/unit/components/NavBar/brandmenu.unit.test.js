import React from 'react';
import { render, screen } from '@testing-library/react';
import BrandMenu from '../../../../src/components/NavBar/brandMenu';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

const mockStrapiBrands = {
  brands: [
    {
      name: 'Auchroisk',
      category: {
        name: 'Single Malt Whisky',
      },
      regions: [
        {
          name: 'en-gb',
        },
        {
          name: 'en-row',
        },
      ],
      slug: 'auchroisk',
    },
    {
      name: 'Benrinnes',
      category: {
        name: 'Single Malt Whisky',
      },
      regions: [
        {
          name: 'en-gb',
        },
        {
          name: 'en-row',
        },
      ],
      slug: 'benrinnes',
    },
    {
      name: 'Caol Ila',
      category: {
        name: 'Single Malt Whisky',
      },
      regions: [
        {
          name: 'en-gb',
        },
        {
          name: 'en-row',
        },
        {
          name: 'de-de',
        },
      ],
      slug: 'caol-ila',
    },
    {
      name: 'Dalhwinnie',
      category: {
        name: 'Single Malt Whisky',
      },
      regions: [
        {
          name: 'de-de',
        },
        {
          name: 'en-row',
        },
      ],
      slug: 'dahlwinnie',
    },
    {
      name: 'Talisker',
      category: {
        name: 'Blended Scotch Whisky',
      },
      regions: [
        {
          name: 'en-gb',
        },
        {
          name: 'en-row',
        },
        {
          name: 'de-de',
        },
      ],
      slug: 'talisker',
    },
  ],
};

const mockLocale = 'en-gb';
jest.mock('gatsby', () => ({
  useStaticQuery: () => ({
    strapi: mockStrapiBrands,
    site: {
      siteMetadata: {
        locale: mockLocale,
      },
    },
  }),
  graphql: jest.fn(() => 'foo'),
}));

describe('BrandMenu Component', () => {
  test('Brand menu component renders correctly with only brands in the en-gb region', () => {
    // assign

    // act
    render(<BrandMenu />);
    // assert
    expect(screen.getByText('Auchroisk')).toBeInTheDocument();
    expect(screen.getByText('Benrinnes')).toBeInTheDocument();
    expect(screen.getByText('Caol Ila')).toBeInTheDocument();
    expect(screen.queryByText('Dalhwinnie')).not.toBeInTheDocument();
    expect(screen.queryByText('Talisker')).not.toBeInTheDocument();
  });
});
