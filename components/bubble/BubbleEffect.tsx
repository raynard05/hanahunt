"use client";

import React, { useId } from "react";
import Image from "next/image";
import "./bubble-effect.css";

interface BubbleItem {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
}

// Konfigurasi sebaran gelembung alami di area panel kiri (0 - 46vw)
const DEFAULT_BUBBLES: BubbleItem[] = [
  { id: 1, left: "4vw", size: "3.2vw", duration: "7.5s", delay: "0s" },
  { id: 2, left: "12vw", size: "4.5vw", duration: "9.2s", delay: "1.8s" },
  { id: 3, left: "20vw", size: "2.8vw", duration: "6.8s", delay: "3.5s" },
  { id: 4, left: "28vw", size: "5.2vw", duration: "10.5s", delay: "0.8s" },
  { id: 5, left: "36vw", size: "3.6vw", duration: "8.1s", delay: "4.2s" },
  { id: 6, left: "42vw", size: "4.2vw", duration: "8.8s", delay: "2.4s" },
  { id: 7, left: "8vw", size: "2.4vw", duration: "6.2s", delay: "5.1s" },
  { id: 8, left: "24vw", size: "3.8vw", duration: "7.9s", delay: "6.5s" },
  { id: 9, left: "16vw", size: "4.8vw", duration: "9.6s", delay: "3.0s" },
  { id: 10, left: "32vw", size: "2.9vw", duration: "7.1s", delay: "5.8s" },
];

export interface BubbleEffectProps {
  /** Override daftar bubble jika ingin mengatur posisi custom */
  bubbles?: BubbleItem[];
}

export default function BubbleEffect({ bubbles = DEFAULT_BUBBLES }: BubbleEffectProps) {
  const instanceId = useId();

  return (
    <div className="hh-bubble-panel" aria-hidden="true">
      {bubbles.map((b) => (
        <div
          key={`${instanceId}-bubble-${b.id}`}
          className="hh-bubble-item"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        >
          <Image
            src="/assets/main/gelembung.png"
            alt="Gelembung"
            width={100}
            height={100}
            priority
            className="hh-bubble-img"
          />
        </div>
      ))}
    </div>
  );
}
