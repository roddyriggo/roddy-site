"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const W = 480;
const H = 640;
const PEG_R = 5;
const BALL_R = 9;
const GRAVITY = 0.13;
const DAMPING = 0.52;
const PEG_SPACING = 40;
const PEG_ROWS = 11;
const PEG_START_Y = 110;
const SLOT_Y = PEG_START_Y + PEG_ROWS * PEG_SPACING; // 550
const SLOT_COUNT = 8;
const SLOT_W = W / SLOT_COUNT; // 60
const SLOT_SCORES = [100, 500, 1000, 2000, 2000, 1000, 500, 100];

type Phase = "aiming" | "dropping" | "scored";
interface Vec { x: number; y: number }
interface Ball { pos: Vec; vel: Vec }

const PEGS: Vec[] = (() => {
  const pegs: Vec[] = [];
  const evenStart = (W - 7 * PEG_SPACING) / 2;
  for (let r = 0; r < PEG_ROWS; r++) {
    const even = r % 2 === 0;
    const count = even ? 8 : 7;
    const sx = even ? evenStart : evenStart + PEG_SPACING / 2;
    for (let c = 0; c < count; c++) {
      pegs.push({ x: sx + c * PEG_SPACING, y: PEG_START_Y + r * PEG_SPACING });
    }
  }
  return pegs;
})();

export default function Plinko() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    phase: "aiming" as Phase,
    launcherX: W / 2,
    ball: null as Ball | null,
    lastScore: 0,
    totalScore: 0,
    keys: new Set<string>(),
    raf: 0,
  });
  const [ui, setUi] = useState({ phase: "aiming" as Phase, last: 0, total: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);

    // Slots
    for (let i = 0; i < SLOT_COUNT; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#f5f5f5" : "#eeeeee";
      ctx.fillRect(i * SLOT_W, SLOT_Y, SLOT_W, H - SLOT_Y);
      if (i > 0) {
        ctx.fillStyle = "#ddd";
        ctx.fillRect(i * SLOT_W - 0.5, SLOT_Y, 1, H - SLOT_Y);
      }
      ctx.fillStyle = "#555";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.fillText(String(SLOT_SCORES[i]), i * SLOT_W + SLOT_W / 2, H - 14);
    }

    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, SLOT_Y - 1, W, 1);

    // Pegs
    ctx.fillStyle = "#222";
    for (const p of PEGS) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, PEG_R, 0, Math.PI * 2);
      ctx.fill();
    }

    // Aiming state
    if (s.phase === "aiming") {
      const lx = s.launcherX;
      ctx.strokeStyle = "#ddd";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lx, 70);
      ctx.lineTo(lx, SLOT_Y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(lx, 50, BALL_R, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    }

    // Active ball
    if (s.ball) {
      ctx.beginPath();
      ctx.arc(s.ball.pos.x, s.ball.pos.y, BALL_R, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    }
  }, []);

  const loop = useCallback(() => {
    const s = stateRef.current;

    if (s.phase === "aiming") {
      if (s.keys.has("ArrowLeft") || s.keys.has("a") || s.keys.has("A")) {
        s.launcherX = Math.max(BALL_R + 8, s.launcherX - 2);
      }
      if (s.keys.has("ArrowRight") || s.keys.has("d") || s.keys.has("D")) {
        s.launcherX = Math.min(W - BALL_R - 8, s.launcherX + 2);
      }
    }

    if (s.phase === "dropping" && s.ball) {
      const b = s.ball;
      b.vel.y += GRAVITY;
      b.vel.x *= 0.999;
      b.pos.x += b.vel.x;
      b.pos.y += b.vel.y;

      if (b.pos.x - BALL_R < 0) { b.pos.x = BALL_R; b.vel.x = Math.abs(b.vel.x) * DAMPING; }
      if (b.pos.x + BALL_R > W) { b.pos.x = W - BALL_R; b.vel.x = -Math.abs(b.vel.x) * DAMPING; }

      for (const p of PEGS) {
        const dx = b.pos.x - p.x;
        const dy = b.pos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = BALL_R + PEG_R;
        if (dist < minDist && dist > 0.01) {
          const nx = dx / dist;
          const ny = dy / dist;
          b.pos.x = p.x + nx * (minDist + 0.5);
          b.pos.y = p.y + ny * (minDist + 0.5);
          const dot = b.vel.x * nx + b.vel.y * ny;
          b.vel.x = (b.vel.x - 2 * dot * nx) * DAMPING;
          b.vel.y = (b.vel.y - 2 * dot * ny) * DAMPING;
          b.vel.x += (Math.random() - 0.5) * 0.4;
        }
      }

      if (b.pos.y + BALL_R >= SLOT_Y) {
        const slot = Math.max(0, Math.min(SLOT_COUNT - 1, Math.floor(b.pos.x / SLOT_W)));
        const pts = SLOT_SCORES[slot];
        s.lastScore = pts;
        s.totalScore += pts;
        s.ball = null;
        s.phase = "scored";
        setUi({ phase: "scored", last: pts, total: s.totalScore });
      }
    }

    draw();
    s.raf = requestAnimationFrame(loop);
  }, [draw]);

  useEffect(() => {
    const s = stateRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      s.keys.add(e.key);

      if (s.phase === "aiming" && (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ")) {
        e.preventDefault();
        s.ball = { pos: { x: s.launcherX, y: 60 }, vel: { x: 0, y: 0.5 } };
        s.phase = "dropping";
        setUi(u => ({ ...u, phase: "dropping" }));
      }

      if (s.phase === "scored" && (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        s.phase = "aiming";
        s.launcherX = W / 2;
        setUi(u => ({ ...u, phase: "aiming" }));
      }
    };

    const onKeyUp = (e: KeyboardEvent) => s.keys.delete(e.key);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    s.raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      cancelAnimationFrame(s.raf);
    };
  }, [loop]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black gap-3 py-10">
      <p className="text-xs tracking-widest uppercase" style={{ color: "#a1a1aa" }}>
        total score: {ui.total.toLocaleString()}
      </p>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ border: "1px solid #e5e7eb" }}
      />
      <p className="text-xs tracking-widest uppercase" style={{ color: "#a1a1aa" }}>
        {ui.phase === "aiming" && "← → to aim · ↑ to drop"}
        {ui.phase === "dropping" && "· · ·"}
        {ui.phase === "scored" && `+${ui.last.toLocaleString()} pts · total ${ui.total.toLocaleString()} · ↑ to play again`}
      </p>
    </main>
  );
}
