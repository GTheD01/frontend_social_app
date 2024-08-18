import { useEffect, useState } from "react";

interface DebounceProps {
  value: string;
  delay: number;
}

const useDebounce = ({ value, delay }: DebounceProps) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
