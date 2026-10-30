import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  gravity: number;
  drag: number;
  decay: number;
  sparkle: boolean;
}

interface CrackerRocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
}

export const DiwaliCrackerBlastCanvas: React.FC<{ isEnabled?: boolean }> = ({
  isEnabled = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState<boolean>(isEnabled);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<CrackerRocket[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const lastAutoBurstTime = useRef<number>(Date.now());

  // Vibrant Diwali cracker color palettes
  const colorPalettes = [
    ['#FDE047', '#F59E0B', '#EF4444', '#FFFFFF'], // Classic Golden & Ruby Sparkler
    ['#FF6B00', '#FFB547', '#F43F5E', '#FDE047'], // Saffron & Fire Orange
    ['#00E5FF', '#3478F6', '#FBBF24', '#FFFFFF'], // Electric Cyan & Gold Rocket
    ['#10B981', '#34D399', '#FDE047', '#F59E0B'], // Auspicious Green & Gold Anar
    ['#EC4899', '#A855F7', '#FBBF24', '#FFFFFF'], // Magenta & Purple Catherine Wheel
  ];

  // Helper to spawn a cracker blast at (x, y)
  const createCrackerBlast = (x: number, y: number, paletteIdx?: number) => {
    const palette =
      colorPalettes[
        paletteIdx !== undefined
          ? paletteIdx % colorPalettes.length
          : Math.floor(Math.random() * colorPalettes.length)
      ];

    const particleCount = 45 + Math.floor(Math.random() * 30);
    const burstSpeed = 3.5 + Math.random() * 4;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const speed = burstSpeed * (0.3 + Math.random() * 0.9);
      const color = palette[Math.floor(Math.random() * palette.length)];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: 1.5 + Math.random() * 2.5,
        gravity: 0.06 + Math.random() * 0.04,
        drag: 0.96,
        decay: 0.012 + Math.random() * 0.016,
        sparkle: Math.random() > 0.4,
      });
    }

    // Add extra glittering micro-sparks for that authentic Diwali phuljhadi crackle
    for (let j = 0; j < 20; j++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * burstSpeed * 1.3;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: '#FFFFFF',
        size: 1 + Math.random() * 1.5,
        gravity: 0.08,
        drag: 0.94,
        decay: 0.025 + Math.random() * 0.03,
        sparkle: true,
      });
    }
  };

  // Helper to launch an aerial rocket
  const launchRocket = (startX?: number, targetY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = startX !== undefined ? startX : canvas.width * 0.15 + Math.random() * canvas.width * 0.7;
    const destY = targetY !== undefined ? targetY : canvas.height * 0.12 + Math.random() * canvas.height * 0.35;

    rocketsRef.current.push({
      x,
      y: canvas.height,
      targetY: destY,
      vy: -(7.5 + Math.random() * 4),
      color: '#FDE047',
      trail: [],
    });
  };

  // Handle canvas sizing and responsiveness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Main animation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      // Clear with transparent overlay
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      // Periodically trigger live aerial cracker blast (every 3.2 - 4.5 seconds)
      if (now - lastAutoBurstTime.current > 3400) {
        lastAutoBurstTime.current = now;
        if (Math.random() > 0.4) {
          launchRocket();
        } else {
          // Flowerpot / Anar burst from bottom-center
          createCrackerBlast(
            canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
            canvas.height * 0.2 + Math.random() * canvas.height * 0.4
          );
        }
      }

      // ── Update and Render Rockets ──
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.y += r.vy;

        // Add rocket tail particle
        r.trail.push({ x: r.x, y: r.y, alpha: 0.9 });
        if (r.trail.length > 8) r.trail.shift();

        // Draw trail
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 224, 71, ${pt.alpha * (t / r.trail.length)})`;
          ctx.fill();
        }

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Check if rocket reached zenith
        if (r.y <= r.targetY || r.vy >= 0) {
          createCrackerBlast(r.x, r.y);
          rocketsRef.current.splice(i, 1);
        }
      }

      // ── Update and Render Blast Particles ──
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Sparkle scintillation
        const currentAlpha = p.sparkle && Math.random() > 0.35 ? p.alpha * 0.5 : p.alpha;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [active]);

  // Click-to-launch interactive cracker burst on page background
  useEffect(() => {
    if (!active) return;

    const handleWindowClick = (e: MouseEvent) => {
      // Don't burst on input or button clicks so user interactions are natural
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'A' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a'))
      ) {
        return;
      }

      createCrackerBlast(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [active]);

  return (
    <>
      {/* ── Fixed Transparent Fireworks Canvas ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 select-none"
        aria-hidden="true"
        style={{ display: active ? 'block' : 'none' }}
      />

      {/* ── Floating Diwali Live Cracker Control Pill ── */}
      <div className="fixed bottom-20 left-4 z-40 select-none hidden sm:block">
        <button
          type="button"
          onClick={() => setActive((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold backdrop-blur-md transition-all shadow-lg border ${
            active
              ? 'bg-gradient-to-r from-amber-500/25 to-brand-orange/25 border-amber-400/50 text-amber-300 hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Toggle live Diwali fireworks and cracker blasts"
          aria-label="Toggle Diwali Fireworks"
        >
          <Sparkles className={`w-3.5 h-3.5 ${active ? 'text-amber-400 animate-spin-slow' : 'text-slate-500'}`} />
          <span>Crackers {active ? 'LIVE 🎆' : 'OFF'}</span>
        </button>
      </div>
    </>
  );
};
