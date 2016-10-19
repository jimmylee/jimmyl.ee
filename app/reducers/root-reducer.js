const initialState = {
  loadTime: 0
};

export function saveLoadTime(time) {
  return { loadTime: time };
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_LOAD_TIME':
      return saveLoadTime(action.time, state);
    default:
      return state;
  }
}
