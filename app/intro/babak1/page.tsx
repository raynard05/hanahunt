"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AudioToggle from "@/components/audio/AudioToggle";
import FullscreenPrompt from "@/components/fullscreen/FullscreenPrompt";
import FallingLeaves from "@/components/leaves/FallingLeaves";
import "./intro-babak1.css";

export default function IntroBabak1Page() {
  const router = useRouter();

  // State opening cover: assets/main/cover.webp awalnya menutup seluruh layar
  // lalu beranimasi membuka ke atas pelan-pelan (intro.txt)
  const [isRevealed, setIsRevealed] = useState(false);
  const [coverMounted, setCoverMounted] = useState(true);

  useEffect(() => {
    // Beri jeda/delay 1.5 detik (1500ms) saat layar ditutupi cover.webp,
    // setelah itu baru beranimasi membuka ke atas pelan-pelan (1.6s transition)
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 1500);

    // Unmount cover setelah animasi slide-up selesai (1500ms delay + 1600ms transisi + 200ms buffer)
    const unmountTimer = setTimeout(() => {
      setCoverMounted(false);
    }, 3300);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <main className="hh-intro-viewport">
      {/* Fullscreen Guard untuk Landscape */}
      <FullscreenPrompt />

      {/* Animasi Opening: cover.webp menutup lalu bergeser ke atas */}
      {coverMounted && (
        <div
          className={`hh-intro-opening-cover ${isRevealed ? "is-revealed" : ""}`}
          aria-hidden="true"
        />
      )}

      {/* Pojok Kiri Atas: Tombol Home (Kembali ke Halaman Menu) */}
      <button
        type="button"
        id="hh-intro-btn-home"
        className="hh-intro-home-btn"
        onClick={() => router.push("/menu")}
        aria-label="Bali menyang Menu Utama"
        title="Bali menyang Menu Utama"
      >
        <Image
          src="/assets/main/button_rev/home.png"
          alt="Home Button"
          width={80}
          height={80}
          priority
          className="hh-intro-home-img"
        />
      </button>

      {/* Pojok Kanan Atas: Grup Tombol Sound Toggle & Tombol Right (Next) berdampingan sesuai gambar referensi */}
      <div className="hh-intro-top-right-group">
        <AudioToggle className="hh-intro-sound-btn" />
        <button
          type="button"
          id="hh-intro-btn-next"
          className="hh-intro-next-btn"
          onClick={() => {
            // Navigasi ke babak permainan selanjutnya ketika gameplay siap
            console.log("Lanjut ke game Babak 1");
          }}
          aria-label="Lanjut menyang Babak 1"
          title="Lanjut menyang Babak 1"
        >
          <Image
            src="/assets/main/button_rev/right.png"
            alt="Tombol Lanjut"
            width={80}
            height={80}
            priority
            className="hh-intro-next-img"
          />
        </button>
      </div>

      {/* Konten Utama Intro Babak 1 (Tanpa Tambahan Teks Apapun) */}
      <div className="hh-intro-content">
        {/* Title Babak 1 dari assets/sinopsis/babak1/title.webp */}
        <div className="hh-intro-title-wrap">
          <Image
            src="/assets/sinopsis/babak1/title.webp"
            alt="Judul Babak 1"
            width={888}
            height={109}
            priority
            className="hh-intro-title-img"
          />
        </div>

        {/* Deskripsi / Papan Sinopsis Babak 1 dari assets/sinopsis/babak1/desc.webp */}
        <div className="hh-intro-desc-wrap">
          <Image
            src="/assets/sinopsis/babak1/desc.webp"
            alt="Sinopsis Babak 1"
            width={1683}
            height={947}
            priority
            className="hh-intro-desc-img"
          />
        </div>
      </div>

      {/* Pojok Kanan Bawah: Logo Hana Hunt (assets/main/patung.webp) persis gambar referensi 2 */}
      <div className="hh-intro-logo-wrap" aria-hidden="true">
        <Image
          src="/assets/main/patung.webp"
          alt="Hana Hunt Logo"
          width={320}
          height={320}
          priority
          className="hh-intro-logo-img"
        />
      </div>

      {/* Animasi Daun Berjatuhan dari Atas ke Bawah */}
      <FallingLeaves />
    </main>
  );
}
