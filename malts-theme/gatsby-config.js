require('dotenv').config({
  path: `../.env.${process.env.NODE_ENV}`,
});

module.exports = {

  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        // Supress build warnings for unsupported image types
        // https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/#configuration-options
        checkSupportedExtensions: false,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Malts.com',
        short_name: 'Malts.com',
        description: 'The Home of Scotch Whisky',
        lang: 'en-gb',
        display: 'standalone',
        icon: '../malts-theme/src/images/icon.png',
        start_url: '/en-gb/',
        background_color: '#663399',
        theme_color: '#fff',
        localize: [
          {
            start_url: '/de-de/',
            lang: 'de-de',
            name: 'Malts.com',
            short_name: 'Malts.com',
            description: 'Translate',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Muli:400,600,700,900'],
        },
      },
    },
    // `gatsby-plugin-offline`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    //
  ],
};
