import React, { FunctionComponent } from 'react';
import { Anchor } from 'antd';
import EditButton from './EditButton';
import moment from 'moment';
import AvatarList from './AvatarList';
import { useSiteContext } from '@rcpress/core';
import SEO from '../SEO/SEO';
import { getPageTitle } from '../utils';
import PrevAndNext from '../prevAndNext';

const Link = Anchor.Link;

const Article: FunctionComponent<{
  prev: React.Component | null;
  next: React.Component | null;
}> = props => {
  const getTocs = (toc: any): any => {
    return (
      <Link key={toc.url} href={toc.url} title={toc.title}>
        {toc.items && toc.items.map(getTocs)}
      </Link>
    );
  };

  const getPageTitle = (
    currentPageTitle: string,
    siteName: string
  ) => {
    return currentPageTitle
      ? `${currentPageTitle} | ${siteName}`
      : siteName;
  };

  const {
    currentPageInfo,
    currentLocaleSiteData: {
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
        showAvatarList
      }
    }
  } = useSiteContext();

  const {
    subtitle,
    disableEditLink,
    disableUpdateTime,
    editLink
  } = currentPageInfo.frontMatter;
  const {
    filePath,
    lastUpdated: modifiedTime,
    avatarList,
    Markdown
  } = currentPageInfo;
  const noAvatar =
    !showAvatarList || !avatarList || !avatarList.length;
  const editPath = getEditLink(
    editLink,
    docsRepo || repo,
    docsBranch,
    filePath
  );

  const currentPageTitle = getPageTitle(
    currentPageInfo.title,
    title
  );

  const { prev, next } = props;
  return (
    <>
      <SEO
        head={head as Array<any>}
        lang={lang}
        title={currentPageTitle}
        description={description}
      />
      <div className="main-container">
        <article className="markdown">
          {(docsRepo || repo) &&
          editLinkText &&
          editLinks &&
          !disableEditLink ? (
            <h1>
              {currentPageTitle}
              {!subtitle ? null : (
                <span className="subtitle">{subtitle}</span>
              )}

              <EditButton
                path={editPath}
                title={editLinkText}
              />
            </h1>
          ) : null}

          {lastUpdated && !disableUpdateTime && (
            <div
              className={`modifiedTime ${
                noAvatar ? 'modifiedTimeLeft' : ''
              }`}
            >
              {!noAvatar && (
                <AvatarList avatarList={avatarList} />
              )}
              {lastUpdated}{' '}
              {moment(modifiedTime).format(
                'YYYY-MM-DD HH:mm:SS'
              )}
            </div>
          )}

          {currentPageInfo.toc &&
          currentPageInfo.toc.items.length ? (
            <div className="toc-affix">
              <Anchor
                offsetTop={70}
                className="toc"
                targetOffset={0}
              >
                {currentPageInfo.toc.items.map(getTocs)}
              </Anchor>
            </div>
          ) : null}
          <section className="markdown api-container">
            <Markdown />
          </section>
          <PrevAndNext prev={prev} next={next} />
        </article>
      </div>
    </>
  );
};
const getEditLink = (
  editLink: string,
  docsRepo: string,
  docsBranch: string,
  path: string
) => {
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
};

export default Article;
