import React from 'react';
import { mount } from 'enzyme';

import mapContextToProps from '../src/mapContextToProps';

describe('mapContextToProps', () => {
  it('should provide single context', () => {
    const Mapper = mapContextToProps(
      React.createContext('foo'),
      foo => ({
        foo,
      }),
      props => <div>{props.foo}</div>,
    );

    expect(
      mount(<Mapper />)
        .find('div')
        .text(),
    ).toEqual('foo');
  });
  it('should provide multiple contexts', () => {
    const Mapper = mapContextToProps(
      [React.createContext('foo'), React.createContext('bar')],
      (foo, bar) => ({
        foo,
        bar,
      }),
      props => (
        <div>
          {props.foo} {props.bar}
        </div>
      ),
    );

    expect(
      mount(<Mapper />)
        .find('div')
        .text(),
    ).toEqual('foo bar');
  });

  it('should work with host components', () => {
    const Mapper = mapContextToProps(
      React.createContext('foo'),
      foo => ({ children: foo }),
      'div',
    );

    expect(
      mount(<Mapper />)
        .find('div')
        .text(),
    ).toEqual('foo');
  });

  it('should pass props', () => {
    const Mapper = mapContextToProps(
      React.createContext('foo'),
      (foo, props) => ({ children: foo + props.bar }),
      'div',
    );

    expect(
      mount(<Mapper bar="bar" />)
        .find('div')
        .text(),
    ).toEqual('foobar');
  });

  it('should forward refs', () => {
    const Mapper = mapContextToProps(
      React.createContext('foo'),
      foo => ({ children: foo }),
      'div',
    );

    let ref;
    class Wrapper extends React.Component {
      render() {
        return (
          <Mapper
            ref={r => {
              ref = r;
            }}
          />
        );
      }
    }

    mount(<Wrapper />);
    expect(ref.tagName).toEqual('DIV');
  });

  it('should forward refs as specified', () => {
    const ref = React.createRef();
    const Mapper = mapContextToProps(
      {
        consumers: React.createContext('foo'),
        mapToProps: foo => ({ children: foo }),
        forwardRefAs: 'innerRef',
      },
      ({ innerRef }) => {
        expect(innerRef).toEqual(ref);
        return <div />;
      },
    );

    class Wrapper extends React.Component {
      render() {
        return <Mapper ref={ref} />;
      }
    }

    mount(<Wrapper />);
  });

  it('should add displayName', () => {
    const Mapper = mapContextToProps(
      React.createContext('foo'),
      foo => ({ children: foo }),
      'div',
    );

    expect(Mapper.render.displayName).toEqual('ContextTransform(div)');
  });

  it('should add custom displayName', () => {
    const Mapper = mapContextToProps(
      {
        consumers: React.createContext('foo'),
        mapToProps: foo => ({ children: foo }),
        displayName: 'WithIntl',
      },
      'div',
    );

    expect(Mapper.render.displayName).toEqual('WithIntl');
  });

  it('should not warn about Contexts', () => {
    const Mapper = mapContextToProps(
      {
        consumers: React.createContext('foo'),
        mapToProps: foo => ({ children: foo }),
        displayName: 'WithIntl',
      },
      'div',
    );
    mount(<Mapper />);
  });
});
