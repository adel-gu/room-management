const useLocalStorage = (initialStorage: boolean, key: string) => {
  let storedStorage: boolean;

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(initialStorage));
  }

  storedStorage = JSON.parse(localStorage.getItem(key) as string);

  return storedStorage;
};
export default useLocalStorage;
