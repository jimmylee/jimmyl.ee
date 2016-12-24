const initialState = {
  animating: false,
  pageNavigationActive: false,
  pageX: 0,
  pageY: 0,
  pageOpacity: 1,
  statsLoadTime: 0,
  userNavHoverIndex: null
};

function merge(state, updates) {
  return Object.assign({}, state, updates);
}

export function saveLoadTime(statsLoadTime, state) {
  return merge(state, { statsLoadTime });
}

export function showNavigation(pageNavigationActive, state) {
  return merge(state, { pageNavigationActive });
}

export function updatePagePosition(updates, state) {
  return merge(state, updates);
}

export function updateNavHoverIndex(userNavHoverIndex, state) {
  return merge(state, { userNavHoverIndex });
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_NAVIGATION':
      return showNavigation(action.visible, state);
    case 'SAVE_LOAD_TIME':
      return saveLoadTime(action.time, state);
    case 'UPDATE_PAGE_POSITION':
      return updatePagePosition(action.updates, state);
    case 'UPDATE_NAV_HOVER':
      return updateNavHoverIndex(action.index, state);
    default:
      return state;
  }
}
