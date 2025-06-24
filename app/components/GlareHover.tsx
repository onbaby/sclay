import React, { useRef } from 'react';

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
}

const GlareHover: React.FC<GlareHoverProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative isolate overflow-hidden ${className || ''}`}
      style={{
        background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.15), transparent 80%)',
      }}
    >
      {children}
    </div>
  );
};

export default GlareHover; 