import React from 'react';
import GitHubButton from 'react-github-button-fix-iebug';
import { Button } from 'antd';
import Link from '../MyLink';
import { PageContext } from '@app';
import * as utils from '../utils';

function Banner(props) {
  return (
    <PageContext.Consumer>
      {context => {
        const {
          currentPageInfo: { frontmatter },
          currentLocaleSiteData
        } = context;
        const repoAddr = currentLocaleSiteData.themeConfig.repo;
        const [namespace, repo] = repoAddr ? repoAddr.split('/') : [null, null];

        return (
          <div className="banner-wrapper">
            {(frontmatter.heroImage || currentLocaleSiteData.logo) && (
              <div className="banner-logo">
                <img
                  src={utils.resolvePathWithBase(
                    frontmatter.heroImage || currentLocaleSiteData.logo,
                    currentLocaleSiteData.base
                  )}
                  alt="Hero"
                />
              </div>
            )}
            <div className="banner-title-wrapper">
              <h1 key="h1">{currentLocaleSiteData.title}</h1>
              <p key="content">{currentLocaleSiteData.description}</p>
              <div key="button" className="button-wrapper">
                <Link to={frontmatter.actionLink}>
                  <Button style={{ margin: '0 16px' }} type="primary" ghost>
                    {frontmatter.actionText}
                  </Button>
                </Link>
                {frontmatter.showStar && repo && namespace ? (
                  <GitHubButton
                    key="github-button"
                    type="stargazers"
                    namespace={namespace}
                    repo={repo}
                  />
                ) : null}
              </div>
            </div>
          </div>
        );
      }}
    </PageContext.Consumer>
  );
}

export default Banner;
