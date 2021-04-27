import React from 'react';
import { render, act } from '@testing-library/react';
import CtaSignupComponent from 'malts-theme/src/components/CtaSignupComponent';

jest.useFakeTimers();

const mockLoginWithRedirect = jest.fn();
jest.mock('malts-theme/src/utils/auth0-wrapper', () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    loginWithRedirect: mockLoginWithRedirect,
  }),
}));

// https://stackoverflow.com/a/60862815
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

describe('CtaSignupComponent', () => {
  test('Cta show when not authenticated, has not been viewed, and on the shop page of de-de', () => {
    global.sessionStorage.clear;
    const { queryByRole } = render(<CtaSignupComponent data={{ locale: 'de-de', slug: '/shop' }} />);
    act(() => {
      jest.runAllTimers();
    });
    const dialog = queryByRole('dialog');
    expect(dialog).toBeTruthy();
  });

  test('Cta does not show when in the wrong locale', () => {
    const { queryByRole } = render(<CtaSignupComponent data={{ locale: 'en-gb', slug: '/shop' }} />);
    act(() => {
      jest.runAllTimers();
    });
    const dialog = queryByRole('dialog');
    expect(dialog).toBeFalsy();
  });

  test('Cta does not show when on a non valid page', () => {
    const { queryByRole } = render(<CtaSignupComponent data={{ locale: 'de-de', slug: '/' }} />);
    act(() => {
      jest.runAllTimers();
    });
    const dialog = queryByRole('dialog');
    expect(dialog).toBeFalsy();
  });

  test('Cta does not show when already seen the cta', () => {
    global.sessionStorage.setItem('cta_popup', true);
    const { queryByRole } = render(<CtaSignupComponent data={{ locale: 'de-de', slug: '/shop' }} />);
    act(() => {
      jest.runAllTimers();
    });
    const dialog = queryByRole('dialog');
    expect(dialog).toBeFalsy();
  });

  test('Cta does not show when authenticated', () => {
    global.sessionStorage.clear;
    jest.mock('malts-theme/src/utils/auth0-wrapper', () => ({
      useAuth0: () => ({
        isAuthenticated: true,
        loginWithRedirect: mockLoginWithRedirect,
      }),
    }));
    const { queryByRole } = render(<CtaSignupComponent data={{ locale: 'de-de', slug: '/shop' }} />);
    act(() => {
      jest.runAllTimers();
    });
    const dialog = queryByRole('dialog');
    expect(dialog).toBeFalsy();
  });
});
