import Mousetrap from 'mousetrap';

export class StopCbMwMgr {
  constructor() {
    const defaultStopCb = Mousetrap.prototype.stopCallback;
    const defaultMw = (e, element, combo, next) => {
      if (!defaultStopCb(e, element, combo)) {
        return next();
      }
      return true;
    }
    this.middleware = new Set();
    this.add(defaultMw);
  }

  rebuildMiddware() {
    let chain = (e, element, combo, next) => next(e, element, combo);
    const use = (fn) => {
      chain = ((stack) => (e, element, combo, next) => stack(
        e, element, combo, () => fn.call(
          this, e, element, combo, next.bind(this)))
      )(chain);
    }
    this.middleware.forEach((fn) => use(fn));
    const stopCallback = (e, element, combo) =>
      chain(e, element, combo, () => false);
    Mousetrap.prototype.stopCallback = stopCallback;
  }

  add(fn) {
    this.middleware.add(fn);
    this.rebuildMiddware();
  }

  remove(fn) {
    this.middleware.delete(fn);
    this.rebuildMiddware();
  }

}
