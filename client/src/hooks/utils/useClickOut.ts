import { useEffect, useRef } from 'react';

const useClickOut = (closeModal: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLDivElement))
        closeModal();
    };

    document.addEventListener('click', handleClickOut, true);

    return () => document.removeEventListener('click', handleClickOut, true);
  }, [ref, closeModal]);

  return ref;
};
export default useClickOut;
