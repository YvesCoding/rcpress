import React from 'react';
import SEO from '../SEO/SEO';

import Banner from './Banner';
import Features from './Features';
import HomeRest from './HomeRest';
import { PageContext } from '../layout/PageContext';

function Home(props) {
  return (
    <PageContext.Consumer>
      {value => {
        const { currentLocaleWebConfig } = value;
        const { title, description } = currentLocaleWebConfig;

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
