import React from 'react';
import GitHubButton from 'react-github-button';
import { Button } from 'antd';
import { Link } from 'gatsby';

function Banner(props) {
  const {
    isMobile,
    data: {
      mdx: { frontmatter },
    },
    currentLocaleWebConfig,
  } = props;

  const [namespace, repo] = currentLocaleWebConfig.themeConfig.repo.split('/');
  return (
    <div className="banner-wrapper">
      {frontmatter.heroImage && (
        <div className="banner-logo">
          <img src={frontmatter.heroImage} alt="Hero" />
        </div>
      )}
      <div className="banner-title-wrapper">
        <h1 key="h1">{currentLocaleWebConfig.title}</h1>
        <p key="content">{currentLocaleWebConfig.description}</p>
        <div key="button" className="button-wrapper">
          <Link to={frontmatter.actionLink}>
            <Button style={{ margin: '0 16px' }} type="primary" ghost>
              {frontmatter.actionText}
            </Button>
          </Link>
          {frontmatter.showStar ? (
            <GitHubButton key="github-button" type="stargazers" namespace={namespace} repo={repo} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Banner;
