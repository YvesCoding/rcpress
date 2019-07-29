import React from 'react';
import MDXRenderer from 'gatsby-mdx-fix/mdx-renderer';

export default class extends React.Component {
  setConentVisible = () => {
    const container = this.refs['rest-content'];
    if (!container) return;

    const innerContent = container.querySelector('.markdown.home-markdown');
    if (!innerContent) return;

    if (innerContent.innerHTML === '') {
      container.style.display = 'none';
    } else {
      container.style.display = 'block';
    }
  };

  componentDidMount() {
    this.setConentVisible();
  }

  componentDidUpdate() {
    this.setConentVisible();
  }

  render() {
    const {
      data: {
        mdx: { code },
      },
    } = this.props;

    const wrapper = _ => {
      return <div className="markdown home-markdown">{_.children}</div>;
    };

    return (
      <div className="home-page page2" ref="rest-content">
        <div className="home-page-wrapper">
          <MDXRenderer components={{ wrapper }}>{code.body}</MDXRenderer>
        </div>
      </div>
    );
  }
}
