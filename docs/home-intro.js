import Scrollbar from 'magic-scroll';
import './home-intro.less';
import React from 'react';

export default () => {
  return (
    <div className="demo-container">
      <Scrollbar>
        <div className="demo-content">
          <span className="demo-content-text">Hello! Magic Scroll!</span>
        </div>
      </Scrollbar>
    </div>
  );
};
