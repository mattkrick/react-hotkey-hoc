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

## License

MIT
