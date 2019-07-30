import React from 'react';
import SEO from '../components/SEO/SEO';

import Banner from '../components/home/Banner.jsx';
import Features from '../components/home/Features.jsx';
import HomeRest from '../components/home/HomeRest.jsx';
import { PageContext } from 'antdsite/src/templates/PageContext';

function Home(props: any) {
  return (
    <PageContext.Consumer>
      {value => {
        const { currentLocaleWebConfig } = value;
        const { title, description } = currentLocaleWebConfig as any;

        return (
          <>
            <SEO title={`${title}`} description={description} />
            <div className="home-wrapper">
              <Banner {...props} {...value} />
              <Features {...props} {...value} />
              <HomeRest {...props} {...value} />
            </div>
          </>
        );
      }}
    </PageContext.Consumer>
  );
}

export default Home;
