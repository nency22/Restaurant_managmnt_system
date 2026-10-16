import { prefersReducedMotion } from "./motion";

const COLORS = ["#C5A059", "#E8D3A2", "#8C6D3B", "#FAF7F2", "#D97736", "#8DA985"];

export const celebrate = ({ x = 0.5, y = 0.4, count = 90 } = {}) => {
  if (prefersReducedMotion() || typeof document === "undefined") return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "2000",
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const pieces = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    return {
      x: x * width,
      y: y * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      grain: Math.random() < 0.35,
      age: 0,
    };
  });

  const LIFETIME = 150;

  const tick = () => {
    ctx.clearRect(0, 0, width, height);
    let alive = 0;

    pieces.forEach((p) => {
      p.age += 1;
      p.vy += 0.28;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      if (p.age >= LIFETIME || p.y > height + 20) return;
      alive += 1;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.max(0, 1 - p.age / LIFETIME);
      ctx.fillStyle = p.color;
      if (p.grain) {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }
      ctx.restore();
    });

    if (alive > 0) requestAnimationFrame(tick);
    else canvas.remove();
  };

  requestAnimationFrame(tick);
};
