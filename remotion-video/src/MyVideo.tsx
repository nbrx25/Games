import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const ACCENT = "#f5c842";
const BG = "#1a0a2e";
const TEXT = "#f0e6d3";
const RED = "#e84040";

const Scanlines: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
      pointerEvents: "none",
      zIndex: 10,
    }}
  />
);

const VignetteOverlay: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
      pointerEvents: "none",
      zIndex: 9,
    }}
  />
);

const StarField: React.FC<{ frame: number }> = ({ frame }) => {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: ((i * 137.5 + 11) % 100),
    y: ((i * 73.1 + 29) % 100),
    size: (i % 3) + 1,
    opacity: 0.3 + ((i % 5) * 0.14),
    twinkleOffset: i * 7,
  }));
  return (
    <AbsoluteFill style={{ zIndex: 1 }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: ACCENT,
            opacity:
              s.opacity *
              (0.7 + 0.3 * Math.sin((frame + s.twinkleOffset) * 0.12)),
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

interface LineProps {
  text: string;
  delay: number;
  frame: number;
  fps: number;
  color?: string;
}

const AnimatedLine: React.FC<LineProps> = ({ text, delay, frame, fps, color }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        color: color ?? TEXT,
        fontFamily: "'Courier New', monospace",
        fontSize: 26,
        lineHeight: 1.7,
        textShadow: "0 0 12px rgba(245,200,66,0.4)",
        letterSpacing: "0.04em",
      }}
    >
      {text}
    </div>
  );
};

export const MyVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 60 } });
  const titleOpacity = interpolate(Math.min(frame, 20), [0, 20], [0, 1]);
  const subtitleOpacity = spring({ frame: frame - 18, fps, config: { damping: 16, stiffness: 70 } });

  const dividerWidth = interpolate(
    spring({ frame: frame - 35, fps, config: { damping: 16, stiffness: 60 } }),
    [0, 1],
    [0, 520]
  );

  const lines = [
    { text: "Eres nbrx25, un desarrollador creativo", delay: 50 },
    { text: "apasionado por los videojuegos.", delay: 65 },
    { text: "", delay: 75 },
    { text: "Tu proyecto simi-invaders demuestra tu amor", delay: 80 },
    { text: "por los clásicos arcade, reimaginados con", delay: 95 },
    { text: "la estética vintage de Cuphead.", delay: 110 },
    { text: "", delay: 120 },
    { text: "Combinas arte y código con un estilo visual", delay: 125 },
    { text: "audaz: colores ricos, animaciones fluidas", delay: 140 },
    { text: "y una sensación de nostalgia auténtica.", delay: 155 },
    { text: "", delay: 165 },
    { text: "Hablas español y tienes una visión clara:", delay: 170 },
    { text: "crear experiencias que se sienten únicas.", delay: 185 },
  ];

  const glowPulse = 0.6 + 0.4 * Math.sin(frame * 0.08);

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      <StarField frame={frame} />
      <VignetteOverlay />
      <Scanlines />

      {/* Decorative corner frames */}
      {([
        { top: 20, left: 20, deg: 0 },
        { top: 20, right: 20, deg: 90 },
        { bottom: 20, right: 20, deg: 180 },
        { bottom: 20, left: 20, deg: 270 },
      ] as Array<{ top?: number; left?: number; right?: number; bottom?: number; deg: number }>).map(({ deg, ...pos }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 50,
            height: 50,
            borderTop: `4px solid ${ACCENT}`,
            borderLeft: `4px solid ${ACCENT}`,
            transform: `rotate(${deg}deg)`,
            opacity: 0.7,
            zIndex: 8,
            ...pos,
          }}
        />
      ))}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          padding: "60px 80px",
        }}
      >
        {/* Title */}
        <div
          style={{
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 18,
              color: RED,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 8,
              textShadow: `0 0 ${16 * glowPulse}px ${RED}`,
            }}
          >
            ✦ PERFIL ✦
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 64,
              fontWeight: "bold",
              color: ACCENT,
              letterSpacing: "0.08em",
              textShadow: `0 0 ${30 * glowPulse}px rgba(245,200,66,0.6), 4px 4px 0px rgba(0,0,0,0.5)`,
              lineHeight: 1,
            }}
          >
            nbrx25
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 16,
            color: "#a89fd0",
            letterSpacing: "0.25em",
            opacity: subtitleOpacity,
            marginBottom: 28,
          }}
        >
          GAME DEVELOPER · PIXEL ARTIST · CREATIVE CODER
        </div>

        {/* Divider */}
        <div
          style={{
            width: dividerWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${ACCENT}, ${RED}, ${ACCENT}, transparent)`,
            marginBottom: 32,
            boxShadow: `0 0 10px ${ACCENT}`,
          }}
        />

        {/* Paragraph lines */}
        <div style={{ maxWidth: 680, textAlign: "center" }}>
          {lines.map((line, i) => (
            <AnimatedLine
              key={i}
              text={line.text}
              delay={line.delay}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            color: "#6a5d8a",
            letterSpacing: "0.2em",
            opacity: interpolate(frame, [200, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          ✦ GENERADO CON REMOTION · 2026 ✦
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
