import React from 'react';
import DocumentTitle from 'react-document-title';

import Banner from './Banner';
import Features from './Features';
import HomeRest from './HomeRest';

function Home(props) {
  return (
    <DocumentTitle title="Magic Scroll">
      <div className="home-wrapper">
        <Banner {...props} />
        <Features {...props} />
        <HomeRest {...props} />
      </div>
    </DocumentTitle>
  );
}

export default Home;
