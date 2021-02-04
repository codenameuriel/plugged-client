export const localhost = "http://localhost:8000";

export const createURL = (origin=localhost) => {
  return new URL(origin);
};

export const appendPath = (pathName, urlObj) => {
  if (!pathName) return urlObj;

  urlObj.pathname = pathName;
  return urlObj;
};

export const appendParams = (userParams, urlObj) => {
  if (!userParams) return urlObj;

  let params = new URLSearchParams();
  for (let [k,v] of Object.entries(userParams)) {
    params.append(k, v);
  }
  params.toString();
  urlObj.search = params;
  return urlObj;
};

export const createURLString = (pathName, userParams) => {
  const url = createURL();
  appendPath(pathName, url);
  appendParams(userParams, url);
  return url.toString();
};