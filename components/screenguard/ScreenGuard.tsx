"use client";

import React, { useEffect, useState } from "react";
import { Smartphone, RotateCw, MonitorPlay } from "lucide-react";
import "./screenguard.css";

export default function ScreenGuard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="hh-screenguard-overlay" aria-live="assertive" role="alert">
      <div className="hh-screenguard-content">
        <span className="hh-screenguard-badge">Sugeng Rawuh</span>

        <div className="hh-screenguard-anim">
          <Smartphone size={56} className="hh-screenguard-phone-icon" strokeWidth={1.75} />
        </div>

        <h2 className="hh-screenguard-title">Miringna Layar Sampeyan</h2>

        <p className="hh-screenguard-desc">
          Supados sinau lan dolanan <strong>Hana Hunt</strong> langkung sae lan prayogi,
          mangga puter HP / gawai panjenengan dados <strong>mode turu (landscape)</strong>.
        </p>

        <div className="hh-screenguard-hint">
          <RotateCw size={15} />
          <span>Kunci rotasi otomatis supados saged muter</span>
        </div>
      </div>
    </aside>
  );
}
