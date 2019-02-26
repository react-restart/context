import React from 'react';

export default function forwardRef(
  renderFn,
  {
    propTypes,
    defaultProps,
    allowFallback = false,
    displayName = renderFn.name || renderFn.displayName,
  } = {},
) {
  const render = (props, ref) => renderFn(props, ref);

  return Object.assign(
    React.forwardRef || !allowFallback
      ? React.forwardRef(render)
      : props => render(props, null),
    {
      displayName,
      propTypes,
      defaultProps,
    },
  );
}
