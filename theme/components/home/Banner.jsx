import React from 'react';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';
import { Link } from 'gatsby';
import { getCurrentWebConfigBySlug } from '../utils';
function Banner(props) {
  const {
    isMobile,
    pageContext: { webConfig, slug },
    data: {
      mdx: { frontmatter },
    },
  } = props;
  const { currentWebConfig: config } = getCurrentWebConfigBySlug(webConfig, slug);
  const [namespace, repo] = webConfig.themeConfig.repo.split('/');
  return (
    <div className="banner-wrapper">
      <QueueAnim className="banner-title-wrapper" type={isMobile ? 'bottom' : 'right'}>
        <div key="line" className="title-line-wrapper">
          <div className="title-line" style={{ transform: 'translateX(-64px)' }} />
        </div>
        <h1 key="h1">{config.title}</h1>
        <p key="content">{config.description}</p>
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
      </QueueAnim>
    </div>
  );
}

export default Banner;
