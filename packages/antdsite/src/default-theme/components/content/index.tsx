import React from 'react';
import Article from './Article';

export default class Content extends React.PureComponent<{
  prev: React.Component | null;
  next: React.Component | null;
}> {
  render() {
    return (
      <div className="main-container">
        <Article {...this.props} />
      </div>
    );
  }
}
