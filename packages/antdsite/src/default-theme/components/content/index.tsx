import React from 'react';
import Article from './Article';

export default class Content extends React.PureComponent {
  render() {
    return (
      <div className="main-container">
        <Article />
      </div>
    );
  }
}
