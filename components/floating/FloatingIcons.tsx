"use client";

import React from "react";
import Image from "next/image";
import "./floating-icons.css";

export interface FloatingIconConfig {
  transform?: string;
  /** Posisi vertikal dari atas layar (misal: "12vh") */
  top?: string;
  /** Posisi vertikal dari bawah layar (misal: "15vh") */
  bottom?: string;
  /** Posisi horizontal dari kiri layar (misal: "8vw") */
  left?: string;
  /** Posisi horizontal dari kanan layar (misal: "10vw") */
  right?: string;
  /** Ukuran lebar icon (misal: "7vw" atau "6.5vw") */
  size?: string;
  /** Bayangan drop-shadow khusus jika ingin dikustomisasi */
  filter?: string;
  /** Derajat rotasi awal (misal: "-5deg" atau "8deg") */
  rotate?: string;
  /** Opacity icon (misal: 0.95 atau 1) */
  opacity?: number;
  /** Sembunyikan icon jika di-set true */
  hidden?: boolean;
}

export interface FloatingIconsProps {
  /** Konfigurasi posisi & ukuran untuk icon Wayang */
  wayangConfig?: FloatingIconConfig;
  /** Konfigurasi posisi & ukuran untuk icon Tugu */
  tuguConfig?: FloatingIconConfig;
  /** Konfigurasi posisi & ukuran untuk icon Pelampung */
  pelampungConfig?: FloatingIconConfig;
}

export default function FloatingIcons({
  wayangConfig,
  tuguConfig,
  pelampungConfig,
}: FloatingIconsProps) {
  // Nilai default posisi dan ukuran per icon jika tidak ditentukan secara custom
  const defaultWayang: FloatingIconConfig = {
    top: "7vh",
    left: "6vw",
    size: "6.8vw",
    rotate: "-3deg",
    filter: "drop-shadow(0 0.8vh 1.6vh rgba(0, 0, 0, 0.5))",
    transform: "translateY(0)",
    ...wayangConfig,
  };

  const defaultTugu: FloatingIconConfig = {
    bottom: "8vh",
    left: "7vw",
    size: "6.5vw",
    rotate: "3deg",
    filter: "drop-shadow(0 0.8vh 1.6vh rgba(0, 0, 0, 0.5))",
    ...tuguConfig,
  };

  const defaultPelampung: FloatingIconConfig = {
    top: "34vh",
    left: "22vw",
    size: "5.8vw",
    rotate: "6deg",
    filter: "drop-shadow(0 0.8vh 1.4vh rgba(0, 0, 0, 0.45))",
    ...pelampungConfig,
  };

  return (
    <div className="hh-float-container" aria-hidden="true">
      {/* 1. Floating Icon Wayang */}
      {!defaultWayang.hidden && (
        <div
          className="hh-float-item hh-float-wayang"
          style={
            {
              top: defaultWayang.top,
              bottom: defaultWayang.bottom,
              left: defaultWayang.left,
              right: defaultWayang.right,
              width: defaultWayang.size,
              height: defaultWayang.size,
              filter: defaultWayang.filter,
              opacity: defaultWayang.opacity,
              "--base-rot": defaultWayang.rotate || "0deg",
            } as React.CSSProperties
          }
        >
          <Image
            src="/assets/login_regis/wayang.webp"
            alt="Wayang Floating Icon"
            width={120}
            height={120}
            priority
            className="hh-float-img"
          />
        </div>
      )}

      {/* 2. Floating Icon Tugu */}
      {!defaultTugu.hidden && (
        <div
          className="hh-float-item hh-float-tugu"
          style={
            {
              top: defaultTugu.top,
              bottom: defaultTugu.bottom,
              left: defaultTugu.left,
              right: defaultTugu.right,
              width: defaultTugu.size,
              height: defaultTugu.size,
              filter: defaultTugu.filter,
              opacity: defaultTugu.opacity,
              "--base-rot": defaultTugu.rotate || "0deg",
            } as React.CSSProperties
          }
        >
          <Image
            src="/assets/login_regis/tugu.webp"
            alt="Tugu Floating Icon"
            width={120}
            height={120}
            priority
            className="hh-float-img"
          />
        </div>
      )}

      {/* 3. Floating Icon Pelampung */}
      {!defaultPelampung.hidden && (
        <div
          className="hh-float-item hh-float-pelampung"
          style={
            {
              top: defaultPelampung.top,
              bottom: defaultPelampung.bottom,
              left: defaultPelampung.left,
              right: defaultPelampung.right,
              width: defaultPelampung.size,
              height: defaultPelampung.size,
              filter: defaultPelampung.filter,
              opacity: defaultPelampung.opacity,
              "--base-rot": defaultPelampung.rotate || "0deg",
            } as React.CSSProperties
          }
        >
          <Image
            src="/assets/login_regis/pelampung.webp"
            alt="Pelampung Floating Icon"
            width={120}
            height={120}
            priority
            className="hh-float-img"
          />
        </div>
      )}
    </div>
  );
}
