import React from 'react';
import SEO from '../components/SEO/SEO';

import Banner from '../components/home/Banner.jsx';
import Features from '../components/home/Features.jsx';
import HomeRest from '../components/home/HomeRest.jsx';
import { PageContext } from 'antdsite';

function Home(props: any) {
  return (
    <PageContext.Consumer>
      {(value: any) => {
        const { currentLocaleWebConfig } = value;
        const { title, description, head, lang } = currentLocaleWebConfig as any;

        return (
          <>
            <SEO
              head={head as Array<any>}
              lang={lang}
              title={`${title}`}
              description={description}
            />
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
