# react-hotkey-hoc
THIS IS MY HOTKEY HOC. THERE ARE MANY LIKE IT, BUT THIS ONE IS MINE.

##Installation
`npm i -S react-hotkey-hoc`

## What's it do
This is a simple little higher-order component (HOC) for using mousetrap with react.
Mousetrap is a singleton, so unbinding things from it when components unmount is good.
Writing unbinding logic in a lifecycle method is lame.
Wrap your component with this & you get a prop to bind & then it'll automatically unbind when the component unmounts.

##Usage

### Stick it around your component that needs some hot keys

It works with component classes & stateless functional components.
I recommend the latter because you should keep your hotkeys close to where you use them,
and where you use them should be dumb components.

Example:

```js
import withHotkey from 'react-hotkey-hoc';
const statelessComponent = (props) {
  const onEventHandler = (event) => {
    return playWithPropsAndEvent(props, event);
  }

  props.bindHotkey('enter', onEventHandler);
  return <Div onClick={onEventHandler}>Foo</Div>
}
return withHotkey(statelessComponent);
```

There is also an `unbindHotkey(keySequence)` in case you need to unbind it _before_ the component unmounts. This should generally be avoided, as state-based hotkeys might get confusing.

## Advanced Usage: stopCallback middleware

The HOC also exposes two props `addHotkeyStopMw` and `removeHotkeyStopMw`.
You may use these functions to override Mousetrap's default
[stopCallback](https://craig.is/killing/mice#api.stopCallback) with your
own middleware function.

The signature for a middleware function is:

```javascript
  (e, event, combo, next) => Boolean
```

This is useful if a component wants to disable hotkey events set by a
higher component without needing to know which hotkey combinations have
been registered.

### Example of stopCallback Middleware

Suppose you'd like your component to stop Mousetrap from processing all
key events _except_ for `Escape` and `+` when your `input` component has
focus. First you'd create a function like this:

```javascript
const stopHotKeyCallbackMw = (e, event, combo, next) => {
  if (!(e.key === 'Escape' || e.key === '+')) {
    return true;
  }
  return next();
};
```

Next, you'd register your middleware using the `addHotkeyStopMw` function
(provided by the HOC as a prop) when your component takes focus, and
deregister it using the `removeHotkeyStopMw`.

```javascript
const onFocusInput = () => addHotkeyStopMw(stopHotKeyCallbackMw);
const onBlurInput = () => removeHotkeyStopMw(stopHotKeyCallbackMw);
```

Easy as pie!

## License

MIT
