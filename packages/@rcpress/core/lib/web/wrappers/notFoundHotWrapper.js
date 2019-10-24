/**
 * Copyright (c) wangyi7099(Yves Wang)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This file used to import react hot loader and hot exported the 440 page.

import { hot } from 'react-hot-loader';
import React from 'react';
import ThemeNotFound from '@themeNotFound';

const ThemeNotFoundWrapperComponent = props => {
  return <ThemeNotFound {...props} />;
};

export default hot(module)(ThemeNotFoundWrapperComponent);
