import { graphql, Link, navigate } from 'gatsby';
import React, {
  useReducer, useState, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion, Container, Row, Col, Form, Button, InputGroup, FormControl, Dropdown,
} from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { withTrans } from 'malts-theme/src/components/i18n/withTrans';
import Layout from 'malts-theme/src/components/layout';
import ProductGridComponent from 'malts-theme/src/components/ProductGridComponent';
import BrandHeader from 'malts-theme/src/components/BrandHeader';
import BreadCrumbComponent from 'malts-theme/src/components/BreadCrumbComponent';
import styles from './brand-collection.module.scss';

require('malts-theme/src/utils/fragments');

const ProductsByCollectionPage = ({ data }) => {
  const [sort, setSort] = useState('Popular');

  function applyFilters(state) {
    let products = state.masterProducts;

    if (sort) {
      switch (sort) {
        case 'A-Z':
          products = products.sort((a, b) => (a.title.trim() > b.title.trim() ? 1 : -1));
          break;
        case 'Z-A':
          products = products.sort((a, b) => (a.title.trim() > b.title.trim() ? 1 : -1)).reverse();
          break;
          // Add Offers, Prices
        case 'Popular':
        default:
          products = products.sort((a, b) => (a.feature_weight < b.feature_weight ? 1 : -1));
          break;
      }
    }

    return products;
  }

  const initialState = {
    masterProducts: data.strapi.collection.products,
    page: 1,
    pageSize: 20,
  };
  initialState.products = applyFilters(initialState);

  const filters = (state, action) => {
    let newState;
    switch (action.type) {
      case 'update':
        return { ...state, products: applyFilters(state) };
      case 'clear_filters':
        return { ...state, query: '', products: state.masterProducts };
      case 'search':
        newState = { ...state, query: action.query };
        return { ...newState, products: applyFilters(newState) };
      default:
        console.log('Unexpected Action');
    }
  };

  const [state, dispatch] = useReducer(filters, initialState);

  const [viewFilters, setViewFilters] = useState(true);

  function clearFilters() {
    dispatch({ type: 'clear_filters' });
  }

  useEffect(() => {
    setViewFilters(window.innerWidth >= 768);

    clearFilters();
  }, []);

  const { t } = useTranslation();

  const allBrands = data.strapi.brands;
  const iconicBrands = data.strapi.brands.filter((brand) => brand.tags.indexOf('iconic') !== -1);
  const blendedBrands = data.strapi.brands.filter((brand) => brand.category && brand.category.name === t('Blended Scotch Whisky'));
  const otherBrands = data.strapi.brands.filter((brand) => brand.category && brand.category.name === t('Other Whiskey'));

  function searchByName(name) {
    navigate(`products?q=${name}`);
  }

  function sortProducts(type) {
    setSort(type);
    dispatch({ type: 'update' });
  }

  const { collection } = data.strapi;

  const breadcrumbLinks = {};
  breadcrumbLinks[`${t('Home')}`] = '/';
  breadcrumbLinks[`${t('Shop')}`] = `/${t('products')}`;

  return (
    <Layout pageName="Shop Malts">
      {/* Mobile Apply Filter */}
      {viewFilters && (
        <div className={styles.mobileApplyFilter}>
          <Button onClick={() => { setViewFilters(false); }}>{t('Apply Filters')}</Button>
        </div>
      )}
      <BrandHeader collection={collection} />
      <BreadCrumbComponent links={breadcrumbLinks} current={collection.name} />
      <div className="shopTexture productsByCollection">
        <Container fluid className="text-center px-0 page-width">
          <Row className={styles.productResultsContainer}>
            {state.products.length}
            {' '}
            {state.products.length > 1 ? t('Products') : t('Product')}
          </Row>
          <Row className={`${styles.mobileBarContainer}`}>
            <div>
              <Button variant="link" className={`${styles.filtericon}`} onClick={() => { setViewFilters(!viewFilters); }}>
                {!viewFilters ? t('Show Filters') : t('Hide Filters')}
              </Button>
            </div>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-sort" size="sm">
                {t('Sort')}
                {' '}
                {sort ? t(sort) : t('By')}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortProducts('A-Z')}>A-Z</Dropdown.Item>
                <Dropdown.Item onClick={() => sortProducts('Z-A')}>Z-A</Dropdown.Item>
                <Dropdown.Item onClick={() => sortProducts('Popular')}>{t('Popular')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          <hr className="d-md-none" />
          <Row>
            <Col sm="10" md="3" className={`${styles.filterContainer} ${viewFilters ? 'd-block' : 'd-none'}`}>
              <InputGroup className={styles.searchInput}>
                <FormControl
                  placeholder={t('Search')}
                  aria-label="Search"
                  className={`${styles.searchfield}`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      searchByName(e.target.value);
                    }
                  }}
                />
                <InputGroup.Append>
                  <InputGroup.Text
                    className={styles.searchButton}
                    onClick={(e) => searchByName(e.target.value)}
                  >
                    <AiOutlineSearch />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>

              <Row className={styles.linkContainer}>
                <Link to={`${t('products')}`} className={`${styles.filterBoldText}`}>
                  {t('All Products')}
                </Link>
              </Row>

              <Row className={styles.linkContainer}>
                <Link to={`${t('products')}/?tag=${t('offers')}`} className={`${styles.filterBoldText}`}>
                  {t('Offers')}
                </Link>
              </Row>

              <Row className={styles.linkContainer}>
                <Link to={`${t('products')}/?tag=gifts`} className={`${styles.filterBoldText}`}>
                  {t('Whisky Gifts')}
                </Link>
              </Row>

              <Row className={styles.linkContainer}>
                <Link to={`${t('products')}/?tag=new`} className={`${styles.filterBoldText}`}>
                  {t('New Products')}
                </Link>
              </Row>

              <Row className={styles.linkContainer}>
                <Link to={`${t('products')}/?tag=rare%20%26%20exceptional`} className={`${styles.filterBoldText}`}>
                  {t('Rare and Exceptional')}
                </Link>
              </Row>

              <Row className={styles.linkContainer}>
                <Link to={`${t('products')}/?tag=personalise`} className={`${styles.filterBoldText}`}>
                  {t('Personalised Products')}
                </Link>
              </Row>

              <hr />
              <Accordion defaultActiveKey="shop_iconic" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <Accordion.Collapse eventKey="shop_iconic">
                  <div>
                    { iconicBrands.map((brand) => (
                      <Row className={styles.linkContainer}>
                        <Link to={`${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>
                          { brand.name }
                        </Link>
                      </Row>
                    ))}
                  </div>
                </Accordion.Collapse>
                <Accordion.Toggle as={Button} variant="link" eventKey="shop_iconic" className={`${styles.arrow}`}>
                  {t('Iconic Malts')}
                </Accordion.Toggle>
              </Accordion>
              <hr />

              <Accordion defaultActiveKey="shop_limited" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <Accordion.Collapse eventKey="shop_limited">
                  <div>
                    { data.strapi.collections ? data.strapi.collections.map((cllctn) => (
                      <Row className={styles.linkContainer}>
                        <Link to={`${t('products')}/${cllctn.slug}`}>
                          { cllctn.name }
                        </Link>
                      </Row>
                    )) : null}
                  </div>
                </Accordion.Collapse>
                <Accordion.Toggle as={Button} variant="link" className={`${styles.arrow} `} eventKey="shop_limited">
                  {t('Limited Editions')}
                </Accordion.Toggle>
              </Accordion>

              <hr />
              <Form.Group>
                <Accordion defaultActiveKey="shop_blended" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  <Accordion.Collapse eventKey="shop_blended">
                    <div>
                      { blendedBrands.map((brand) => (
                        <Row className={styles.linkContainer}>
                          <Link to={`${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>
                            { brand.name }
                          </Link>
                        </Row>
                      ))}
                    </div>
                  </Accordion.Collapse>
                  <Accordion.Toggle as={Button} variant="link" eventKey="shop_blended" className={`${styles.arrow}`}>
                    {t('Blended Scotch Whisky')}
                  </Accordion.Toggle>
                </Accordion>
              </Form.Group>

              <hr />
              <Form.Group>
                <Accordion defaultActiveKey="shop_other" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  <Accordion.Collapse eventKey="shop_other">
                    <div>
                      { otherBrands.map((brand) => (
                        <Row className={styles.linkContainer}>
                          <Link to={`${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>
                            { brand.name }
                          </Link>
                        </Row>
                      ))}
                    </div>
                  </Accordion.Collapse>
                  <Accordion.Toggle as={Button} variant="link" eventKey="shop_other" className={`${styles.arrow}`}>
                    {t('World Whiskey')}
                  </Accordion.Toggle>
                </Accordion>
              </Form.Group>

              <hr />
              <Form.Group>
                <Accordion defaultActiveKey="shop_all_brands" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  <Accordion.Collapse eventKey="shop_all_brands">
                    <div>
                      { allBrands.sort().slice(0, 5).map((brand) => (
                        <Row className={styles.linkContainer}>
                          <Link to={`${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>
                            { brand.name }
                          </Link>
                        </Row>
                      ))}
                      <Accordion>
                        <Accordion.Collapse eventKey="shop_all_brands_more">
                          <div>
                            { allBrands.slice(6).map((brand) => (
                              <Row className={styles.linkContainer}>
                                <Link to={`${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>
                                  { brand.name }
                                </Link>
                              </Row>
                            ))}
                          </div>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Button} variant="link" eventKey="shop_all_brands_more">
                          <span className="show_more">
                            +
                            {t('MORE')}
                          </span>
                          <span className="show_less">
                            -
                            {t('LESS')}
                          </span>
                        </Accordion.Toggle>
                      </Accordion>
                    </div>
                  </Accordion.Collapse>
                  <Accordion.Toggle as={Button} variant="link" eventKey="shop_all_brands" className={`${styles.arrow} `}>
                    {t('Shop By Brand')}
                  </Accordion.Toggle>
                </Accordion>
              </Form.Group>
              <hr />
            </Col>
            <Col id="storefront">
              <ProductGridComponent
                lgColumnCount={4}
                data={{ products: state.products }}
                pageName={collection.name}
              />
              {state.products.length === 0
                ? (
                  <span>
                    {t('No Results Available')}
                    .
                    {' '}
                    <a href={`/${data.site.siteMetadata.locale}/${t('products')}`} onClick={() => { clearFilters(); }} style={{ color: '#EC8459' }}>{t('View All Products')}</a>
                  </span>
                )
                : null}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default withTrans(ProductsByCollectionPage);

export const pageQuery = graphql`
query getAllProductsForCollection($id: ID!, $locale: String) {
    site {
        siteMetadata {
          title
          locale
        }
      }
    strapi {
        collection(id: $id) {
            id
            name
            content {
                ... HeaderComponent
            }
            products (where: {regions: {name_contains: $locale}, published: "true"}) {
                id
                media {
                  ... SmallFixedImage
                }
                slug
                title
                shopify_slug
                tags
                brand {
                    name
                }
                detail_description
                category{
                    name
                }
                feature_weight
            }
          }
        brands(sort: "name:ASC",where:  {published: true}) {
            name
            category{
                name
            }
            slug
            tags
        }
        collections(where:  {published: "true", hide_from_menu: "false"}) {
            name
            slug
        }
    }
}`;
