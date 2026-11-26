"use client";

import { memo, useEffect, useRef } from "react";

type FireworksProps = {
    className?: string;
    /** Burst colours (any CSS colour). */
    colors?: string[];
    /** Average ms between automatic launches. */
    interval?: number;
};

type Rocket = {
    x: number;
    y: number;
    vy: number;
    targetY: number;
    color: string;
};

type Spark = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number; // 1 -> 0
    decay: number;
    size: number;
    color: string;
    gravity: number;
    friction: number;
};

const DEFAULT_COLORS = [
    "#ff5d73", // rose
    "#ffb347", // amber
    "#ffe66d", // gold
    "#6ee7b7", // mint
    "#7dd3fc", // sky
    "#c4b5fd", // lavender
    "#ffffff",
];

const MAX_SPARKS = 1800;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function FireworksBase({
    className = "",
    colors = DEFAULT_COLORS,
    interval = 900,
}: FireworksProps) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const launchRef = useRef<((x?: number) => void) | null>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let w = 0;
        let h = 0;
        const rockets: Rocket[] = [];
        const sparks: Spark[] = [];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = wrap.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(wrap);

        const launch = (x?: number) => {
            if (rockets.length > 6) return;
            rockets.push({
                x: x ?? rand(w * 0.12, w * 0.88),
                y: h,
                vy: -rand(h * 0.012, h * 0.016),
                targetY: rand(h * 0.14, h * 0.45),
                color: pick(colors),
            });
        };
        launchRef.current = launch;

        const addSpark = (
            x: number,
            y: number,
            angle: number,
            speed: number,
            color: string,
            opts: Partial<Spark> = {}
        ) => {
            if (sparks.length >= MAX_SPARKS) return;
            sparks.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: rand(0.008, 0.016),
                size: rand(1.2, 2.4),
                color,
                gravity: 0.035,
                friction: 0.975,
                ...opts,
            });
        };

        const burst = (x: number, y: number, base: string) => {
            const kind = pick(["sphere", "ring", "willow", "double"] as const);
            const second = pick(colors);

            if (kind === "sphere") {
                const n = Math.round(rand(70, 110));
                for (let i = 0; i < n; i++) {
                    addSpark(x, y, rand(0, Math.PI * 2), rand(0.6, 4.2), base);
                }
            } else if (kind === "ring") {
                const n = 64;
                const tilt = rand(0.5, 1);
                for (let i = 0; i < n; i++) {
                    const a = (i / n) * Math.PI * 2;
                    addSpark(x, y, a, 3.4, base, { decay: 0.012 });
                    // squash the ring slightly for a bit of depth
                    const lastSpark = sparks[sparks.length - 1];
                    if (lastSpark) {
                        lastSpark.vy *= tilt;
                    }
                }
            } else if (kind === "willow") {
                const n = Math.round(rand(60, 90));
                for (let i = 0; i < n; i++) {
                    addSpark(x, y, rand(0, Math.PI * 2), rand(0.8, 3.4), "#ffd98a", {
                        decay: rand(0.004, 0.008),
                        gravity: 0.06,
                        friction: 0.965,
                        size: rand(1, 1.8),
                    });
                }
            } else {
                for (let i = 0; i < 50; i++) {
                    addSpark(x, y, rand(0, Math.PI * 2), rand(2.8, 4), base);
                }
                for (let i = 0; i < 40; i++) {
                    addSpark(x, y, rand(0, Math.PI * 2), rand(0.5, 2), second);
                }
            }
        };

        let raf = 0;
        let last = performance.now();
        let nextLaunch = last + 300;

        const frame = (now: number) => {
            const dt = Math.min((now - last) / 16.667, 3); // 1 = one 60fps frame
            last = now;

            // fade previous frame to leave trails while keeping the canvas transparent
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = `rgba(0,0,0,${Math.min(0.22 * dt, 0.6)})`;
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = "lighter";

            if (now >= nextLaunch) {
                launch();
                if (Math.random() < 0.3) launch();
                nextLaunch = now + rand(interval * 0.5, interval * 1.5);
            }

            // rockets
            for (let i = rockets.length - 1; i >= 0; i--) {
                const r = rockets[i];
                r.y += r.vy * dt;
                r.vy *= 0.992; // slow slightly on the way up
                ctx.beginPath();
                ctx.fillStyle = r.color;
                ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
                ctx.fill();
                // little exhaust
                if (Math.random() < 0.7) {
                    addSpark(r.x, r.y, Math.PI / 2 + rand(-0.3, 0.3), rand(0.3, 1), "#ffd9a0", {
                        decay: 0.06,
                        size: 1,
                        gravity: 0.02,
                    });
                }
                if (r.y <= r.targetY || r.vy > -1.2) {
                    burst(r.x, r.y, r.color);
                    rockets.splice(i, 1);
                }
            }

            // sparks
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.vx *= Math.pow(s.friction, dt);
                s.vy = s.vy * Math.pow(s.friction, dt) + s.gravity * dt;
                s.x += s.vx * dt;
                s.y += s.vy * dt;
                s.life -= s.decay * dt;
                if (s.life <= 0) {
                    sparks.splice(i, 1);
                    continue;
                }
                // twinkle near the end of life
                const twinkle = s.life < 0.35 && Math.random() < 0.3 ? 0.3 : 1;
                ctx.globalAlpha = Math.max(s.life, 0) * twinkle;
                ctx.beginPath();
                ctx.fillStyle = s.color;
                ctx.arc(s.x, s.y, s.size * (0.5 + s.life * 0.5), 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            raf = requestAnimationFrame(frame);
        };

        if (reduced) {
            // one static burst, no animation loop
            burst(w / 2, h * 0.35, colors[0]);
            for (let i = 0; i < 40; i++) {
                for (const s of sparks) {
                    s.x += s.vx * 8;
                    s.y += s.vy * 8;
                    s.vy += s.gravity * 8;
                }
            }
            ctx.globalCompositeOperation = "lighter";
            for (const s of sparks) {
                ctx.globalAlpha = 0.7;
                ctx.fillStyle = s.color;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            raf = requestAnimationFrame(frame);
        }

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            launchRef.current = null;
        };
    }, [colors, interval]);

    return (
        <div
            ref={wrapRef}
            onPointerDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                launchRef.current?.(e.clientX - rect.left);
            }}
            className={`relative w-full overflow-hidden bg-gradient-to-b from-[#05060f] via-[#0b1030] to-[#1a1440] ${className}`}
        >
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
            />
        </div>
    );
}

export const Fireworks = memo(FireworksBase);
export default Fireworks;
