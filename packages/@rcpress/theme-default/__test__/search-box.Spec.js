/**
 * @jest-environment jsdom
 */

import { mount } from 'enzyme';
import React from 'react';
import SearchBox from '../components/search-box';

describe('SearchBox', () => {
  test('SearchBox', () => {
    let SearchBoxInstance = mount(<SearchBox />);
    expect(SearchBoxInstance.render().html()).toMatchSnapshot();
  });
});
