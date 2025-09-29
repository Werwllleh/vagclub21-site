
export const ymReach = (method, target, options) => {
  if (typeof window === "undefined") return;

  const ymId = Number(process.env.NEXT_PUBLIC_YMETRIKA);

  if (window.ym) {
    window.ym(ymId, method, target, options);
  } else {
    const interval = setInterval(() => {
      if (window.ym) {
        window.ym(ymId, method, target, options);
        clearInterval(interval);
      }
    }, 300);

    setTimeout(() => clearInterval(interval), 5000);
  }
};
