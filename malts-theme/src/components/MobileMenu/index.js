import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '../../utils/auth0-wrapper';
import styles from './mobilemenu-component.module.scss';
import logo from '../../images/malts-logo.svg';
import { RegionalSelector } from '../RegionSelector';
import BrandMenu from '../NavBar/brandMenu';
import BrandHomeMenu from '../NavBar/brandHomeMenu';
import WhiskyGuideMenu from '../NavBar/whiskyGuideMenu';
import { useShopify } from '../../contexts/ShopifyContext';

const menuStyle = {
  bmBurgerButton: {
    position: 'absolute',
    width: '36px',
    height: '100%',
    left: '0px',
    top: '0px',
  },

  bmCrossButton: {
    height: '32px',
    width: '32px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#FFF',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '1em',
  },
  bmItem: {
    display: 'block',
    paddingBottom: '4px',
    position: 'relative',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.75)',
    position: 'fixed',
    top: 0,
  },
};

export const MobileMenu = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(
    () => () => {
      setOpen(false);
    },
    [setOpen],
  );

  const { isAuthenticated } = useAuth0();
  const { t } = useTranslation();
  const { hasShopifyConnection } = useShopify();
  const data = useStaticQuery(graphql`
    query{
        strapi {
            brands(sort: "name:ASC",where: {published: true}) {
                name
                category{
                    name
                }
                slug
                tags
            }
            collections(sort: "name:ASC", where:  {published: true, hide_from_menu: false}) {
                name
                slug
            }
        }
        site {
          siteMetadata {
              title
              locale
          }
      }
    }`);
  const blended = [];
  const other = [];
  const iconic = [];

  data.strapi.brands.forEach((brand) => {
    if (brand.category && brand.category.name === t('Other Whiskey')) {
      other.push(brand);
    } else if (brand.category && brand.category.name === t('Blended Scotch Whisky')) {
      blended.push(brand);
    } else if (brand.tags && brand.tags.indexOf(t('iconic')) !== -1) {
      iconic.push(brand);
    }
  });

  return (
    <>

      <Menu {...props} className={`${styles.mobileMenu} ${props.className}`} styles={menuStyle} isOpen={open}>

        <div className="d-flex flex-row w-100 pt-2 hr-b">
          <img src={logo} alt="Malts.com" style={{ padding: '0px', width: '110px' }} className="mr-auto" />
          <RegionalSelector />
        </div>

        <div>
          <ul>
            <li data-top-index="1">
              <label><a href={`/${data.site.siteMetadata.locale}/`}>{t('Home')}</a></label>
            </li>

            <li data-top-index="2">
              <label htmlFor="mobmenu-shop" className="hasChildren">{t('Shop')}</label>
              <input type="checkbox" id="mobmenu-shop" name="mobmenu-shop" className="mobmenu-checkbox" />
              <div className="mobmenu">
                <ul>
                  <li key={0} data-key={0} className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-shop">{t('Back')}</label></li>
                  <li key={1} data-key={1}><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/${t('shop')}`}>{t('Shop')}</a></label></li>
                  <li key={2} data-key={2}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}`}>{t('All Products')}</a></label></li>
                  <li key={3} data-key={3}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=offers`}>{t('Offers')}</a></label></li>
                  <li key={4} data-key={4} className={`${hasShopifyConnection() ? '' : styles.hidden}`}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${t('gifts')}`}>{t('Whisky Gifts')}</a></label></li>
                  <li key={5} data-key={5}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=new`}>{t('New Products')}</a></label></li>
                  <li key={6} data-key={6}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=rare%20%26%20exceptional`}>{t('Rare & Exceptional')}</a></label></li>
                  {data.site.siteMetadata.locale === 'en-gb'
                    ? <li key={7} data-key={7}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=personalise`}>{t('Personalised Products')}</a></label></li>
                    : ''}
                  <li key={8} data-key={8}>
                    <label htmlFor="mobmenu-iconic" className="hasChildren">{t('Iconic Malts')}</label>
                    <input type="checkbox" id="mobmenu-iconic" name="mobmenu-iconic" className="mobmenu-checkbox" />
                    <div className="mobmenu">
                      <ul>
                        <li data-iconic-index="00" className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-iconic">{t('Back')}</label></li>
                        <li data-iconic-index="01"><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=${t('iconic')}`}>{t('Iconic Malts')}</a></label></li>
                        {iconic ? iconic.map((brand, i) => (
                          <li data-iconic-index={i}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>{brand.name}</a></label></li>
                        )) : ''}
                        <li data-iconic-index="XX" className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>
                      </ul>
                    </div>
                  </li>
                  <li key={9} data-key={9}>
                    <label htmlFor="mobmenu-flavour" className="hasChildren">{t('Flavours')}</label>
                    <input type="checkbox" id="mobmenu-flavour" name="mobmenu-flavour" className="mobmenu-checkbox" />
                    <div className="mobmenu">
                      <ul>
                        <li data-flavor-index="00" className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-flavour">{t('Back')}</label></li>
                        <li data-flavor-index="01"><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/products/?flavour=fruity&flavour=smoky&flavour=spicy&flavour=sweet/`}>{t('Flavour')}</a></label></li>
                        <li data-flavor-index="1"><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=fruity/`}>{t('Fruity')}</a></label></li>
                        <li data-flavor-index="2"><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=smoky/`}>{t('Smoky')}</a></label></li>
                        <li data-flavor-index="3"><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=spicy/`}>{t('Spicy')}</a></label></li>
                        <li data-flavor-index="4"><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=sweet/`}>{t('Sweet')}</a></label></li>
                        <li data-flavor-index="XX" className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>
                      </ul>
                    </div>
                  </li>

                  <li key={10} data-key={10}>
                    <label htmlFor="mobmenu-limited" className="hasChildren">{t('Limited Editions')}</label>
                    <input type="checkbox" id="mobmenu-limited" name="mobmenu-limited" className="mobmenu-checkbox" />
                    <div className="mobmenu">
                      <ul>
                        <li data-limited-index="00" className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-limited">{t('Back')}</label></li>
                        <li data-limited-index="01"><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=limited/`}>{t('Limited Editions')}</a></label></li>
                        {data.strapi.collections ? data.strapi.collections.map((collection, i) => (
                          <li data-limited-index={i}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${t('collections')}/${collection.slug}`}>{collection.name}</a></label></li>
                        )) : ''}
                        <li data-limited-index="XX" className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>
                      </ul>
                    </div>
                  </li>

                  <li key={11} data-key={11}>
                    <label htmlFor="mobmenu-blended" className="hasChildren">{t('Blended Scotch Whisky')}</label>
                    <input type="checkbox" id="mobmenu-blended" name="mobmenu-blended" className="mobmenu-checkbox" />
                    <div className="mobmenu">
                      <ul>
                        <li data-blended-index="00" className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-blended">{t('Back')}</label></li>
                        <li data-blended-index="01"><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=blended`}>{t('Blended Scotch Whiskey')}</a></label></li>
                        {blended ? blended.map((brand, i) => (
                          <li data-blended-index={i}><label><a href={`/${data.site.siteMetadata.locale}/products/${brand.slug.replace(/\s+/g, '-').toLowerCase()}`}>{brand.name}</a></label></li>
                        )) : ''}
                        <li data-blended-index="XX" className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>
                      </ul>
                    </div>
                  </li>

                  <li key={12} data-key={12}>
                    <label htmlFor="mobmenu-world" className="hasChildren">{t('World Whiskey')}</label>
                    <input type="checkbox" id="mobmenu-world" name="mobmenu-world" className="mobmenu-checkbox" />
                    <div className="mobmenu">
                      <ul>
                        <li data-world-index="00" className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-world">{t('Back')}</label></li>
                        <li data-world-index="01"><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=world`}>{t('World Whiskey')}</a></label></li>
                        {other ? other.map((brand, i) => (
                          <li data-world-index={i}><label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>{brand.name}</a></label></li>
                        )) : ''}
                      </ul>
                    </div>
                  </li>
                  <li key={13} data-key={13} className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>
                </ul>
              </div>
            </li>

            <li data-top-index="3">
              <label htmlFor="mobmenu-brands" className="hasChildren">{t('Brands')}</label>
              <input type="checkbox" id="mobmenu-brands" name="mobmenu-brands" className="mobmenu-checkbox" />
              <div className="mobmenu">
                <ul>
                  <li data-brand-index="00" className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-brands">{t('Back')}</label></li>
                  <li data-brand-index="01"><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/${t('brands')}`}>{t('Brands')}</a></label></li>
                  <BrandMenu />
                  <li data-brand-index="XX" className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>
                </ul>
              </div>
            </li>

            <li data-top-index="4">
              <label><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${t('gifts')}`}>{t('Gifts')}</a></label>
            </li>

            <li data-top-index="5">
              <label htmlFor="mobmenu-whiskyguide" className="hasChildren">{t('Whisky Guide')}</label>
              <input type="checkbox" id="mobmenu-whiskyguide" name="mobmenu-whiskyguide" className="mobmenu-checkbox" />
              <div className="mobmenu">
                <ul>
                  <li data-guide-index="00" className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-whiskyguide">{t('Back')}</label></li>
                  <li data-guide-index="01"><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/${t('whisky-guide')}/`}>{t('Whisky Guide')}</a></label></li>
                  <WhiskyGuideMenu />
                  <li data-guide-index="XX" className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>
                </ul>
              </div>
            </li>

            <li data-top-index="6">
              <label htmlFor="mobmenu-tours" className="hasChildren">{t('Tours')}</label>
              <input type="checkbox" id="mobmenu-tours" name="mobmenu-tours" className="mobmenu-checkbox" />
              <div className="mobmenu">
                <ul>
                  <li data-brandhome-index="00" className="back"><label className="mobmenu-toggle" htmlFor="mobmenu-tours">{t('Back')}</label></li>
                  <li data-brandhome-index="01"><label className="font-weight-bold"><a href={`/${data.site.siteMetadata.locale}/${t('tours')}`}>{t('Tours')}</a></label></li>
                  <BrandHomeMenu />
                  <li data-brandhome-index="XX" className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>
                </ul>
              </div>
            </li>

            <div className="hr-tb d-none">
              {isAuthenticated
                ? (
                  <>
                    <li data-top-noauth-index="1"><label className="accountlink"><a href={`/${data.site.siteMetadata.locale}/user/account`} className={`${styles.menuLink}`}>{t('My Account')}</a></label></li>
                    <li data-top-noauth-index="2"><label className="accountlink"><a href={`/${data.site.siteMetadata.locale}/user/logout`} className={`${styles.menuLink}`}>{t('Logout')}</a></label></li>
                  </>
                )
                : <li data-top-auth-index="1"><label className="accountlink"><a href={`/${data.site.siteMetadata.locale}/user/login`} className={`${styles.menuLink}`}>{t('Sign In')}</a></label></li>}
            </div>

            <li data-top-noauth-index="xx" className="hr-t"><label><a href={`/${data.site.siteMetadata.locale}/faq`}>{t('Order Support')}</a></label></li>

          </ul>
        </div>

      </Menu>

    </>
  );
};
