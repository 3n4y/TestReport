/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ seo }) {
  const { site, strapi, placeholder } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            locale
            siteUrl
          }
        }
        strapi{
          regions{
            name
          }
        }
        placeholder: file(name: { eq: "default_og_image" }) {
          childImageSharp {
              fixed(width: 1200, quality: 100) {
                  aspectRatio
                  ...GatsbyImageSharpFixed
              }
          }
      }
      }
    `,
  );

  seo = seo || {};

  const { locale } = site.siteMetadata;
  const metaDescription = seo.og_description || site.siteMetadata.description;

  const metaTitle = seo.og_title;

  if (metaTitle && metaTitle === '') {
    metaTitle = site.siteMetadata.title;
  }

  const metaType = seo.og_type || 'website';

  const metaImage = seo.og_image ? seo.og_image.imageFile.childImageSharp.fluid.src : placeholder.childImageSharp.fixed.src;

  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  const hreflangs = strapi.regions.filter((region) => region.name !== site.siteMetadata.locale).map((region) => {
    const regionName = region.name === 'en-row' ? 'x-default' : region.name;
    const newUrl = path.replace(locale, region.name);
    return { rel: 'alternative', hreflang: regionName, href: `${site.siteMetadata.siteUrl}${newUrl}` };
  });

  hreflangs.push({ rel: 'canonical', href: `${site.siteMetadata.siteUrl}${path}` });

  if (seo.structured_data && seo.structured_data.image && !seo.structured_data.image.startsWith('http')) {
    seo.structured_data.image = `${site.siteMetadata.siteUrl}${metaImage}`;
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: locale,
      }}
      title={metaTitle}
      link={hreflangs}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: metaType,
        },
        {
          property: 'og:url',
          content: `${site.siteMetadata.siteUrl}${path}`,
        },
        {
          property: 'og:image',
          content: `${site.siteMetadata.siteUrl}${metaImage}`,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]}
    >
      { seo.structured_data
        && (
        <script type="application/ld+json">
          {`${JSON.stringify(seo.structured_data)}`}
        </script>
        )}
    </Helmet>
  );
}

export default SEO;
