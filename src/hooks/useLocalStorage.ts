export const useLocalStorage = () => {
  const getItem = (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      if (key === "jwtToken") {
        return item ? item : undefined;
      } else {
        return item ? JSON.parse(item) : undefined;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const setItem = (key: string, value: unknown) => {
    try {
      if (key === "jwtToken") {
        window.localStorage.setItem(key, value as string);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const removeItem = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }

  return { getItem, setItem, removeItem };
}
