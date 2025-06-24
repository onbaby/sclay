import React, { useState, useEffect } from 'react';
import SplitText, { SplitTextProps } from './SplitText';

interface RotatingSplitTextProps extends Omit<SplitTextProps, 'text'> {
  texts: string[];
  rotationInterval?: number;
}

const RotatingSplitText: React.FC<RotatingSplitTextProps> = ({
  texts,
  rotationInterval = 2000,
  ...splitTextProps
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length > 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, rotationInterval);
      return () => clearInterval(interval);
    }
  }, [texts.length, rotationInterval]);

  return <SplitText key={index} text={texts[index]} {...splitTextProps} />;
};

export default RotatingSplitText; 