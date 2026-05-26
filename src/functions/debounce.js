export const debounce = (func, delay) => {
  let timer;

  const debounced = function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };

  debounced.cancel = () => clearTimeout(timer);

  return debounced;
};