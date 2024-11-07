export const useLocalStorage = () => {
  const setItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  const setObjectItem = (key: string, value: object) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getObjectItem = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, setObjectItem, getObjectItem, removeItem };
}
