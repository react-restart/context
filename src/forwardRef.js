import React from 'react';

export default function forwardRef(
  renderFn,
  { displayName, propTypes, defaultProps, allowFallback = false },
) {
  const render = (props, ref) => renderFn(props, ref);

  Object.assign(render, { displayName });

  if (React.forwardRef || !allowFallback)
    return Object.assign(React.forwardRef(render), {
      propTypes,
      defaultProps,
    });

  return Object.assign(props => render(props, null), {
    displayName,
    propTypes,
    defaultProps,
  });
}
