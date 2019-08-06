/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
class Footer extends React.Component<{
  footeText: string;
}> {
  render() {
    const { footeText } = this.props;

    return (
      <footer id="footer">
        <div
          className="bottom-bar"
          dangerouslySetInnerHTML={{
            __html: footeText
          }}
        ></div>
      </footer>
    );
  }
}

export default Footer;
