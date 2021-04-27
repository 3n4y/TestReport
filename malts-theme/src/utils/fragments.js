import { graphql } from 'gatsby';

export const SmallFluidImage = graphql`
  fragment SmallFluidImage on Strapi_UploadFile{
        alternativeText
        caption
        ext
        width
        url
        height
        imageFile{
            childImageSharp {
                fluid(maxHeight: 270, quality: 85) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
            publicURL
        }
    }`;

export const SmallFixedImage = graphql`
    fragment SmallFixedImage on Strapi_UploadFile{
          alternativeText
          caption
          ext
          width
          url
          height
          imageFile{
              childImageSharp {
                  fixed(width: 230, quality: 85) {
                      ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
              }
              publicURL
          }
    }`;

export const ThumbnailFixedImage = graphql`
    fragment ThumbnailFixedImage on Strapi_UploadFile{
          alternativeText
          caption
          ext
          width
          url
          height
          imageFile{
              childImageSharp {
                  fixed(width: 150, quality: 85) {
                      ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
              }
              publicURL
          }
    }`;

export const FullFluidImage = graphql`
    fragment FullFluidImage on Strapi_UploadFile{
          alternativeText
          caption
          ext
          width
          url
          height
          imageFile{
              childImageSharp {
                  fluid(maxWidth: 1440, quality: 85) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      src
                  }
              }
              publicURL
          }
    }`;

export const MediumFluidImage = graphql`
    fragment MediumFluidImage on Strapi_UploadFile{
          alternativeText
          caption
          ext
          width
          url
          height
          imageFile{
              childImageSharp {
                  fluid(maxWidth: 600, quality: 85) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      src
                  }
              }
              publicURL
          }
    }`;

export const SeoComponent = graphql`
  fragment SeoComponent on Strapi_ComponentSettingsSeo{
      id
      og_description
      og_title
      og_type
      og_image {
          ... SmallFluidImage
      }
      structured_data
  }`;

export const HeaderComponent = graphql`
  fragment HeaderComponent on Strapi_ComponentContentHeader {
    id
    title
    subtitle
    link
    link_text
    className
    header_image {
      ... SmallFluidImage
    }
    background_image {
      ... FullFluidImage
    }
    alt_mobile_background_image {
      ... FullFluidImage
    }
  }`;

export const TitleComponent = graphql`
  fragment TitleComponent on Strapi_ComponentContentTitle {
    id
    Title
    Subtitle
    className
  }`;

export const ImageTileGridComponent = graphql`
  fragment ImageTileGridComponent on Strapi_ComponentContentImageTileGrid {
    id
    className
    format
    column_count
    mobile_column_count
    image_tiles {
        id
        image {
          ... MediumFluidImage
        }
        text
        link
        link_text
        text_placement
        square_image
    }
  }`;

export const ProductGridComponent = graphql`
    fragment ProductGridComponent on Strapi_ComponentContentProductGrid {
      id
      products {
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
    }`;

export const Cta12Component = graphql`
    fragment Cta12Component on Strapi_ComponentContentCta12 {
      id
      Left_Column{
        ... HeaderComponent
      }
      Right_Column{
        ... HeaderComponent
      }
    }`;

export const Cta21Component = graphql`
    fragment Cta21Component on Strapi_ComponentContentCta21 {
      id
      Left_Column{
        ... HeaderComponent
      }
      Right_Column{
        ... HeaderComponent
      }
    }`;

export const Cta11Component = graphql`
    fragment Cta11Component on Strapi_ComponentContentCta11 {
      id
      Left_Column{
        ... HeaderComponent
      }
      Right_Column{
        ... HeaderComponent
      }
    }`;

export const HeroSliderComponent = graphql`
      fragment HeroSliderComponent on Strapi_ComponentContentHeroSlider {
        id
        orientation
        slides{
            ... HeaderComponent
        }
      }`;

export const FilterableProductSliderComponent = graphql`
      fragment FilterableProductSliderComponent on Strapi_ComponentContentFilterableProductSlider {
        id
        categories
        slides{
            category
            product{
              id
              media(limit: 1) {
                ... SmallFixedImage
              }
              title
              slug
              shopify_slug
              category{
                name
              }
            }
        }
      }`;

export const TextBlockComponent = graphql`
  fragment TextBlockComponent on Strapi_ComponentContentTextBlock {
    id
    title
    published
    text
  }`;

export const TextTileComponent = graphql`
  fragment TextTileComponent on Strapi_ComponentContentTextTile {
    id
    title
    published
    description
    link
    link_text
    image_placement
    title_image {
      ... SmallFixedImage
    }
    image {
      ... MediumFluidImage
    }
    background_image {
      ... MediumFluidImage
    }
    video_url
    className
    google_maps_embed
  }`;

export const VideoComponent = graphql`
  fragment VideoComponent on Strapi_ComponentContentVideoComponent {
    id
    video_url
    title_block{
      ... TitleComponent
    }
  }`;

export const MenuLinkComponent = graphql`
  fragment MenuLinkComponent on Strapi_ComponentContentMenuLinkBar {
    id
    navigation
    className
    links{
      text
      url
      target
      className
      order
      variant
    }
  }`;

export const GoogleMapsComponent = graphql`
  fragment GoogleMapsComponent on Strapi_ComponentContentGoogleMapsEmbed {
    id
    embed
  }`;
