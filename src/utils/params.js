export const checkParamsForUpdate = (prevParams, currParams) => {
  let paramsHaveChanged = false;
  if (Object.keys(currParams).length > 0) {
    for (let param in currParams) {
      if (!(param in prevParams) || prevParams[param] !== currParams[param]) {
        paramsHaveChanged = true;
      }
    }
  }
  return paramsHaveChanged;
};