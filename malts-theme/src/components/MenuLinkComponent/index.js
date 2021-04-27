import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import styles from './menulink-component.module.scss';

const MenuLinkOption = ({ data, link }) => {
  const locale = useStaticQuery(graphql`
  query{

      site {
          siteMetadata {
              title
              locale
          }
      }
  }`);

  switch (link.variant) {
    case 'Link':
      return (
        <>
          {link.target === '_blank' ? (
            <a
              className={`brand-nav-link ${styles.navLink} ${link.className}`}
              href={`${data.site.siteMetadata.locale}${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ) : (
            <a
              href={`/${locale.site.siteMetadata.locale}/${link.url}`}
              className={`brand-nav-link ${styles.navLink}  ${link.className} m-auto`}
            >
              {link.text}
            </a>
          )}
        </>
      );
    case 'Button':
      return (
        <>
          {link.target === '_blank' ? (
            <a
              className={`brand-nav-link btn btn-primary ${link.className}`}
              href={`${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ) : (
            <a
              href={`/${locale.site.siteMetadata.locale}/${link.url}`}
              className={`brand-nav-link btn btn-primary m-auto ${link.className}`}
            >
              {link.text}
            </a>
          )}
        </>
      );
    case 'Text':
    default:
      return <span className="brand-nav-link m-auto">{link.text}</span>;
  }
};

const MenuLinkComponent = ({ data }) => {
  const links = data.links
    ? data.links.sort((a, b) => (a.order > b.order ? 1 : -1))
    : [];

  return (
    <Container
      className={`componentWrapper ${data.className} menulinkcomponent`}
    >
      <Container
        fluid
        className={`py-2 brand-nav ${styles.navBar} ${data.className} d-flex align-items-center justify-content-center`}
      >
        <Nav className={`m-auto ${styles.navContainer}`}>
          {data.navigation
            ? Object.keys(data.navigation).map((key) => (
              <a
                href={`/${data.site.siteMetadata.locale}/${data.navigation[key]}`}
                className={`brand-nav-link ${styles.navLink}`}
              >
                {key}
              </a>
            ))
            : null}

          {links.map((link) => (
            <MenuLinkOption link={link} data={data} />
          ))}
        </Nav>
      </Container>
    </Container>
  );
};

export default MenuLinkComponent;
