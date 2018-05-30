import React from 'react';
import forwardRef from './forwardRef';

export default function transformContext(Context) {
  return forwardRef(
    props => (
      <Context.Consumer>
        {context => (
          <Context.Provider value={props.mapToValue(context)}>
            {props.children}
          </Context.Provider>
        )}
      </Context.Consumer>
    ),
    { displayName: 'ContextTransformer' },
  );
}
