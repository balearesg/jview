import { useState, useEffect } from 'react';

type windowSize = {
  width: number | undefined;
  height: number | undefined;
}

/**
 * It returns an object with the current window width and height
 * @returns A function that returns a windowSize object.
 */
export /*bundle*/
  function useWindowSize(): windowSize {

  const [windowSize, setWindowSize] = useState<windowSize>({
    width: undefined,
    height: undefined,
  });
  useEffect((): () => void => {

    const handleResize: () => void = (): void => {

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return (): void => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};