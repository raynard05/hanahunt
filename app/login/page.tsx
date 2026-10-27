"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import FullscreenPrompt from "@/components/fullscreen/FullscreenPrompt";
import FloatingIcons from "@/components/floating/FloatingIcons";
import BubbleEffect from "@/components/bubble/BubbleEffect";
import { supabase } from "@/lib/supabaseClient";
import "./login.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      setMsg({ text: "Username lan Password kudu diisi kabeh!", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_account")
        .select("id, nama_lengkap, username, kelas, nomor_absen, kata_sandi")
        .eq("username", cleanUsername)
        .single();

      if (error || !data) {
        setMsg({ text: "Username ora ditemokake utawa durung kadhaftar!", type: "error" });
        setIsLoading(false);
        return;
      }

      if (data.kata_sandi !== password) {
        setMsg({ text: "Tembung sandi (password) salah!", type: "error" });
        setIsLoading(false);
        return;
      }

      setMsg({
        text: `Sugeng rawuh, ${data.nama_lengkap || data.username}!`,
        type: "success",
      });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("hana_user", JSON.stringify(data));
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Ana kaluputan teknis";
      setMsg({ text: `Kaluputan: ${errorMsg}`, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="hh-login-viewport">
      <FullscreenPrompt />

      {/* Gelembung berterbangan di panel kiri */}
      <BubbleEffect />

      {/* Floating Animated Icons (Wayang, Tugu, Pelampung) */}
      <FloatingIcons
        wayangConfig={{
          top: "15vh",
          left: "60vw",
          size: "6.8vw",
        }}
        tuguConfig={{
            top: "15vh",
          left: "93vw",
          size: "6.8vw",
          rotate: "-15deg",
        }}
        pelampungConfig={{
          top: "72vh",
          left: "58vw",
          size: "5.8vw",
        }}
      />

      {/* Panel Kanan */}
      <section className="hh-login-right-panel">
        {/* Form Login Konsep Gambar 3 */}
        <form onSubmit={handleLogin} className="hh-login-form">
          {/* USERNAME Row Bar */}
          <div className="hh-form-bar">

            <div className="hh-form-icon-wrap">
              <Image
                src="/assets/login_regis/username.webp"
                alt="Username Icon"
                width={80}
                height={80}
                priority
                className="hh-form-icon-img"
              />
            </div>
            <label htmlFor="login-username" className="hh-form-label">
              Username
            </label>
            <div className="hh-form-input-pill">
              <input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="hh-form-input"
                placeholder="Asma panganggo..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD Row Bar */}
          <div className="hh-form-bar">

            <div className="hh-form-icon-wrap">
              <Image
                src="/assets/login_regis/password.webp"
                alt="Password Icon"
                width={80}
                height={80}
                priority
                className="hh-form-icon-img"
              />
            </div>
            <label htmlFor="login-password" className="hh-form-label">
              Password
            </label>
            <div className="hh-form-input-pill">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="hh-form-input"
                placeholder="Tembung sandi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="hh-form-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Tutup sandi" : "Deleng sandi"}
              >
                {showPassword ? (
                  <EyeOff className="hh-form-eye-icon" />
                ) : (
                  <Eye className="hh-form-eye-icon" />
                )}
              </button>
            </div>
          </div>

          {/* Tombol Wiwiti */}
          <button
            type="submit"
            id="btn-login-wiwiti"
            disabled={isLoading}
            className="hh-login-btn-wiwiti"
            aria-label="Tombol Wiwiti Login"
          >
            <Image
              src="/assets/login_regis/wiwiti.webp"
              alt="Tombol Wiwiti"
              width={360}
              height={100}
              priority
              className="hh-login-wiwiti-img"
            />
          </button>
        </form>

        {/* Teks Switch Akun (Sesuai login_regis.txt) */}
        <div className="hh-login-switch-text">
          <span>belum mempunyai akun ?</span>
          <Link href="/regis" className="hh-login-switch-link">
            daftar disini
          </Link>
        </div>

        {/* Notifikasi Pesan */}
        {msg && (
          <div
            className={`hh-login-msg-box ${msg.type === "error" ? "hh-login-msg-error" : "hh-login-msg-success"
              }`}
          >
            {msg.text}
          </div>
        )}
      </section>
    </main>
  );
}
