"use client";

import React, { useId } from "react";
import Image from "next/image";
import "./falling-leaves.css";

export interface LeafParticle {
  id: number;
  image: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
}

// 14 daun alami berjatuhan perlahan dari atas ke bawah menggunakan Daun1 - Daun7
const DEFAULT_LEAVES: LeafParticle[] = [
  { id: 1, image: "/assets/main/Daun1.png", left: "6vw", size: "2.8vw", duration: "11s", delay: "0s" },
  { id: 2, image: "/assets/main/Daun2.png", left: "18vw", size: "2.4vw", duration: "13.5s", delay: "2.2s" },
  { id: 3, image: "/assets/main/Daun3.png", left: "32vw", size: "3.2vw", duration: "12s", delay: "4.5s" },
  { id: 4, image: "/assets/main/Daun4.png", left: "45vw", size: "2.2vw", duration: "14s", delay: "1.0s" },
  { id: 5, image: "/assets/main/Daun5.png", left: "58vw", size: "3.0vw", duration: "12.5s", delay: "3.8s" },
  { id: 6, image: "/assets/main/Daun6.png", left: "72vw", size: "2.6vw", duration: "15s", delay: "0.5s" },
  { id: 7, image: "/assets/main/Daun7.png", left: "86vw", size: "3.4vw", duration: "13s", delay: "5.2s" },
  { id: 8, image: "/assets/main/Daun2.png", left: "12vw", size: "2.5vw", duration: "14.2s", delay: "6.8s" },
  { id: 9, image: "/assets/main/Daun4.png", left: "25vw", size: "2.1vw", duration: "12.8s", delay: "7.5s" },
  { id: 10, image: "/assets/main/Daun6.png", left: "39vw", size: "2.9vw", duration: "13.8s", delay: "8.2s" },
  { id: 11, image: "/assets/main/Daun1.png", left: "52vw", size: "3.1vw", duration: "11.5s", delay: "9.0s" },
  { id: 12, image: "/assets/main/Daun5.png", left: "65vw", size: "2.7vw", duration: "14.5s", delay: "6.0s" },
  { id: 13, image: "/assets/main/Daun3.png", left: "80vw", size: "3.3vw", duration: "12.2s", delay: "10.0s" },
  { id: 14, image: "/assets/main/Daun7.png", left: "94vw", size: "2.4vw", duration: "13.2s", delay: "7.8s" },
];

export interface FallingLeavesProps {
  leaves?: LeafParticle[];
}

export default function FallingLeaves({ leaves = DEFAULT_LEAVES }: FallingLeavesProps) {
  const instanceId = useId();

  return (
    <div className="hh-leaves-viewport" aria-hidden="true">
      {leaves.map((leaf) => (
        <div
          key={`${instanceId}-leaf-${leaf.id}`}
          className="hh-leaves-item"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
          }}
        >
          <Image
            src={leaf.image}
            alt="Daun Berjatuhan"
            width={120}
            height={120}
            priority
            className="hh-leaves-img"
          />
        </div>
      ))}
    </div>
  );
}
