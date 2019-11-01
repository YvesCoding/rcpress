/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
class Footer extends React.Component<{
  footerText: string;
}> {
  render() {
    const { footerText } = this.props;

    return (
      <footer id="site-footer">
        <div
          className="bottom-bar"
          dangerouslySetInnerHTML={{
            __html: footerText
          }}
        ></div>
      </footer>
    );
  }
}

export default Footer;
