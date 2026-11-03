"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./game-score.css";

interface GameScoreProps {
  score: number;
  className?: string;
}

export default function GameScore({ score, className = "" }: GameScoreProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (score > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 800);
      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    <div
      className={`hh-score-container ${animate ? "is-bumping" : ""} ${className}`}
      role="status"
      aria-label={`Skor game saiki: ${score}`}
    >
      <div className="hh-score-badge">
        <div className="hh-score-star-wrap">
          <Image
            src="/assets/main/bintang.png"
            alt="Ikon Bintang Skor"
            width={48}
            height={48}
            priority
            className="hh-score-star-img"
          />
        </div>
        <div className="hh-score-info">
          <span className="hh-score-label">SKOR</span>
          <span className="hh-score-value">{score}</span>
        </div>
      </div>
    </div>
  );
}
