"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import FullscreenPrompt from "@/components/fullscreen/FullscreenPrompt";
import BubbleEffect from "@/components/bubble/BubbleEffect";
import { supabase } from "@/lib/supabaseClient";
import "./regis.css";

export default function RegisPage() {
  const router = useRouter();
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [kelas, setKelas] = useState("");
  const [nomorAbsen, setNomorAbsen] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const cleanUsername = username.trim();
    const cleanNama = namaLengkap.trim();
    const cleanKelas = kelas.trim();
    const parsedAbsen = nomorAbsen ? parseInt(nomorAbsen, 10) : null;

    if (!cleanNama || !cleanUsername || !kataSandi) {
      setMsg({
        text: "Jeneng jangkep, username, lan password kudu diisi!",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: existingUser } = await supabase
        .from("user_account")
        .select("id")
        .eq("username", cleanUsername)
        .maybeSingle();

      if (existingUser) {
        setMsg({
          text: "Username wis tau digunakake, golek jeneng liyane ya!",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      const { data: newUser, error } = await supabase
        .from("user_account")
        .insert([
          {
            nama_lengkap: cleanNama,
            username: cleanUsername,
            kelas: cleanKelas || null,
            nomor_absen: parsedAbsen,
            kata_sandi: kataSandi,
          },
        ])
        .select("id, nama_lengkap, username, kelas, nomor_absen")
        .single();

      if (error) {
        setMsg({ text: `Gagal ndaftar: ${error.message}`, type: "error" });
        setIsLoading(false);
        return;
      }

      setMsg({
        text: "Pendaftaran kasil! Ayo saiki mlebu...",
        type: "success",
      });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("hana_user", JSON.stringify(newUser || {
          nama_lengkap: cleanNama,
          username: cleanUsername,
          kelas: cleanKelas,
          nomor_absen: parsedAbsen,
        }));
      }
      setTimeout(() => {
        router.push("/menu");
      }, 700);
      setNamaLengkap("");
      setUsername("");
      setKelas("");
      setNomorAbsen("");
      setKataSandi("");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Ana kaluputan teknis";
      setMsg({ text: `Kaluputan: ${errorMsg}`, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="hh-regis-viewport">
      <FullscreenPrompt />

      {/* Gelembung berterbangan di panel kiri */}
      <BubbleEffect />

      {/* Panel Kanan */}
      <section className="hh-regis-right-panel">
        {/* Form Registrasi Konsep Gambar 3 */}
        <form onSubmit={handleRegister} className="hh-regis-form">
          {/* 1. JENENG JANGKEP Row */}
          <div className="hh-regis-form-bar">
            <div className="hh-regis-icon-wrap">
              <Image
                src="/assets/login_regis/namalengkap.webp"
                alt="Jeneng Jangkep Icon"
                width={70}
                height={70}
                priority
                className="hh-regis-icon-img"
              />
            </div>
            <label htmlFor="regis-namalengkap" className="hh-regis-label">
              Jeneng Jangkep
            </label>
            <div className="hh-regis-input-pill">
              <input
                id="regis-namalengkap"
                name="nama_lengkap"
                type="text"
                required
                className="hh-regis-input"
                placeholder="Jeneng jangkepmu..."
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
              />
            </div>
          </div>

          {/* 2. USERNAME Row */}
          <div className="hh-regis-form-bar">
            <div className="hh-regis-icon-wrap">
              <Image
                src="/assets/login_regis/username.webp"
                alt="Username Icon"
                width={70}
                height={70}
                priority
                className="hh-regis-icon-img"
              />
            </div>
            <label htmlFor="regis-username" className="hh-regis-label">
              Username
            </label>
            <div className="hh-regis-input-pill">
              <input
                id="regis-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="hh-regis-input"
                placeholder="Asma panganggo..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* 3. KLAS Row */}
          <div className="hh-regis-form-bar">
            <div className="hh-regis-icon-wrap">
              <Image
                src="/assets/login_regis/klas.webp"
                alt="Klas Icon"
                width={70}
                height={70}
                priority
                className="hh-regis-icon-img"
              />
            </div>
            <label htmlFor="regis-kelas" className="hh-regis-label">
              Klas
            </label>
            <div className="hh-regis-input-pill">
              <input
                id="regis-kelas"
                name="kelas"
                type="text"
                className="hh-regis-input"
                placeholder="Tuladha: 7A, 8B..."
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
              />
            </div>
          </div>

          {/* 4. NOMER ABSEN Row */}
          <div className="hh-regis-form-bar">
            <div className="hh-regis-icon-wrap">
              <Image
                src="/assets/login_regis/absen.webp"
                alt="Nomer Absen Icon"
                width={70}
                height={70}
                priority
                className="hh-regis-icon-img"
              />
            </div>
            <label htmlFor="regis-absen" className="hh-regis-label">
              Nomer Absen
            </label>
            <div className="hh-regis-input-pill">
              <input
                id="regis-absen"
                name="nomor_absen"
                type="number"
                className="hh-regis-input"
                placeholder="Nomer absen..."
                value={nomorAbsen}
                onChange={(e) => setNomorAbsen(e.target.value)}
              />
            </div>
          </div>

          {/* 5. PASSWORD Row */}
          <div className="hh-regis-form-bar">
            <div className="hh-regis-icon-wrap">
              <Image
                src="/assets/login_regis/password.webp"
                alt="Password Icon"
                width={70}
                height={70}
                priority
                className="hh-regis-icon-img"
              />
            </div>
            <label htmlFor="regis-password" className="hh-regis-label">
              Password
            </label>
            <div className="hh-regis-input-pill">
              <input
                id="regis-password"
                name="kata_sandi"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="hh-regis-input"
                placeholder="Tembung sandi..."
                value={kataSandi}
                onChange={(e) => setKataSandi(e.target.value)}
              />
              <button
                type="button"
                className="hh-regis-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Tutup sandi" : "Deleng sandi"}
              >
                {showPassword ? (
                  <EyeOff className="hh-regis-eye-icon" />
                ) : (
                  <Eye className="hh-regis-eye-icon" />
                )}
              </button>
            </div>
          </div>

          {/* Tombol Wiwiti */}
          <button
            type="submit"
            id="btn-regis-wiwiti"
            disabled={isLoading}
            className="hh-regis-btn-wiwiti"
            aria-label="Tombol Wiwiti Registrasi"
          >
            <Image
              src="/assets/login_regis/wiwiti.webp"
              alt="Tombol Wiwiti"
              width={320}
              height={90}
              priority
              className="hh-regis-wiwiti-img"
            />
          </button>
        </form>

        {/* Teks Switch Akun (Sesuai login_regis.txt) */}
        <div className="hh-regis-switch-text">
          <span>sudah mempunyai akun ?</span>
          <Link href="/login" className="hh-regis-switch-link">
            login disini
          </Link>
        </div>

        {/* Notifikasi Pesan */}
        {msg && (
          <div
            className={`hh-regis-msg-box ${
              msg.type === "error" ? "hh-regis-msg-error" : "hh-regis-msg-success"
            }`}
          >
            {msg.text}
          </div>
        )}
      </section>
    </main>
  );
}
