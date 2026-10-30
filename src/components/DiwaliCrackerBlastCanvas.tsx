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
  const lastAutoBurstTime = useRef<number>(0);

  // Vibrant Diwali cracker color palettes
  const colorPalettes = [
    ['#FDE047', '#F59E0B', '#EF4444', '#FFFFFF'], // Classic Golden & Ruby Sparkler
    ['#FF6B00', '#FFB547', '#F43F5E', '#FDE047'], // Saffron & Fire Orange
    ['#00E5FF', '#3478F6', '#FBBF24', '#FFFFFF'], // Electric Cyan & Gold Rocket
    ['#10B981', '#34D399', '#FDE047', '#F59E0B'], // Auspicious Green & Gold Anar
    ['#EC4899', '#A855F7', '#FBBF24', '#FFFFFF'], // Magenta & Purple Catherine Wheel
    ['#FFE082', '#FFD54F', '#FFA000', '#FF6F00'], // Pure 24K Gold Phuljhadi
  ];

  // Helper to spawn a cracker blast at (x, y)
  const createCrackerBlast = (x: number, y: number, paletteIdx?: number) => {
    const palette =
      colorPalettes[
        paletteIdx !== undefined
          ? paletteIdx % colorPalettes.length
          : Math.floor(Math.random() * colorPalettes.length)
      ];

    const particleCount = 50 + Math.floor(Math.random() * 35);
    const burstSpeed = 4.5 + Math.random() * 4.5;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const speed = burstSpeed * (0.35 + Math.random() * 0.85);
      const color = palette[Math.floor(Math.random() * palette.length)];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: 2 + Math.random() * 3,
        gravity: 0.07 + Math.random() * 0.04,
        drag: 0.96,
        decay: 0.011 + Math.random() * 0.014,
        sparkle: Math.random() > 0.35,
      });
    }

    // Add extra glittering micro-sparks for authentic Diwali phuljhadi crackle
    for (let j = 0; j < 25; j++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * burstSpeed * 1.4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: '#FFFFFF',
        size: 1.5 + Math.random() * 1.5,
        gravity: 0.09,
        drag: 0.93,
        decay: 0.022 + Math.random() * 0.025,
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
      vy: -(8.5 + Math.random() * 4),
      color: '#FDE047',
      trail: [],
    });
  };

  // Immediate welcome bursts when website opens
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Trigger immediate celebratory bursts upon opening
    const timer1 = setTimeout(() => {
      createCrackerBlast(window.innerWidth * 0.25, window.innerHeight * 0.3);
    }, 250);

    const timer2 = setTimeout(() => {
      createCrackerBlast(window.innerWidth * 0.75, window.innerHeight * 0.28);
    }, 600);

    const timer3 = setTimeout(() => {
      createCrackerBlast(window.innerWidth * 0.5, window.innerHeight * 0.22);
    }, 950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [active]);

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

  // Main animation render loop (Continuous fireworks)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      // Continuous celebratory blasts every 1.8 - 2.4 seconds!
      if (now - lastAutoBurstTime.current > 1900) {
        lastAutoBurstTime.current = now;
        if (Math.random() > 0.35) {
          launchRocket();
        } else {
          // Flowerpot / Anar fountain burst
          createCrackerBlast(
            canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
            canvas.height * 0.18 + Math.random() * canvas.height * 0.38
          );
        }
      }

      // ── Update and Render Rockets ──
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.y += r.vy;

        r.trail.push({ x: r.x, y: r.y, alpha: 0.95 });
        if (r.trail.length > 10) r.trail.shift();

        // Draw trail
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 224, 71, ${pt.alpha * (t / r.trail.length)})`;
          ctx.fill();
        }

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 12;
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

        const currentAlpha = p.sparkle && Math.random() > 0.3 ? p.alpha * 0.6 : p.alpha;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3.5;
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

  // Click-to-launch interactive cracker burst anywhere on screen!
  useEffect(() => {
    if (!active) return;

    const handleWindowClick = (e: MouseEvent) => {
      createCrackerBlast(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [active]);

  return (
    <>
      {/* ── Fixed Transparent Fireworks Canvas at z-30 (Visible across all page sections) ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 select-none"
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
              ? 'bg-gradient-to-r from-amber-500/30 to-brand-orange/30 border-amber-400/60 text-amber-300 hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Toggle live Diwali fireworks and cracker blasts"
          aria-label="Toggle Diwali Fireworks"
        >
          <Sparkles className={`w-3.5 h-3.5 ${active ? 'text-amber-400 animate-spin-slow' : 'text-slate-500'}`} />
          <span>Crackers {active ? 'LIVE 🎆' : 'PAUSED'}</span>
        </button>
      </div>
    </>
  );
};
