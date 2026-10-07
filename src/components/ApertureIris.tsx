"use client";

import React from "react";

interface ApertureIrisProps {
  aperture: number; // e.g. 1.2 to 16
  size?: number;
  interactive?: boolean;
  onApertureChange?: (f: number) => void;
}

export default function ApertureIris({
  aperture,
  size = 120,
  interactive = false,
  onApertureChange,
}: ApertureIrisProps) {
  // Map f-stop (1.2 to 16) to aperture opening radius (34 down to 7)
  const minF = 1.2;
  const maxF = 16;
  const normalized = Math.min(Math.max((Math.log2(aperture) - Math.log2(minF)) / (Math.log2(maxF) - Math.log2(minF)), 0), 1);
  const openRadius = 36 - normalized * 27; // 36px (wide open f/1.2) to 9px (f/16)
  const bladeRotation = normalized * 24; // subtle rotational twist of blades

  const bladeCount = 9;
  const blades = Array.from({ length: bladeCount }, (_, i) => {
    const angle = (i * 360) / bladeCount + bladeRotation;
    return angle;
  });

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "radial-gradient(circle, #0e1118 0%, #06070a 100%)",
          border: "2px solid rgba(197, 160, 89, 0.4)",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(0, 0, 0, 0.9)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Outer barrel markings */}
        <svg
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* Subtle outer ticks */}
          {Array.from({ length: 36 }).map((_, idx) => (
            <line
              key={idx}
              x1="50"
              y1="2"
              x2="50"
              y2={idx % 3 === 0 ? "7" : "4"}
              stroke={idx % 3 === 0 ? "rgba(197,160,89,0.6)" : "rgba(255,255,255,0.15)"}
              strokeWidth="0.8"
              transform={`rotate(${idx * 10} 50 50)`}
            />
          ))}

          {/* Iris Blades */}
          <g transform="translate(50, 50)">
            {blades.map((rot, idx) => (
              <path
                key={idx}
                d={`M 0,-44 C 20,-42 ${openRadius + 12},-${openRadius} ${openRadius},0 C 8,12 -20,24 -36,18 Z`}
                fill="url(#bladeGradient)"
                stroke="#090a0f"
                strokeWidth="0.6"
                transform={`rotate(${rot})`}
                style={{
                  transition: "all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)",
                }}
              />
            ))}
          </g>

          {/* Center aperture opening glow */}
          <circle
            cx="50"
            cy="50"
            r={openRadius}
            fill="#06070a"
            stroke="rgba(0, 240, 255, 0.4)"
            strokeWidth="0.8"
            style={{
              transition: "all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)",
            }}
          />

          <defs>
            <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#252936" />
              <stop offset="50%" stopColor="#1a1d26" />
              <stop offset="100%" stopColor="#10121a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center f-stop display */}
        <span
          className="mono-hud"
          style={{
            fontSize: size < 80 ? "10px" : "12px",
            color: "var(--accent-gold-bright)",
            fontWeight: 600,
            zIndex: 2,
            textShadow: "0 0 6px rgba(0,0,0,0.9)",
            pointerEvents: "none",
          }}
        >
          f/{aperture.toFixed(1)}
        </span>
      </div>

      {interactive && onApertureChange && (
        <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
          {[1.2, 2.0, 2.8, 5.6, 11, 16].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onApertureChange(f)}
              style={{
                background: aperture === f ? "var(--accent-gold)" : "rgba(255,255,255,0.06)",
                color: aperture === f ? "#000" : "var(--text-secondary)",
                border: "none",
                borderRadius: "4px",
                padding: "2px 6px",
                fontSize: "10px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontWeight: aperture === f ? 700 : 500,
                transition: "all 0.15s ease",
              }}
            >
              f/{f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
