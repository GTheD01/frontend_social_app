export default function useThrottleFunc() {
  const throttle = (callback: () => void, timer: number) => {
    let throttleTimer: boolean = false;
    return () => {
      if (!throttleTimer) {
        callback();
        throttleTimer = true;
        setTimeout(() => {
          throttleTimer = false;
        }, timer);
      }
    };
  };

  return throttle;
}
