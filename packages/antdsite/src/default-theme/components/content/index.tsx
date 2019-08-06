import React from 'react';
import Article from './Article';
import { PageContext } from 'antdsite';

export default class Content extends React.PureComponent {
  static contextType = PageContext;

  render() {
    return (
      <>
        <div className="main-container">
          <Article />
        </div>
      </>
    );
  }
}
