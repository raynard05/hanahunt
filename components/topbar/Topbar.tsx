"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AudioToggle from "@/components/audio/AudioToggle";
import GameTimer from "@/components/timer/GameTimer";
import GameScore from "@/components/score/GameScore";
import "./topbar.css";

interface TopbarProps {
  score?: number;
  timerSeconds?: number;
  isTimerRunning?: boolean;
  onTimeUp?: () => void;
  onTick?: (secondsLeft: number) => void;
  onHomeClick?: () => void;
  className?: string;
}

export default function Topbar({
  score = 0,
  timerSeconds = 1800,
  isTimerRunning = true,
  onTimeUp,
  onTick,
  onHomeClick,
  className = "",
}: TopbarProps) {
  const router = useRouter();

  const handleHome = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      router.push("/menu");
    }
  };

  return (
    <header className={`hh-topbar-root ${className}`} role="banner">
      {/* Tombol Home di Kiri */}
      <div className="hh-topbar-left">
        <button
          type="button"
          id="hh-topbar-btn-home"
          className="hh-topbar-home-btn"
          onClick={handleHome}
          aria-label="Bali menyang Menu Utama"
          title="Bali menyang Menu Utama"
        >
          <Image
            src="/assets/main/button_rev/home.png"
            alt="Home Button"
            width={75}
            height={75}
            priority
            className="hh-topbar-home-img"
          />
        </button>
      </div>

      {/* Tengah: Timer + Skor berdampingan */}
      <div className="hh-topbar-center">
        <GameTimer
          initialSeconds={timerSeconds}
          isRunning={isTimerRunning}
          onTimeUp={onTimeUp}
          onTick={onTick}
        />
        <GameScore score={score} />
      </div>

      {/* Kanan: Komponen AudioToggle (sound on/off) */}
      <div className="hh-topbar-right">
        <AudioToggle className="hh-topbar-audio-btn" />
      </div>
    </header>
  );
}
