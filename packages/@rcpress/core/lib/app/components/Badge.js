import React from 'react';
import './Badge.styl';

export default ({
  type = 'tip',
  text,
  vertical = 'top',
  children
} = {}) => {
  return (
    <span className={`badge ${type} ${vertical}`}>
      {text | children}
    </span>
  );
};
