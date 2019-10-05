/**
 * Copyright (c) wangyi7099(Yves Wang)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This file used to import react hot loader and hot exported the layout and 440 page.

import { hot } from 'react-hot-loader';
import React from 'react';
import Layout from '@themeLayout';

const LayoutWrapperComponent = props => {
  return <Layout {...props} />;
};

export default hot(module)(LayoutWrapperComponent);
