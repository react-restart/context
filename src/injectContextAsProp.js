import mapContextToProps from './mapContextToProps';

export default (Context, prop, Component) =>
  mapContextToProps(Context, context => ({ [prop]: context }), Component);
