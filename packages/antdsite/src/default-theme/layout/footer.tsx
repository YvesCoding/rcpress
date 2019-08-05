/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
class Footer extends React.Component<{
  footeText: string;
}> {
  render() {
    const { footeText } = this.props;

    return footeText ? (
      <footer id="footer">
        <div
          className="bottom-bar"
          dangerouslySetInnerHTML={{
            __html: footeText
          }}
        ></div>
      </footer>
    ) : null;
  }
}

export default Footer;
