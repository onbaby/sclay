'use client';

import Script from 'next/script';

const VantaScript = () => {
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds2.min.js" strategy="beforeInteractive" />
    </>
  );
};

export default VantaScript; 