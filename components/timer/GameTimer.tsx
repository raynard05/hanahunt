"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./game-timer.css";

interface GameTimerProps {
  initialSeconds?: number;
  isRunning?: boolean;
  onTimeUp?: () => void;
  onTick?: (secondsLeft: number) => void;
  className?: string;
}

export default function GameTimer({
  initialSeconds = 1800, // Default 30 menit (1800 detik)
  isRunning = true,
  onTimeUp,
  onTick,
  className = "",
}: GameTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    onTick?.(secondsLeft);
  }, [secondsLeft, onTick]);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

  const isWarning = secondsLeft <= 60 && secondsLeft > 0;
  const isDanger = secondsLeft <= 20 && secondsLeft > 0;

  return (
    <div
      className={`hh-timer-container ${isWarning ? "is-warning" : ""} ${isDanger ? "is-danger" : ""} ${className}`}
      role="timer"
      aria-label={`Wektu sisa ${formattedTime}`}
    >
      <div className="hh-timer-badge">
        <svg
          viewBox="0 0 24 24"
          className="hh-timer-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="hh-timer-digits">{formattedTime}</span>
      </div>
    </div>
  );
}
