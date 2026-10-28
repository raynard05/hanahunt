"use client";

import React, { useId } from "react";
import "./mist-effect.css";

interface MistParticle {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
}

// 24 partikel embun air terjun pekat yang menyebar merata dari bawah ke atas
const DEFAULT_MIST_PUFFS: MistParticle[] = [
  { id: 1, left: "5vw", size: "14vw", duration: "9s", delay: "0s" },
  { id: 2, left: "14vw", size: "18vw", duration: "11s", delay: "1.5s" },
  { id: 3, left: "22vw", size: "16vw", duration: "8.5s", delay: "3.2s" },
  { id: 4, left: "30vw", size: "22vw", duration: "12s", delay: "0.5s" },
  { id: 5, left: "38vw", size: "20vw", duration: "10s", delay: "2.8s" },
  { id: 6, left: "46vw", size: "24vw", duration: "13s", delay: "4.2s" },
  { id: 7, left: "54vw", size: "20vw", duration: "11s", delay: "1.2s" },
  { id: 8, left: "62vw", size: "22vw", duration: "9.8s", delay: "3.5s" },
  { id: 9, left: "70vw", size: "18vw", duration: "12.5s", delay: "5.0s" },
  // { id: 10, left: "78vw", size: "16vw", duration: "10.2s", delay: "2.0s" },
  // { id: 11, left: "86vw", size: "15vw", duration: "11.8s", delay: "4.5s" },
  // { id: 12, left: "92vw", size: "14vw", duration: "9.2s", delay: "0.8s" },
  // { id: 13, left: "10vw", size: "16vw", duration: "10.5s", delay: "6.0s" },
  // { id: 14, left: "26vw", size: "19vw", duration: "11.2s", delay: "7.2s" },
  // { id: 15, left: "34vw", size: "21vw", duration: "9.6s", delay: "5.5s" },
  // { id: 16, left: "42vw", size: "25vw", duration: "12.8s", delay: "7.8s" },
  // { id: 17, left: "50vw", size: "22vw", duration: "10.4s", delay: "6.5s" },
  // { id: 18, left: "58vw", size: "20vw", duration: "11.6s", delay: "8.2s" },
  // { id: 19, left: "66vw", size: "17vw", duration: "9.4s", delay: "6.8s" },
  // { id: 20, left: "74vw", size: "19vw", duration: "12.2s", delay: "8.8s" },
  // { id: 21, left: "18vw", size: "15vw", duration: "10.8s", delay: "9.5s" },
  // { id: 22, left: "48vw", size: "23vw", duration: "13.2s", delay: "10.2s" },
  // { id: 23, left: "82vw", size: "16vw", duration: "11.0s", delay: "7.5s" },
  // { id: 24, left: "2vw", size: "14vw", duration: "9.8s", delay: "5.0s" },
];

export interface MistEffectProps {
  /** Override partikel embun jika ingin custom sebaran */
  particles?: MistParticle[];
}

export default function MistEffect({ particles = DEFAULT_MIST_PUFFS }: MistEffectProps) {
  const instanceId = useId();

  return (
    <div className="hh-mist-viewport" aria-hidden="true">
      {/* Layer 1: Ambient Bottom Haze / Kabut Dasar */}
      <div className="hh-mist-ambient-glow" />

      {/* Layer 2: Awan Kabut Lebar yang Bergeser Perlahan */}
      <div className="hh-mist-cloud hh-mist-cloud-1" />
      <div className="hh-mist-cloud hh-mist-cloud-2" />

      {/* Layer 3: Partikel Embun Air Terjun yang Membumbung Naik ke Atas */}
      {particles.map((p) => (
        <div
          key={`${instanceId}-mist-${p.id}`}
          className="hh-mist-puff"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
