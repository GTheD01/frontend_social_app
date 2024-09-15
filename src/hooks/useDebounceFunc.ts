export default function useDebounceFunc() {
  const debounce = (func: () => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };
  };

  return debounce;
}
