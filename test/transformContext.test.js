import React from 'react';
import { mount } from 'enzyme';

import transformContext from '../src/transformContext';

describe('transformContext', () => {
  it('should transform a context value', () => {
    const Context = React.createContext('foo');
    const Transformer = transformContext(Context);

    const mapper = jest.fn(value => (value === 'foo' ? value : 'baz'));

    function Inner() {
      return <Context.Consumer>{v => <div>{v}</div>}</Context.Consumer>;
    }
    function Wrapper() {
      return (
        <Transformer mapToValue={mapper}>
          <Inner />
        </Transformer>
      );
    }

    function Nested() {
      return (
        <Context.Provider value="quack">
          <Wrapper />
        </Context.Provider>
      );
    }
    expect(
      mount(<Wrapper />)
        .find('div')
        .text(),
    ).toEqual('foo');

    expect(
      mount(<Nested />)
        .find('div')
        .text(),
    ).toEqual('baz');
  });
});
