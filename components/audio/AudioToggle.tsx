"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./audio-toggle.css";

interface AudioToggleProps {
  className?: string;
  onToggle?: (isMuted: boolean) => void;
}

export default function AudioToggle({ className = "", onToggle }: AudioToggleProps) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Membaca preferensi suara tersimpan jika ada
    try {
      const saved = localStorage.getItem("hana_hunt_sound_muted");
      if (saved !== null) {
        setIsMuted(saved === "true");
      }
    } catch {
      // Abaikan jika SSR / storage dibatasi
    }
  }, []);

  const handleToggle = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    try {
      localStorage.setItem("hana_hunt_sound_muted", String(nextState));
    } catch {
      // Abaikan
    }
    if (onToggle) {
      onToggle(nextState);
    }
  };

  return (
    <button
      type="button"
      id="hh-btn-sound-toggle"
      className={`hh-audio-btn ${className}`}
      onClick={handleToggle}
      aria-label={isMuted ? "Uripake Swara (Unmute)" : "Pateni Swara (Mute)"}
      title={isMuted ? "Uripake Swara" : "Pateni Swara"}
    >
      <Image
        src={isMuted ? "/assets/main/soundoff.png" : "/assets/main/soundon.png"}
        alt={isMuted ? "Sound Off" : "Sound On"}
        width={70}
        height={70}
        priority
        className="hh-audio-img"
      />
    </button>
  );
}
