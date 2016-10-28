const initialState = {
  pageNavigationActive: false,
  pageX: 0,
  pageY: 0,
  pageOpacity: 1,
  statsLoadTime: 0
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
  console.log(updates);
  return merge(state, updates);
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_NAVIGATION':
      return showNavigation(action.visible, state);
    case 'SAVE_LOAD_TIME':
      return saveLoadTime(action.time, state);
    case 'UPDATE_PAGE_POSITION':
      return updatePagePosition(action.updates, state);
    default:
      return state;
  }
}
