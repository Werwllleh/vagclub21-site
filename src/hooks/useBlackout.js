import { useEffect } from 'react';

export const useBlackout = (active, onClose) => {
  useEffect(() => {
    const blackoutWrap = document.querySelector('.overlay');

    if (blackoutWrap) {
      // Добавляем или удаляем класс 'active' в зависимости от значения active
      if (active) {
        blackoutWrap.classList.add('active');
      } else {
        blackoutWrap.classList.remove('active');
      }

      // Добавляем обработчик клика на затемнение
      const handleClick = () => {
        if (onClose) {
          onClose();
        }
      };

      blackoutWrap.addEventListener('click', handleClick);

      return () => {
        blackoutWrap.removeEventListener('click', handleClick);
        blackoutWrap.classList.remove('active');
      };
    }
  }, [active, onClose]); // Зависимости: active и onClose
};
