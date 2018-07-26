import React from 'react';
import { mount } from 'enzyme';

import injectContextAsProp from '../src/injectContextAsProp';

describe('injectContextAsProp', () => {
  it('should inject context', () => {
    const Mapper = injectContextAsProp(
      React.createContext('foo'),
      'foo',
      props => <div>{props.foo}</div>,
    );

    expect(
      mount(<Mapper />)
        .find('div')
        .text(),
    ).toEqual('foo');
  });
});
