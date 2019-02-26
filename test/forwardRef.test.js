import React from 'react';
import { mount } from 'enzyme';

import forwardRef from '../src/forwardRef';

describe('forwardRef', () => {
  it('should use existing displayName', () => {
    // eslint-disable-next-line prefer-arrow-callback
    const Foo = forwardRef(function Foo() {
      return null;
    });

    expect(mount(<Foo />).find('Foo')).toHaveLength(1);
  });
});
