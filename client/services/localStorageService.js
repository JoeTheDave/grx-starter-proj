const set = (key, value) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
  }
};

const get = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const setJwtToken = (value) => {
  set('auth-jwt', value);
};

const getJwtToken = () => get('auth-jwt');

export default {
  set,
  get,
  getJwtToken,
  setJwtToken,
};
