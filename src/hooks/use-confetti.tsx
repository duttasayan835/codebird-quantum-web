
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const useConfetti = () => {
  const [isActive, setIsActive] = useState(false);
  const { width, height } = useWindowSize();

  const triggerConfetti = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 5000);
  };

  const ConfettiComponent = isActive ? (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
    />
  ) : null;

  return {
    isActive,
    triggerConfetti,
    ConfettiComponent,
  };
};

export default useConfetti;
