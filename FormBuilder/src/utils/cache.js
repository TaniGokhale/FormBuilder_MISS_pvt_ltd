export const getCache = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setCache = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.log("Cache write failed");
  }
};

export const clearCache = (key) => {
  localStorage.removeItem(key);
};