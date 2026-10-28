"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import "./coverflow.css";

export interface CoverflowItem {
  id: string;
  title: string;
  subtitle: string;
  category?: string;
  image?: string;
  accentColor?: string;
  badge?: string;
  onClick?: () => void;
}

interface CoverflowProps {
  items?: CoverflowItem[];
  initialIndex?: number;
  onSelect?: (item: CoverflowItem, index: number) => void;
  onPlay?: (item: CoverflowItem, index: number) => void;
}

// Menu Utama Hana Hunt dari assets/menus
const DEFAULT_ITEMS: CoverflowItem[] = [
  {
    id: "wiwiti",
    title: "Wiwiti",
    subtitle: "Miwiti Petualangan Aksara Hana Hunt",
    image: "/assets/menus/wiwiti.webp",
  },
  {
    id: "cara-dolanan",
    title: "Cara Dolanan",
    subtitle: "Pituduh lan Aturan Dolanan Game",
    image: "/assets/menus/caradolanan.webp",
  },
  {
    id: "materi",
    title: "Materi",
    subtitle: "Sinau Aksara Jawa lan Sandhangan",
    image: "/assets/menus/materi.webp",
  },
  {
    id: "tujuan-pembelajaran",
    title: "Tujuan Pembelajaran",
    subtitle: "Tujuane Pasinaon Aksara Jawa",
    image: "/assets/menus/tujuanpembelajaran.webp",
  },
  {
    id: "capaian-pembelajaran",
    title: "Capaian Pembelajaran",
    subtitle: "Target Kompetensi Pasinaon",
    image: "/assets/menus/capaianpembelajaran.webp",
  },
  {
    id: "evaluasi",
    title: "Evaluasi",
    subtitle: "Uji Kawruh lan Kuis Pemahaman",
    image: "/assets/menus/evaluasi.webp",
  },
  {
    id: "profil-pengembang",
    title: "Profil Pengembang",
    subtitle: "Informasi Biodata Pangembang Game",
    image: "/assets/menus/profilpengembang.webp",
  },
];

export default function Coverflow({
  items = DEFAULT_ITEMS,
  initialIndex = 0,
  onSelect,
  onPlay,
}: CoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(0, initialIndex), items.length - 1)
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
  }, [items.length]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Enter" || e.key === " ") {
        if (items[activeIndex]) {
          onPlay?.(items[activeIndex], activeIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, activeIndex, items, onPlay]);

  // Touch gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
  };

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      className="hh-coverflow-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Menu Petualangan Coverflow"
    >
      {/* 3D Cover Stage */}
      <div className="hh-coverflow-stage">
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);

          // Batasi render kalkulasi transform hingga jarak 4
          const isVisible = absOffset <= 4;
          if (!isVisible) return null;

          // 3D parameters mirip album cover Apple Coverflow / Tame Impala visual
          // Translasi sumbu X (vw), sumbu Z kedalaman (vw), rotasi sumbu Y (deg)
          let translateX = 0;
          let translateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let zIndex = 50 - absOffset;
          let opacity = 1;
          let filter = "none";

          if (offset === 0) {
            // Active center card
            translateX = 0;
            translateZ = 6; // vw
            rotateY = 0;
            scale = 1;
            opacity = 1;
            filter = "brightness(1) contrast(1.05)";
          } else if (offset > 0) {
            // Sisi Kanan (mengarah serong ke kiri)
            translateX = 12 + (offset - 1) * 7.5; // vw
            translateZ = -6 - offset * 4; // vw
            rotateY = -48; // deg
            scale = 0.9 - absOffset * 0.05;
            opacity = Math.max(0.35, 1 - absOffset * 0.2);
            filter = `brightness(${0.65 - absOffset * 0.08}) contrast(0.95)`;
          } else {
            // Sisi Kiri (mengarah serong ke kanan)
            translateX = -12 - (absOffset - 1) * 7.5; // vw
            translateZ = -6 - absOffset * 4; // vw
            rotateY = 48; // deg
            scale = 0.9 - absOffset * 0.05;
            opacity = Math.max(0.35, 1 - absOffset * 0.2);
            filter = `brightness(${0.65 - absOffset * 0.08}) contrast(0.95)`;
          }

          const transformStyle = `translate(-50%, -50%) translateX(${translateX}vw) translateZ(${translateZ}vw) rotateY(${rotateY}deg) scale(${scale})`;

          return (
            <div
              key={item.id}
              className="hh-coverflow-card"
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
                filter,
              }}
              onClick={() => {
                if (offset === 0) {
                  onSelect?.(item, index);
                  onPlay?.(item, index);
                } else {
                  setActiveIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Menu ${item.title}`}
            >
              <div className="hh-coverflow-card-inner">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="25vw"
                    priority={absOffset <= 1}
                    className="hh-coverflow-card-img"
                  />
                ) : (
                  <div
                    className="hh-coverflow-card-placeholder"
                    style={{ background: item.accentColor || "#1e293b" }}
                  />
                )}
                <div className="hh-coverflow-card-gloss" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Judul & Subtitle */}
      <div className="hh-coverflow-info">
        {activeItem && (
          <>
            <h2 className="hh-coverflow-title">{activeItem.title}</h2>
            <p className="hh-coverflow-subtitle">{activeItem.subtitle}</p>
          </>
        )}
      </div>

      {/* Kontrol Navigasi (Panah & Dots/Tick Marks) */}
      <div className="hh-coverflow-controls">
        <button
          type="button"
          className="hh-coverflow-arrow"
          onClick={handlePrev}
          aria-label="Pilihan Sadurunge (Sebelumnya)"
          disabled={activeIndex === 0}
          style={{ opacity: activeIndex === 0 ? 0.25 : 0.8 }}
        >
          ‹
        </button>

        {/* Tanda Tick Marks / Dots */}
        <div className="hh-coverflow-ticks" aria-hidden="true">
          {items.map((_, i) => (
            <button
              key={`tick-${i}`}
              type="button"
              className={`hh-coverflow-tick ${i === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Pilih Babak ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="hh-coverflow-arrow"
          onClick={handleNext}
          aria-label="Pilihan Sabanjure (Berikutnya)"
          disabled={activeIndex === items.length - 1}
          style={{ opacity: activeIndex === items.length - 1 ? 0.25 : 0.8 }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
