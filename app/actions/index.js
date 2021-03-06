export function showNavigation(visible) {
  return {
    visible,
    type: 'SHOW_NAVIGATION'
  };
};


export function saveLoadTime(time) {
  return {
    time,
    type: 'SAVE_LOAD_TIME'
  };
};

export function updatePagePosition({ x, y, z, alpha, animating }) {
  const updates = {};

  if (x !== null && x !== undefined) {
    updates.pageX = x;
  }

  if (y !== null && y !== undefined) {
    updates.pageY = y;
  }

  if (z !== null && z !== undefined) {
    updates.pageZ = z;
  }

  if (alpha !== null && alpha !== undefined) {
    updates.pageOpacity = alpha;
  }

  if (typeof animating === 'boolean') {
    updates.animating = animating;
  }

  return {
    updates,
    type: 'UPDATE_PAGE_POSITION'
  };
};

export function updateNavHover(index) {
  return {
    index,
    type: 'UPDATE_NAV_HOVER'
  };
}
