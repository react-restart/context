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
  render.displayName = displayName;

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
