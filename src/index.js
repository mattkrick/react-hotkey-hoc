import React, {Component} from 'react';
import Mousetrap from 'mousetrap';

export default ComposedComponent => {
  return class WithHotkey extends Component {
    constructor(props) {
      super(props);
      this.bindings = [];
    }

    bindHotkey = (key, callback, action) => {
      Mousetrap.bind(key, callback, action);
      this.bindings.push(key);
    };

    unbindHotkey = key => {
      Mousetrap.unbind(key);
    };

    componentWillUnmount() {
      this.bindings.forEach(key => this.unbindHotkey(key));
    };

    render() {
      return (
        <ComposedComponent bindHotkey={this.bindHotkey} unbindHotkey={this.unbindHotkey} {...this.props}/>
      );
    }
  }
}
