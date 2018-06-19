import React from 'react';

export default function forwardRef(
  renderFn,
  { displayName, propTypes, defaultProps },
) {
  const render = (...args) => renderFn(...args);

  render.displayName = displayName;
  
  const Forwarded = React.forwardRef(render);
  Forwarded.propTypes = propTypes;
  Forwarded.defaultProps = defaultProps;
}
