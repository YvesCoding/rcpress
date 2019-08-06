import React from 'react';
import { Icon } from 'antd';

export default ({ prev, next }: { prev: React.Component | null; next: React.Component | null }) => {
  return (
    <section className="prev-next-nav">
      {prev ? (
        <div className="prev-page">
          <Icon className="footer-nav-icon-before" type="left" />
          {prev.props.children}
        </div>
      ) : null}
      {next ? (
        <div className="next-page">
          {next.props.children}
          <Icon className="footer-nav-icon-after" type="right" />
        </div>
      ) : null}
    </section>
  );
};
