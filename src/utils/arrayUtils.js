export const findElementInArray = (arr, conditionalFunct) => {
  if (!arr || arr.length === 0) {
    return null;
  }

  let result = null;
  arr.forEach(e => {
    if (conditionalFunct(e)) {
      result = e;
    }
  });

  return result;
};

export const findIndexOfElementInArray = (arr, conditionalFunct) => {
  if (!arr || arr.length === 0) {
    return -1;
  }

  let result = -1;
  arr.forEach((e, index) => {
    if (conditionalFunct(e)) {
      result = index;
    }
  });

  return result;
};
