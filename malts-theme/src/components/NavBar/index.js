import React, { useState } from 'react';
import { matchPath } from 'react-router-dom';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { ReactSVG } from 'react-svg';
import logo from '../../images/malts-logo.svg';
import logoMobile from '../../images/malts-mobile-logo.svg';
import styles from './navbar-component.module.scss';
import ShopMenu from './shopMenu';
import BrandMenu from './brandMenu';
import BrandHomeMenu from './brandHomeMenu';
import WhiskyGuideMenu from './whiskyGuideMenu';
import HoverControlledDropdown from './dropDownMenu';
import Cart from '../Cart';
import AnnounceBarComponent from '../AnnounceBarComponent';
import { MobileMenu } from '../MobileMenu';
import { RegionalSelector } from '../RegionSelector';
import SearchComponent from '../SearchComponent';
import LoginControl from './loginControl';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

const FullWidthMenu = React.forwardRef(
  ({
    children, style, className, 'aria-labelledby': labeledBy,
  }, ref) => (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      {children}
    </div>
  ),
);

const CustomNavbar = ({ pageName }) => {
  const { t } = useTranslation();
  const [searchVisible, setSearchVisible] = useState(false);
  return (
    <div className={`${styles.siteHeader}`}>
      <Navbar
        sticky="top"
        variant="light"
        expand="lg"
        className={`${styles.siteNavbar}`}
      >
        <div className="d-lg-none">
          <MobileMenu />
        </div>

        <Navbar.Brand
          className="mr-auto ml-auto d-none d-lg-block"
        >
          <Link to="/" className="d-block h-100">
            <ReactSVG
              className={`${styles.logodesktop}`}
              src={logo}
              alt="Malts.com"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Brand className="mr-auto ml-auto b-block d-lg-none">
          <Link to="/" className="d-block">
            <img
              src={logoMobile}
              alt="Malts.com"
              className={`${styles.logomobile}`}
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Collapse>
          <Nav
            className="ml-auto mr-auto"
            activeKey={pageName}
          >
            <Nav.Item>
              <Link
                to="/"
                activeClassName="active"
                className={`${styles.menuLink} nav-link`}
              >
                {t('Home')}
              </Link>
            </Nav.Item>

            <HoverControlledDropdown className="d-none d-lg-block">
              <Dropdown.Toggle as={CustomToggle}>
                <Link
                  to={`/${t('shop')}`}
                  getProps={({
                    isPartiallyCurrent,
                    location: { pathname },
                  }) => {
                    const isActive = !matchPath(pathname, {
                      path: `*/${t('products')}/${t('gifts')}`,
                      exact: true,
                    })
                      && (isPartiallyCurrent
                        || Boolean(
                          matchPath(pathname, {
                            path: `*/${t('products')}`,
                          }),
                        ));
                    return {
                      className: `${styles.menuLink} ${isActive ? 'active' : ''
                      } nav-link`,
                    };
                  }}
                >
                  {t('Shop')}
                </Link>
              </Dropdown.Toggle>
              <Dropdown.Menu
                as={FullWidthMenu}
                className={styles.fullWidthMenu}
              >
                <ShopMenu />
              </Dropdown.Menu>
            </HoverControlledDropdown>

            <HoverControlledDropdown className="d-none d-lg-block">
              <Dropdown.Toggle as={CustomToggle}>
                <Link
                  to={`/${t('brands')}`}
                  partiallyActive
                  activeClassName="active"
                  id="parentBrand"
                  className={`${styles.menuLink} nav-link`}
                >
                  {t('Brands')}
                </Link>
              </Dropdown.Toggle>
              <Dropdown.Menu
                as={FullWidthMenu}
                className={styles.fullWidthMenu}
              >
                <BrandMenu />
              </Dropdown.Menu>
            </HoverControlledDropdown>

            <Nav.Item>
              <Link
                to={`${t('products')}/${t('gifts')}`}
                activeClassName="active"
                className={`${styles.menuLink} nav-link ${styles.giftsMenu}`}
              >
                {t('Gifts')}
              </Link>
            </Nav.Item>

            <HoverControlledDropdown className="d-none d-lg-block">
              <Dropdown.Toggle as={CustomToggle}>
                <Link
                  to={`/${t('whisky-guide')}`}
                  id="whiskyGuideNavLink"
                  getProps={({
                    location: { pathname },
                  }) => {
                    const isActive = matchPath(pathname, {
                      path: `*/${t('whisky-guide')}`,
                    });
                    return {
                      className: `${styles.menuLink} ${isActive ? 'active' : ''
                      } nav-link`,
                    };
                  }}
                >
                  {t('Whisky Guide')}
                </Link>
              </Dropdown.Toggle>
              <Dropdown.Menu
                as={FullWidthMenu}
                className={styles.fullWidthMenu}
              >
                <WhiskyGuideMenu />
              </Dropdown.Menu>
            </HoverControlledDropdown>

            <HoverControlledDropdown className="d-none d-lg-block">
              <Dropdown.Toggle as={CustomToggle}>
                <Link
                  to={`/${t('tours')}`}
                  getProps={({
                    isPartiallyCurrent,
                    location: { pathname },
                  }) => {
                    const isActive = isPartiallyCurrent
                      || Boolean(
                        matchPath(pathname, {
                          path: `*/${t('distilleries')}`,
                        }),
                      );
                    return {
                      className: `${styles.menuLink} ${isActive ? 'active' : ''
                      } nav-link`,
                    };
                  }}
                >
                  {t('Tours')}
                </Link>
              </Dropdown.Toggle>
              <Dropdown.Menu
                as={FullWidthMenu}
                className={styles.fullWidthMenu}
              >
                <BrandHomeMenu />
              </Dropdown.Menu>
            </HoverControlledDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav className={`${styles.toolBar}`}>
          <div
            onClick={() => {
              setSearchVisible(!searchVisible);
            }}
            style={{ fontSize: '20px' }}
          >
            <AiOutlineSearch className={styles.icon} />
            |
          </div>

          <div className="d-none d-lg-block">
            <RegionalSelector />
          </div>

          <div className="d-block">
            <LoginControl />
          </div>
          <Cart />
        </Nav>
      </Navbar>
      <SearchComponent visible={searchVisible} />
      <AnnounceBarComponent />
    </div>
  );
};

export default CustomNavbar;
