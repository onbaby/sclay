'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS2 from 'vanta/dist/vanta.clouds2.min';

const VantaClouds = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(CLOUDS2({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 2.00,
        backgroundColor: 0x030712,
        speed: 2.2,
        texturePath: "/gallery/noise.png"
      }));
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div 
      ref={vantaRef} 
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default VantaClouds; 