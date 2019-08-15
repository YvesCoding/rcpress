import React from 'react';
import { Anchor } from 'antd';
import EditButton from './EditButton';
import { OneToc } from '../../../templates';
import moment from 'moment';
import AvatarList from './AvatarList';
import { PageContext } from 'antdsite';
import SEO from '../SEO/SEO';
import { getPageTitle } from '../utils';

const Link = Anchor.Link;

export default class Article extends React.PureComponent {
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
    const {
      currentPageInfo,
      currentPageContent,
      currentLocaleWebConfig: {
        title,
        lang,
        description,
        head,
        themeConfig: {
          lastUpdated,
          editLinkText,
          editLinks,
          repo,
          docsRepo,
          docsBranch,
          showAvatarList,
          editLink
        }
      }
    } = this.context;

    const { subtitle, disableEditLink, disableUpdateTime } = currentPageInfo.frontmatter;
    const { path, modifiedTime, avatarList } = currentPageInfo.fields;
    const noAvatar = !showAvatarList || !avatarList || !avatarList.length;
    const editPath = this.getEditLink(editLink, docsRepo || repo, docsBranch, path);

    const currentPageTitle = getPageTitle(currentPageInfo);
    return (
      <>
        <SEO
          head={head as Array<any>}
          lang={lang}
          title={this.getPageTitle(currentPageTitle, title)}
          description={description}
        />
        <article
          className="markdown"
          ref={node => {
            this.node = node;
          }}
        >
          {(docsRepo || repo) && editLinkText && editLinks && !disableEditLink ? (
            <h1>
              {currentPageTitle}
              {!subtitle ? null : <span className="subtitle">{subtitle}</span>}

              <EditButton path={editPath} title={editLinkText} />
            </h1>
          ) : null}

          {lastUpdated && !disableUpdateTime && (
            <div className={`modifiedTime ${noAvatar ? 'modifiedTimeLeft' : ''}`}>
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
            {React.createElement(currentPageContent)}
          </section>
        </article>
      </>
    );
  }
  getEditLink(editLink: string, docsRepo: string, docsBranch: string, path: string) {
    if (editLink) return editLink;

    const bitbucket = /bitbucket.org/;
    if (bitbucket.test(docsRepo)) {
      return (
        docsRepo +
        `/src` +
        `/${docsBranch}/` +
        path +
        `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
      );
    }

    const gitee = /gitee.com/;
    if (gitee.test(docsRepo)) {
      return `${docsRepo}/edit/${docsBranch}/${path}`;
    }

    return `https://github.com/${docsRepo}/edit/${docsBranch}/${path}`;
  }
}
