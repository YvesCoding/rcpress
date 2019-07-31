import React from 'react';
import { Anchor } from 'antd';
import EditButton from './EditButton';
import { OneToc } from '../../../templates';
import moment from 'moment';
import AvatarList from './AvatarList';
import { PageContext } from 'antdsite';
import SEO from '../SEO/SEO';
import MDXRenderer from 'gatsby-mdx-fix/mdx-renderer';

const Link = Anchor.Link;

interface ArticleProps {
  currentPageTitle: string;
}

export default class Article extends React.PureComponent<ArticleProps> {
  static contextType = PageContext;

  node: HTMLElement | null | undefined;

  getTocs = (toc: OneToc): any => {
    return (
      <Link key={toc.url} href={toc.url} title={toc.title}>
        {toc.items && toc.items.map(this.getTocs)}
      </Link>
    );
  };

  getPageTitle = (currentPageTitle: string, webAppName: string) => {
    return currentPageTitle ? `${currentPageTitle} | ${webAppName}` : webAppName;
  };

  render() {
    const props = this.props;
    const { currentPageTitle } = props;
    const {
      currentPageInfo,
      currentLocaleWebConfig: {
        title,
        description,
        themeConfig: { lastUpdated, editLinkText, repo, docsRepo, docsBranch, showAvatarList },
      },
    } = this.context;

    const { subtitle } = currentPageInfo.frontmatter;
    const { path, modifiedTime, avatarList } = currentPageInfo.fields;

    const noAvatar = !showAvatarList || !avatarList || !avatarList.length;

    return (
      <>
        <SEO title={this.getPageTitle(currentPageTitle, title)} description={description} />
        <article
          className="markdown"
          ref={node => {
            this.node = node;
          }}
        >
          {(docsRepo || repo) && editLinkText ? (
            <h1>
              {currentPageTitle}
              {!subtitle ? null : <span className="subtitle">{subtitle}</span>}

              <EditButton
                sourcePath={`https://github.com/${docsRepo || repo}/edit/${docsBranch}/`}
                title={editLinkText}
                filename={path}
              />
            </h1>
          ) : null}

          {lastUpdated && (
            <div className={`modifiedTime ${noAvatar ? 'no-avatar-list' : ''}`}>
              {!noAvatar && <AvatarList avatarList={avatarList} />}
              {lastUpdated} {moment(modifiedTime).format('YYYY-MM-DD HH:mm:SS')}
            </div>
          )}

          {currentPageInfo.tableOfContents.items && currentPageInfo.tableOfContents.items.length ? (
            <div className="toc-affix">
              <Anchor offsetTop={70} className="toc">
                {currentPageInfo.tableOfContents.items.map(this.getTocs)}
              </Anchor>
            </div>
          ) : null}
          <section className="markdown api-container">
            <MDXRenderer>{currentPageInfo.code.body}</MDXRenderer>
          </section>
        </article>
      </>
    );
  }
}
