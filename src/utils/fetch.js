import { createURLString } from './serverURLs';

export const getData = async (pathName, userParams) => {
	const url = createURLString(pathName, userParams);
	const response = await fetch(url);
	return response.json();
};

export const postData = async (pathName, data = {}) => {
	try {
		const url = createURLString(pathName);
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});
		return response.json();
	} catch (error) {
		console.error('this is a login error', error);
		return error;
	}
};

export const updateData = async (pathName, data={}) => {
  try {
    const url = createURLString(pathName);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
				Accept: 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteData = async (pathName, id) => {
  try {
    const path = `${pathName}/${id}`;
    const url = createURLString(path);
    const response = await fetch(url, {
     method: 'DELETE',
     'Content-Type': 'application/json',
     Accept: 'application/json'
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}