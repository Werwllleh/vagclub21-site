export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer); // Очищаем предыдущий таймер
    timer = setTimeout(() => func.apply(this, args), delay); // Устанавливаем новый таймер
  };
};
