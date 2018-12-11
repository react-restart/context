// TypeScript Version: 3.0

import * as React from 'react';

import { forwardRef, mapContextToProps } from 'react-context-toolbox';

const Foo = (props: {
  bar: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}) => <div ref={props.innerRef} />;

const ForwardedFoo = forwardRef(
  (props: { bar: boolean }, ref: React.Ref<HTMLDivElement>) => (
    <Foo innerRef={ref} bar={props.bar} />
  ),
);

<ForwardedFoo bar={false} />;
<ForwardedFoo bar={false} ref={React.createRef()} />;

// $ExpectError
<Foo bar={false} ref={React.createRef()} />;

const Context1 = React.createContext<boolean>(false);

const MappedFoo1 = mapContextToProps(
  Context1,
  value => ({
    bar: value,
  }),
  Foo,
);

<MappedFoo1 />;

// $ExpectError
<MappedFoo1 bar={false} />;

const MappedFoo2 = mapContextToProps(
  Context1,
  (value, props: { bar?: boolean }) => ({
    bar: props.bar == null ? value : props.bar,
  }),
  Foo,
);

<MappedFoo2 />;

<MappedFoo2 bar={false} />;

// $ExpectError
<MappedFoo2 bar="foo" />;

const Curried = mapContextToProps(
  Context1,
  (value, props: { bar?: boolean }) => ({
    bar: props.bar == null ? value : props.bar,
  }),
);

const MappedFoo3 = Curried(Foo);

<MappedFoo3 />;

<MappedFoo3 bar={false} />;

const Context2 = React.createContext<string>('baz');
const Context3 = React.createContext<string>('baz');
const Context4 = React.createContext<string>('baz');
const Context5 = React.createContext<string>('baz');

const MultiFoo = (props: {
  v1: boolean;
  v2?: string;
  v3?: string;
  v4?: string;
  v5?: string;
}) => <div />;

const Foo2Context = mapContextToProps(
  [Context1, Context2],
  (v1, v2) => ({ v1, v2 }),
  MultiFoo,
);

<Foo2Context />;

const Foo3Context = mapContextToProps(
  [Context1, Context2, Context3],
  (v1, v2, v3) => ({ v1, v2, v3 }),
  MultiFoo,
);

<Foo3Context />;

const Foo4Context = mapContextToProps(
  [Context1, Context2, Context3, Context4],
  (v1, v2, v3, v4) => ({ v1, v2, v3, v4 }),
  MultiFoo,
);

<Foo4Context />;
