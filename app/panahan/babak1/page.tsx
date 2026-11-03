"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FullscreenPrompt from "@/components/fullscreen/FullscreenPrompt";
import Topbar from "@/components/topbar/Topbar";
import ShowQuestion from "@/components/question/ShowQuestion";
import FallingLeaves from "@/components/leaves/FallingLeaves";
import ExitConfirmModal from "@/components/exit/ExitConfirmModal";
import { ROUNDS_DATA } from "./panahan-data";
import "./panahan.css";

// Data sasaran: sudut rotasi busur panah, titik awal garis pada ujung panah, dan pusat sasaran
// Dihitung presisi berdasarkan sudut geometris sasaran dan kemiringan panah bawaan aset (+8.7°)
const TARGET_SLOTS_DATA = [
  {
    angle: -64.2, // Sasaran 1
    startX: "45.26vw",
    startY: "79.21vh",
    targetX: "20.10vw",
    targetY: "48.50vh",
  },
  {
    angle: -49.5, // Sasaran 2
    startX: "46.24vw",
    startY: "77.26vh",
    targetX: "32.27vw",
    targetY: "48.50vh",
  },
  {
    angle: -23.7, // Sasaran 3
    startX: "48.51vw",
    startY: "75.13vh",
    targetX: "44.48vw",
    targetY: "48.50vh",
  },
  {
    angle: 9.4, // Sasaran 4
    startX: "51.79vw",
    startY: "75.28vh",
    targetX: "56.72vw",
    targetY: "48.50vh",
  },
  {
    angle: 34.0, // Sasaran 5
    startX: "53.90vw",
    startY: "77.49vh",
    targetX: "68.96vw",
    targetY: "48.50vh",
  },
  {
    angle: 47.8, // Sasaran 6
    startX: "54.80vw",
    startY: "79.36vh",
    targetX: "81.04vw",
    targetY: "48.50vh",
  },
];

export default function PanahanBabak1Page() {
  const router = useRouter();

  // State ronde & game
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null); // 1-6
  const [score, setScore] = useState(0);
  const [chances, setChances] = useState(3); // 3 kali kesempatan per ronde
  const [timerSeconds, setTimerSeconds] = useState(1800); // 30 menit default

  // State pop up & status
  const [showQuestionModal, setShowQuestionModal] = useState(true); // Muncul otomatis di awal ronde
  const [countdown, setCountdown] = useState(3); // Timer 3 detik di dalam popup soal
  const [popupState, setPopupState] = useState<"benar" | "salah" | "waktuhabis" | "selesai" | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false); // Modal konfirmasi keluar

  const currentRound = ROUNDS_DATA[currentRoundIndex] || ROUNDS_DATA[0];
  const targetSlotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bowRef = useRef<HTMLDivElement | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const isLoadedRef = useRef<boolean>(false);

  // 1. Muat progress sesi game tersimpan (Restore Session)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hh_session_babak1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentRoundIndex === "number") {
          setCurrentRoundIndex(Math.min(parsed.currentRoundIndex, ROUNDS_DATA.length - 1));
        }
        if (typeof parsed.score === "number") {
          setScore(parsed.score);
        }
        if (typeof parsed.chances === "number") {
          setChances(parsed.chances);
        }
        if (typeof parsed.timerSeconds === "number" && parsed.timerSeconds > 0) {
          setTimerSeconds(parsed.timerSeconds);
        }
      }
    } catch {
      // Abaikan jika storage gagal dibaca
    } finally {
      isLoadedRef.current = true;
    }
  }, []);

  // 2. Simpan setiap perubahan progress game ke sesi storage
  useEffect(() => {
    if (!isLoadedRef.current) return;
    try {
      localStorage.setItem(
        "hh_session_babak1",
        JSON.stringify({
          stage: "panahan",
          currentRoundIndex,
          score,
          chances,
          timerSeconds,
          updatedAt: Date.now(),
        })
      );
    } catch {
      // Ignore
    }
  }, [currentRoundIndex, score, chances, timerSeconds]);

  // Handler tick timer untuk update sisa detik secara berkala
  const handleTimerTick = useCallback((secondsLeft: number) => {
    setTimerSeconds((prev) => (prev !== secondsLeft ? secondsLeft : prev));
  }, []);

  // Konfirmasi Keluar dari Game: Reset Sesi & Kembali ke Menu
  const handleConfirmExit = () => {
    try {
      localStorage.removeItem("hh_session_babak1");
    } catch {
      // Ignore
    }
    setShowExitConfirm(false);
    router.push("/menu");
  };

  // Bersihkan timeout jika unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Timer 3 detik untuk modal soal
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (showQuestionModal) {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setShowQuestionModal(false);
            if (timer) clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showQuestionModal, currentRoundIndex]);

  // Klik slot lingkaran aksara
  const handleSelectTarget = (targetIndex: number) => {
    if (popupState || isTransitioningRef.current) return;
    setSelectedTarget(targetIndex);
  };

  // Tombol MANAH ditekan
  const handleShoot = () => {
    if (selectedTarget === null || popupState || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    const isCorrect = selectedTarget === currentRound.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setPopupState("benar");

      const isLastRound = currentRoundIndex >= ROUNDS_DATA.length - 1;
      transitionTimeoutRef.current = setTimeout(() => {
        if (isLastRound) {
          setPopupState("selesai");
        } else {
          // Berpindah strictly ke ronde berikutnya
          setCurrentRoundIndex((prev) => prev + 1);
          setSelectedTarget(null);
          setChances(3);
          setPopupState(null);
          setShowQuestionModal(true); // Pop-up soal baru show up 3 detik
        }
        isTransitioningRef.current = false;
      }, 1200);
    } else {
      const nextChances = chances - 1;
      setChances(nextChances);
      setPopupState("salah");

      // Delay 1.5 detik jika salah, otomatis tutup tanpa tombol
      transitionTimeoutRef.current = setTimeout(() => {
        if (nextChances <= 0) {
          const isLastRound = currentRoundIndex >= ROUNDS_DATA.length - 1;
          if (isLastRound) {
            setPopupState("selesai");
          } else {
            // Kesempatan habis di ronde ini, lanjut ke ronde berikutnya
            setCurrentRoundIndex((prev) => prev + 1);
            setSelectedTarget(null);
            setChances(3);
            setPopupState(null);
            setShowQuestionModal(true);
          }
        } else {
          // Masih ada sisa kesempatan di ronde ini, tutup popup agar pemain bisa coba lagi
          setSelectedTarget(null);
          setPopupState(null);
        }
        isTransitioningRef.current = false;
      }, 1500);
    }
  };

  // Tutup popup status khusus tombol waktu habis
  const handleCloseStatusPopup = () => {
    if (popupState !== "waktuhabis") return; // Benar & salah dikelola otomatis oleh timer
    const isLastRound = currentRoundIndex >= ROUNDS_DATA.length - 1;
    if (isLastRound) {
      setPopupState("selesai");
    } else {
      setCurrentRoundIndex((prev) => prev + 1);
      setSelectedTarget(null);
      setChances(3);
      setPopupState(null);
      setShowQuestionModal(true);
    }
  };

  // Waktu habis dari Timer (30 menit)
  const handleTimeUp = () => {
    setPopupState("waktuhabis");
  };

  // Hitung rotasi busur panah
  const activeSlotData =
    selectedTarget !== null ? TARGET_SLOTS_DATA[selectedTarget - 1] : null;
  const bowRotation = activeSlotData ? activeSlotData.angle : 0;

  return (
    <main className="hh-panahan-viewport">
      <FullscreenPrompt />

      {/* Topbar: Tombol Home, Timer 30 Menit, Skor, & AudioToggle */}
      <Topbar
        score={score}
        timerSeconds={timerSeconds}
        isTimerRunning={!popupState && !showQuestionModal && !showExitConfirm}
        onTimeUp={handleTimeUp}
        onTick={handleTimerTick}
        onHomeClick={() => setShowExitConfirm(true)}
      />

      {/* Area Target 6 Lingkaran Panahan */}
      <div className="hh-panahan-targets-container">
        {currentRound.options.map((opt, i) => {
          const isSelected = selectedTarget === opt.index;
          return (
            <button
              key={`target-${currentRound.round}-${opt.index}`}
              ref={(el) => {
                targetSlotRefs.current[i] = el;
              }}
              type="button"
              className={`hh-panahan-target-slot ${isSelected ? "is-selected" : ""}`}
              onClick={() => handleSelectTarget(opt.index)}
              aria-label={`Pilih Sasaran Aksara ${opt.index}`}
            >
              {isSelected && <div className="hh-panahan-target-glow" />}
              <div className="hh-panahan-target-aksara-wrap">
                <Image
                  src={opt.image}
                  alt={`Aksara Pilihan ${opt.index}`}
                  width={64}
                  height={64}
                  priority
                  className="hh-panahan-target-aksara-img"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Garis Pancaran Warna Patah-Patah Saat Sasaran Dipilih */}
      {selectedTarget !== null && activeSlotData && (
        <svg className="hh-panahan-beam-svg" aria-hidden="true">
          <line
            x1={activeSlotData.startX}
            y1={activeSlotData.startY}
            x2={activeSlotData.targetX}
            y2={activeSlotData.targetY}
            className="hh-panahan-beam-line"
          />
        </svg>
      )}

      {/* Panel Kontrol Bawah: Show Question, Busur Panah, Tombol MANAH */}
      <div className="hh-panahan-bottom-panel">
        {/* Sisi Kiri: Ikon Show Question & Badge Ronde / Sisa Nyawa */}
        <div className="hh-panahan-bottom-left">
          <ShowQuestion
            isOpen={showQuestionModal}
            onClick={() => setShowQuestionModal(true)}
          />
          <div className="hh-panahan-round-badge">
            <span className="hh-panahan-round-text">
              Ronde {currentRound.round} / {ROUNDS_DATA.length}
            </span>
            <div className="hh-panahan-hearts" title={`Sisa Kesempatan: ${chances}`}>
              {[1, 2, 3].map((h) => (
                <span
                  key={`heart-${h}`}
                  className={`hh-panahan-heart ${h > chances ? "is-empty" : ""}`}
                >
                  ♥
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tengah: Busur Panah Berotasi Sesuai Pilihan */}
        <div className="hh-panahan-bow-center" ref={bowRef}>
          <div
            className={`hh-panahan-bow-wheel ${selectedTarget !== null ? "has-target" : ""}`}
            style={{ transform: `rotate(${bowRotation}deg)` }}
          >
            <Image
              src={
                selectedTarget !== null
                  ? "/assets/babak1/manah.webp"
                  : "/assets/babak1/before_manah.webp"
              }
              alt="Busur Panah"
              width={284}
              height={284}
              priority
              className="hh-panahan-bow-img"
            />
          </div>
        </div>

        {/* Sisi Kanan: Tombol "MANAH" */}
        <div className="hh-panahan-bottom-right">
          <button
            type="button"
            id="hh-btn-shoot"
            className="hh-panahan-btn-shoot"
            onClick={handleShoot}
            disabled={selectedTarget === null}
            aria-label="Manah Sasaran"
          >
            <span className="hh-panahan-btn-shoot-text">MANAH</span>
          </button>
        </div>
      </div>

      {/* Pop Up Soal (Show Question Modal - Berdurasi 3 detik dengan countdown) */}
      {showQuestionModal && (
        <div
          className="hh-panahan-question-modal-overlay"
          onClick={() => setShowQuestionModal(false)}
        >
          <div
            className="hh-panahan-question-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hh-panahan-question-header">
              <Image
                src="/assets/babak1/kotak_pertanyaan.webp"
                alt="Ikon Pitakonan"
                width={60}
                height={60}
                className="hh-panahan-question-badge-icon"
              />
              <h2 className="hh-panahan-question-title">
                Pitakonan Ronde {currentRound.round}
              </h2>
            </div>
            <p className="hh-panahan-question-body">{currentRound.questionText}</p>

            <div className="hh-panahan-modal-timer-badge">
              <span className="hh-panahan-modal-timer-text">
                Miwiti sajrone: <strong>{countdown}s</strong>
              </span>
            </div>

            <button
              type="button"
              className="hh-panahan-question-btn-close"
              onClick={() => setShowQuestionModal(false)}
            >
              Miwiti Saiki ({countdown}s)
            </button>
          </div>
        </div>
      )}

      {/* Pop Up Status Hasil: BENAR, SALAH, WAKTU HABIS */}
      {popupState && popupState !== "selesai" && (
        <div className="hh-panahan-status-popup-overlay">
          <div className="hh-panahan-status-popup-img-wrap">
            <Image
              src={
                popupState === "benar"
                  ? "/assets/popup/benar.webp"
                  : popupState === "waktuhabis"
                    ? "/assets/popup/waktunyahabis.webp"
                    : "/assets/popup/salah.webp"
              }
              alt={
                popupState === "benar"
                  ? "Bener!"
                  : popupState === "waktuhabis"
                    ? "Wektune Entek!"
                    : "Salah!"
              }
              width={768}
              height={512}
              priority
              className="hh-panahan-status-popup-img"
            />
          </div>
          {/* Tombol hanya untuk popup waktu habis (karena benar & salah auto delay tanpa tombol) */}
          {popupState === "waktuhabis" && (
            <button
              type="button"
              className="hh-panahan-status-popup-btn"
              onClick={handleCloseStatusPopup}
            >
              Lanjut menyang Ronde Sabanjure
            </button>
          )}
        </div>
      )}

      {/* Pop Up Game Selesai (Ronde 7 Tuntas) */}
      {popupState === "selesai" && (
        <div className="hh-panahan-status-popup-overlay">
          <div className="hh-panahan-question-card">
            <h2 className="hh-panahan-question-title">Sugeng! Babak 1 Rampung</h2>
            <p className="hh-panahan-question-body">
              Sampeyan wis ngrampungake kabeh 7 ronde panahan Aksara Murda!
              <br />
              Total Skor Sampeyan: <strong>{score}</strong>
            </p>
            <button
              type="button"
              className="hh-panahan-question-btn-close"
              onClick={() => {
                try {
                  localStorage.removeItem("hh_session_babak1");
                } catch {
                  // Ignore
                }
                router.push("/menu");
              }}
            >
              Bali menyang Menu Utama
            </button>
          </div>
        </div>
      )}

      {/* Daun Berjatuhan di Lapisan Paling Atas */}
      <FallingLeaves className="hh-intro-leaves" />

      {/* Pop Up Konfirmasi Metu Saka Game (Jawa Ngoko) */}
      <ExitConfirmModal
        isOpen={showExitConfirm}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitConfirm(false)}
      />
    </main>
  );
}
