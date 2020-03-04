import React from 'react';
import { LeftCircleOutlined, RightOutlined } from '@ant-design/icons';

export default ({ prev, next }: { prev: React.Component | null; next: React.Component | null }) => {
  return (
    <section className="prev-next-nav">
      {prev ? (
        <div className="prev-page">
          <LeftCircleOutlined className="footer-nav-icon-before" />
          {prev.props.children}
        </div>
      ) : null}
      {next ? (
        <div className="next-page">
          {next.props.children}
          <RightOutlined className="footer-nav-icon-after" />
        </div>
      ) : null}
    </section>
  );
};
