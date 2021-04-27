import React from 'react';
import { useAuth0 } from '../../utils/auth0-wrapper';
import HeaderComponent from '../HeaderComponent';
import ProductGridComponent from '../ProductGridComponent';
import TitleComponent from '../TitleComponent';
import ImageTileGridComponent from '../ImageTileGridComponent';
import CtaComponent from '../CtaComponent';
import HeroSliderComponent from '../HeroSliderComponent';
import TextBlockComponent from '../TextBlockComponent';
import TextTileComponent from '../TextTileComponent';
import FilterableProductSliderComponent from '../FilterableProductSliderComponent';
import MenuLinkComponent from '../MenuLinkComponent';
import VideoComponent from '../VideoComponent';
import GoogleMapsComponent from '../GoogleMapsComponent';

const DynamicContent = ({ components, slug, pageName }) => {
  const { isAuthenticated } = useAuth0();

  return components.map((component, index) => {
    /*
        I'm not proud of this. It's to hide the join us on the main page for logged in users
        */
    if (component.id === '186' && isAuthenticated) {
      return null;
    }
    if (component.id === '61' && isAuthenticated) {
      return null;
    }

    switch (component.__typename) {
      case 'Strapi_ComponentContentHeader':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <HeaderComponent data={component} position={slug} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentProductGrid':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <ProductGridComponent data={component} pageName={pageName} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentTitle':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <TitleComponent data={component} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentImageTileGrid':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <ImageTileGridComponent data={component} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentCta11':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <CtaComponent data={component} order={{ order: '11' }} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentCta12':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <CtaComponent data={component} order={{ order: '12' }} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentCta21':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <CtaComponent data={component} order={{ order: '21' }} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentHeroSlider':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <HeroSliderComponent data={component} slug={slug} />
          </ComponentWrapper>
        );

      case 'Strapi_ComponentContentFilterableProductSlider':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <FilterableProductSliderComponent data={component} pageName={pageName} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentTextBlock':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <TextBlockComponent data={component} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentTextTile':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <TextTileComponent data={component} />
          </ComponentWrapper>
        );

      case 'Strapi_ComponentContentMenuLinkBar':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <MenuLinkComponent data={component} />
          </ComponentWrapper>
        );

      case 'Strapi_ComponentContentVideoComponent':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <VideoComponent data={component} />
          </ComponentWrapper>
        );
      case 'Strapi_ComponentContentGoogleMapsEmbed':
        return (
          <ComponentWrapper anchor={index} key={component.id} component={component}>
            <GoogleMapsComponent data={component} />
          </ComponentWrapper>
        );

      default:
        return 'Unknown Element';
    }
  });
};

const ComponentWrapper = ({ component, children, anchor }) => (
  <>
    <section className={`section-${anchor}`}>
      <a name={`section-${anchor}`} className="section-anchor" />
      {children}
    </section>
  </>
);

export default DynamicContent;
