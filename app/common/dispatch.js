let _firstLoad = true;

export const dispatchEnterEvent = (nextState, replace, callback) => {
  if (_firstLoad) {
    _firstLoad = false;
    callback();
    return;
  }

  const detail = { nextState, replace, callback };
  const event = new CustomEvent('page-enter', { detail });
  window.dispatchEvent(event);
};
