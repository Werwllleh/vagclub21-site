import { useEffect } from 'react';

export const useBlockWrap = (active, onClose) => {
  useEffect(() => {
    const wrap = document.querySelector('html');

    if (wrap) {
      if (active) {
        wrap.classList.add('block');
      } else {
        wrap.classList.remove('block');
      }

      const handleClick = () => {
        if (onClose) {
          onClose();
        }
      };

      wrap.addEventListener('click', handleClick);

      return () => {
        wrap.removeEventListener('click', handleClick);
        wrap.classList.remove('block');
      };
    }
  }, [active, onClose]);
};
