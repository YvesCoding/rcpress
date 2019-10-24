import React from 'react';
import SEO from '../components/SEO/SEO';

import Banner from '../components/home/Banner.jsx';
import Features from '../components/home/Features.jsx';
import HomeRest from '../components/home/HomeRest.jsx';
import { useSiteContext } from '@rcpress/core';

function Home() {
  const { currentLocaleSiteData } = useSiteContext();
  const {
    title,
    description,
    head,
    lang
  } = currentLocaleSiteData as any;

  return (
    <>
      <SEO
        head={head as Array<any>}
        lang={lang}
        title={`${title}`}
        description={description}
      />
      <div className="home-wrapper">
        <Banner />
        <Features />
        <HomeRest />
      </div>
    </>
  );
}

export default Home;
