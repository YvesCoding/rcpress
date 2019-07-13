import React from 'react';
import DocumentTitle from 'react-document-title';

import Banner from './Banner';
import Features from './Features';
import HomeRest from './HomeRest';
import { PageContext } from '../layout/PageContext';

function Home(props) {
  return (
    <PageContext.Consumer>
      {value => {
        const { currentLocaleWebConfig } = value;

        return (
          <DocumentTitle title={currentLocaleWebConfig.title}>
            <div className="home-wrapper">
              <Banner {...props} {...value} />
              <Features {...props} {...value} />
              <HomeRest {...props} {...value} />
            </div>
          </DocumentTitle>
        );
      }}
    </PageContext.Consumer>
  );
}

export default Home;
