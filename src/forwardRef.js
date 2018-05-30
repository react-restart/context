import React from 'react';

export default function forwardRef(
  renderFn,
  { displayName, propTypes, defaultProps },
) {
  const render = (...args) => renderFn(...args);

  Object.assign(render, { displayName, propTypes, defaultProps });
  return React.forwardRef(render);
}
