/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import * as utils from '../utils';
class Footer extends React.Component<{
  data: {
    mdx: {
      frontmatter: any;
    };
  };
}> {
  render() {
    const {
      data: {
        mdx: {
          frontmatter: { footer },
        },
      },
    } = this.props;

    return footer ? (
      <footer id="footer">
        <div className="bottom-bar">{footer}</div>
      </footer>
    ) : null;
  }
}

export default Footer;
