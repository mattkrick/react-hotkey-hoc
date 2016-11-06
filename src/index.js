import React, {Component} from 'react';
import Mousetrap from 'mousetrap';
import {StopCbMwMgr} from './stopCbMwMgr';

// initialize stopCallback Middleware Manager singleton:
const stopCbMwMgr = new StopCbMwMgr();

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

    unbindHotkey = (key) => {
      Mousetrap.unbind(key);
    };

    addHotkeyStopMw = (cb) => {
      stopCbMwMgr.add(cb);
    }

    removeHotkeyStopMw = (cb) => {
      stopCbMwMgr.remove(cb);
    }

    componentWillUnmount() {
      this.bindings.forEach((key) => this.unbindHotkey(key));
    };

    render() {
      return (
        <ComposedComponent
          bindHotkey={this.bindHotkey}
          unbindHotkey={this.unbindHotkey}
          addHotkeyStopMw={this.addHotkeyStopMw}
          removeHotkeyStopMw={this.removeHotkeyStopMw}
          {...this.props}
        />
      );
    }
  }
}
