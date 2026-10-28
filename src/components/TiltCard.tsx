import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  perspective?: number;
  glareOpacity?: number;
  glareColor?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  style = {},
  maxTilt = 12,
  perspective = 1000,
  glareOpacity = 0.18,
  glareColor = 'rgba(255, 255, 255, 0.4)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glare, setGlare] = useState<{ x: number; y: number; active: boolean }>({ x: 50, y: 50, active: false });
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanHover(hasFinePointer && !prefersReducedMotion);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = x / rect.width;
    const percentY = y / rect.height;

    const tiltX = (percentY - 0.5) * -maxTilt * 2;
    const tiltY = (percentX - 0.5) * maxTilt * 2;

    setTilt({ x: tiltX, y: tiltY });
    setGlare({ x: percentX * 100, y: percentY * 100, active: true });
  }, [canHover, maxTilt]);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative transition-transform duration-200 ease-out preserve-3d ${className}`}
      style={{
        perspective: `${perspective}px`,
        transform: canHover && (tilt.x !== 0 || tilt.y !== 0)
          ? `perspective(${perspective}px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateZ(8px)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* Dynamic Specular Lighting Glare */}
      {canHover && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glare.active ? glareOpacity : 0,
            background: `radial-gradient(circle 240px at ${glare.x}% ${glare.y}%, ${glareColor}, transparent 75%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};
