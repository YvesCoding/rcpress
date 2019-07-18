import React from 'react';
import { Affix, Anchor } from 'antd';
import delegate from 'delegate';
import EditButton from './EditButton';
import { IGraphqlFrontmatterData, IMarkDownFields } from '../../templates/docs';
import moment from 'moment';
import AvatarList from './AvatarList';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { PageContext } from '../../layout/PageContext';
import SEO from '../SEO/SEO';

const Link = Anchor.Link;

interface ArticleProps {
  content: {
    meta: IGraphqlFrontmatterData & IMarkDownFields;
    toc: {
      items: Array<{
        url: string;
        title: string;
      }>;
    };
    code: {
      body: string;
    };
  };
}

export default class Article extends React.PureComponent<ArticleProps> {
  static contextType = PageContext;

  componentDidMount() {
    // Add ga event click
    this.delegation = delegate(
      this.node,
      '.resource-card',
      'click',
      (e: { delegateTarget: { href: any } }) => {
        if ((window as any).ga) {
          (window as any).ga('send', 'event', 'Download', 'resource', e.delegateTarget.href);
        }
      },
      false
    );
  }
  delegation: any;
  pingTimer: number;
  componentWillUnmount() {
    clearTimeout(this.pingTimer);
    if (this.delegation) {
      this.delegation.destroy();
    }
  }

  node: HTMLElement | null | undefined;

  render() {
    const props = this.props;
    const { content } = props;
    const { meta } = content;
    const { title, subtitle, path, modifiedTime, avatarList } = meta;
    const {
      currentLocaleWebConfig: {
        title: siteTitle,
        description,
        themeConfig: { lastUpdated, editLinkText, repo, docsRepo, docsBranch, showAvatarList },
      },
    } = this.context;
    const noAvatar = !showAvatarList || !avatarList || !avatarList.length;

    return (
      <>
        <SEO title={`${title} | ${siteTitle}`} description={description} />
        <article
          className="markdown"
          ref={node => {
            this.node = node;
          }}
        >
          <h1>
            {title}
            {!subtitle ? null : <span className="subtitle">{subtitle}</span>}
            <EditButton
              sourcePath={`https://github.com/${docsRepo || repo}/edit/${docsBranch}/`}
              title={editLinkText}
              filename={path}
            />
          </h1>

          {!content.toc.items.length ? null : (
            <div className="toc-affix">
              <Anchor offsetTop={70}>
                {content.toc.items.map(item => {
                  return <Link key={item.url} href={item.url} title={item.title} />;
                })}
              </Anchor>
            </div>

            // <Affix className="toc-affix" offsetTop={64}>
            //   <ul className="toc">
            //     {content.toc.items.map(item => {
            //       return (
            //         <li key={item.url}>
            //           <a href={item.url}>{item.title}</a>
            //         </li>
            //       );
            //     })}
            //   </ul>
            // </Affix>
          )}
          <section className="markdown api-container">
            <MDXRenderer>{content.code.body}</MDXRenderer>
          </section>
        </article>
        {lastUpdated && (
          <div className={`modifiedTime ${noAvatar ? 'no-avatar-list' : ''}`}>
            {!noAvatar && <AvatarList avatarList={avatarList} />}
            {lastUpdated} {moment(modifiedTime).format('YYYY-MM-DD HH:mm:SS')}
          </div>
        )}
      </>
    );
  }
}
