import React from 'react';
import forwardRef from './forwardRef';

const getDisplayName = Component => {
  const name =
    typeof Component === 'string'
      ? Component
      : Component.name || Component.displayName;
  return name ? `ContextTransform(${name})` : 'ContextTransform';
};

const ensureConsumer = c => c.Consumer || c;

function $mapContextToProps(
  {
    consumers: maybeArrayOfConsumers,
    mapToProps,
    displayName,
    forwardRefAs = 'ref',
  },
  Component,
) {
  let consumers = maybeArrayOfConsumers;
  if (!Array.isArray(maybeArrayOfConsumers)) {
    consumers = [maybeArrayOfConsumers];
  }

  const SingleConsumer = ensureConsumer(consumers[0]);
  function singleRender(props, ref) {
    const propsWithRef = { [forwardRefAs]: ref, ...props };
    return (
      <SingleConsumer>
        {value => (
          <Component {...propsWithRef} {...mapToProps(value, props)} />
        )}
      </SingleConsumer>
    );
  }

  function multiRender(props, ref) {
    const propsWithRef = { [forwardRefAs]: ref, ...props };
    return consumers.reduceRight(
      (inner, Context) => (...args) => {
        const Consumer = ensureConsumer(Context);
        return <Consumer>{value => inner(...args, value)}</Consumer>;
      },
      (...contexts) => (
        <Component {...propsWithRef} {...mapToProps(...contexts, props)} />
      ),
    )();
  }

  const contextTransform = consumers.length === 1 ? singleRender : multiRender;

  return forwardRef(contextTransform, {
    displayName: displayName || getDisplayName(Component),
  });
}

export default function mapContextToProps(maybeOpts, mapToProps, Component) {
  if (arguments.length === 2) return $mapContextToProps(maybeOpts, mapToProps);
  return $mapContextToProps({ consumers: maybeOpts, mapToProps }, Component);
}
