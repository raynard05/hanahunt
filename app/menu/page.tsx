"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FullscreenPrompt from "@/components/fullscreen/FullscreenPrompt";
import AudioToggle from "@/components/audio/AudioToggle";
import Coverflow from "@/components/coverflow/Coverflow";
import "./menu.css";

interface UserAccount {
  id?: string;
  nama_lengkap?: string;
  username?: string;
  kelas?: string;
  nomor_absen?: number;
}

export default function MenuPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserAccount | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Membaca data pengguna yang tersimpan saat login / regis
    try {
      const stored = sessionStorage.getItem("hana_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Abaikan jika tidak ada storage
    }
  }, []);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("hana_user");
    } catch {
      // Abaikan
    }
    router.push("/login");
  };

  return (
    <main className="hh-menu-viewport">
      <FullscreenPrompt />

      {/* Pojok Kiri Atas: Icon Profile */}
      <button
        type="button"
        id="hh-menu-btn-profile"
        className="hh-menu-profile-btn"
        onClick={() => {
          // Aksi klik profile (bisa diperluas ke modal profil)
        }}
        aria-label="Profil Pengguna"
        title="Profil Pengguna"
      >
        <div className="hh-menu-profile-icon-wrap">
          <Image
            src="/assets/main/profile.png"
            alt="Profil Icon"
            width={75}
            height={75}
            priority
            className="hh-menu-profile-img"
          />
        </div>
        {user && (
          <div className="hh-menu-profile-badge">
            <span className="hh-menu-profile-title">
              {user.kelas ? `Klas ${user.kelas}` : "Pemain"}
            </span>
            <span className="hh-menu-profile-name">
              {user.nama_lengkap || user.username || "Kanca Hana"}
            </span>
          </div>
        )}
      </button>

      {/* Pojok Kanan Atas: Sound On / Off Toggle */}
      <div className="hh-menu-sound-wrap">
        <AudioToggle />
      </div>

      {/* Komponen Interaktif Coverflow Carousel Menu */}
      <Coverflow
        onPlay={(item) => {
          console.log("Miwiti menu:", item.title);
        }}
      />

      {/* Pojok Kanan Bawah: Icon Logout */}
      <button
        type="button"
        id="hh-menu-btn-logout"
        className="hh-menu-logout-btn"
        onClick={() => setShowLogoutModal(true)}
        aria-label="Metu saka Akun (Logout)"
        title="Metu saka Akun"
      >
        <div className="hh-menu-logout-icon-wrap">
          <Image
            src="/assets/main/logout.png"
            alt="Logout Icon"
            width={75}
            height={75}
            priority
            className="hh-menu-logout-img"
          />
        </div>
      </button>

      {/* Modal Konfirmasi Logout */}
      {showLogoutModal && (
        <div
          className="hh-menu-modal-overlay"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="hh-menu-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="hh-menu-modal-title">Metu saka Game?</h2>
            <p className="hh-menu-modal-desc">
              Apa kowe yakin arep metu saka petualangan Hana Hunt?
            </p>
            <div className="hh-menu-modal-actions">
              <button
                type="button"
                className="hh-menu-modal-btn-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Ora (Batal)
              </button>
              <button
                type="button"
                className="hh-menu-modal-btn-confirm"
                onClick={handleLogout}
              >
                Iya, Metu
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
