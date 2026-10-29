"use client";

import React, { useEffect, useState, useRef } from "react";
import "./cloud-transition.css";

export interface CloudTransitionProps {
  isActive: boolean;
  onCovered?: () => void;
  onComplete?: () => void;
  holdDurationMs?: number;
}

export default function CloudTransition({
  isActive,
  onCovered,
  onComplete,
  holdDurationMs = 1400,
}: CloudTransitionProps) {
  // "idle" → not shown | "ready" → mounted off-screen | "closing" → sliding in | "covered" → fully shut | "opening" → sliding out | "done" → cleanup
  const [phase, setPhase] = useState<"idle" | "ready" | "closing" | "covered" | "opening" | "done">("idle");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) { setPhase("idle"); return; }

    // 1. Mount off-screen first
    setPhase("ready");

    // 2. Next frame: start sliding inward (browser needs 2 frames to paint initial position)
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setPhase("closing");
      });
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive]);

  useEffect(() => {
    if (phase !== "closing") return;
    // Wait for CSS transition to finish (1s)
    const t = setTimeout(() => {
      setPhase("covered");
      onCovered?.();
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, onCovered]);

  useEffect(() => {
    if (phase !== "covered") return;
    const t = setTimeout(() => setPhase("opening"), holdDurationMs);
    return () => clearTimeout(t);
  }, [phase, holdDurationMs]);

  useEffect(() => {
    if (phase !== "opening") return;
    const t = setTimeout(() => { setPhase("done"); onComplete?.(); }, 1000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  if (phase === "idle" || phase === "done") return null;

  const cls =
    phase === "ready" ? "" :
      phase === "closing" || phase === "covered" ? "is-closing" :
        "is-opening";

  return (
    <div className={`hh-cloud-overlay ${cls}`} aria-hidden="true">
      {/* Awan Kiri: solid putih + tepi bergelombang di sisi depan (tengah) */}
      <div className="hh-cloud-wing hh-cloud-left">
        <div className="hh-cloud-solid" />
        <svg viewBox="0 0 200 1000" preserveAspectRatio="none" className="hh-cloud-edge">
          <path d="M0,0 L200,0 Q80,125 160,250 Q40,375 160,500 Q40,625 160,750 Q80,875 200,1000 L0,1000 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Awan Kanan: solid putih + tepi bergelombang (cermin) */}
      <div className="hh-cloud-wing hh-cloud-right">
        <div className="hh-cloud-solid" />
        <svg viewBox="0 0 200 1000" preserveAspectRatio="none" className="hh-cloud-edge">
          <path d="M200,0 L0,0 Q120,125 40,250 Q160,375 40,500 Q160,625 40,750 Q120,875 0,1000 L200,1000 Z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}