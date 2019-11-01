import React, { FunctionComponent } from 'react';
import { Anchor } from 'antd';
import EditButton from './EditButton';
import moment from 'moment';
import AvatarList from './AvatarList';
import { useSiteContext } from '@rcpress/core';
import SEO from '../SEO/SEO';
import PrevAndNext from '../prevAndNext';
import Toc from '../Toc';

const Article: FunctionComponent<{
  prev: React.Component | null;
  next: React.Component | null;
  isMoblie: boolean;
}> = props => {
  const getPageTitle = (currentPageTitle: string, siteName: string) => {
    return currentPageTitle ? `${currentPageTitle} | ${siteName}` : siteName;
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

  const { subtitle, disableEditLink, disableUpdateTime, editLink } = currentPageInfo.frontMatter;
  const { filePath, lastUpdated: modifiedTime, avatarList, Markdown } = currentPageInfo;
  const noAvatar = !showAvatarList || !avatarList || !avatarList.length;
  const editPath = getEditLink(editLink, docsRepo || repo, docsBranch, filePath);

  const currentPageTitle = getPageTitle(currentPageInfo.title, title);
  const { prev, next, isMoblie } = props;
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
          {(docsRepo || repo) && editLinkText && editLinks && !disableEditLink ? (
            <h1>
              {currentPageInfo.title}
              {!subtitle ? null : <span className="subtitle">{subtitle}</span>}

              <EditButton path={editPath} title={editLinkText} />
            </h1>
          ) : null}

          {lastUpdated && !disableUpdateTime && modifiedTime && (
            <div className={`modifiedTime ${noAvatar ? 'modifiedTimeLeft' : ''}`}>
              {!noAvatar && <AvatarList avatarList={avatarList} />}
              {lastUpdated} {moment(modifiedTime).format('YYYY-MM-DD HH:mm:SS')}
            </div>
          )}

          {!isMoblie ? <Toc affix /> : null}

          <section className="markdown api-container">
            <Markdown />
          </section>
          <PrevAndNext prev={prev} next={next} />
        </article>
      </div>
    </>
  );
};
const getEditLink = (editLink: string, docsRepo: string, docsBranch: string, path: string) => {
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
