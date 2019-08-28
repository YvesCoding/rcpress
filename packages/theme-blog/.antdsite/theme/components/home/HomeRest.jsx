import React from 'react';
import { PageContext } from 'antdsite';

export default class extends React.Component {
  static contextType = PageContext;

  setConentVisible = () => {
    const container = this.refs['rest-content'];
    if (!container) return;

    const innerContent = container.querySelector('.home-markdown.markdown');
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
    const { currentPageContent } = this.context;
    return (
      <div className="home-page page2" ref="rest-content">
        <div className="home-page-wrapper home-markdown markdown">
          {React.createElement(currentPageContent)}
        </div>
      </div>
    );
  }
}
