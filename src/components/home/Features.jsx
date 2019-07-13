/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';

class Page1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hoverNum: null,
    };
  }

  render() {
    const {
      data: {
        mdx: {
          frontmatter: { features, featureText },
        },
      },
    } = this.props;
    let children = [[]];

    features &&
      features.forEach((item, i) => {
        const child = (
          <li key={i.toString()}>
            <div className="page1-box">
              <h3>{item.title}</h3>
              <p>{item.details}</p>
            </div>
          </li>
        );
        children[Math.floor(i / 3)].push(child);
      });

    children = children.map((item, i) => (
      <ul className="page1-box-wrapper" key={i.toString()}>
        {item}
      </ul>
    ));

    return (
      <div className="home-page page1">
        <div className="home-page-wrapper" id="page1-wrapper">
          <h2>
            <span>{featureText}</span>
          </h2>
          <div className="title-line-wrapper page1-line">
            <div className="title-line" />
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default Page1;
