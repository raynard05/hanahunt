"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import "./fullscreen-prompt.css";

interface FullscreenPromptProps {
  /**
   * Teks pitutur utama (Default basa Jawa)
   */
  title?: string;
  /**
   * Teks katerangan tambahan
   */
  subtitle?: string;
}

export default function FullscreenPrompt({
  title = "Tutul Kanggo Layar Kebak",
  subtitle = "Tutul ing ngendi wae supaya dolanan luwih jembar lan kepenak!",
}: FullscreenPromptProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Priksa status layar fullscreen
  const checkFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    const fsElement =
      document.fullscreenElement ||
      (document as unknown as { webkitFullscreenElement?: Element })
        .webkitFullscreenElement ||
      (document as unknown as { mozFullScreenElement?: Element })
        .mozFullScreenElement ||
      (document as unknown as { msFullscreenElement?: Element })
        .msFullscreenElement;

    setIsFullscreen(Boolean(fsElement));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    checkFullscreen();

    const handleFsChange = () => {
      checkFullscreen();
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    document.addEventListener("mozfullscreenchange", handleFsChange);
    document.addEventListener("MSFullscreenChange", handleFsChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
      document.removeEventListener("mozfullscreenchange", handleFsChange);
      document.removeEventListener("MSFullscreenChange", handleFsChange);
    };
  }, [checkFullscreen]);

  // Fungsi kanggo mlebu mode fullscreen
  const handleRequestFullscreen = async () => {
    try {
      const docEl = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        mozRequestFullScreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };

      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        await docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        await docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        await docEl.msRequestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request failed or was cancelled:", err);
    }
  };

  // Sadurunge komponen dipasang ing client utawa wis fullscreen, ora perlu nampilake pop up
  if (!isMounted || isFullscreen) {
    return null;
  }

  return (
    <aside
      className="hh-fs-overlay"
      onClick={handleRequestFullscreen}
      role="button"
      tabIndex={0}
      aria-label="Tutul kanggo mlebu mode layar kebak"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleRequestFullscreen();
        }
      }}
    >
      <div className="hh-fs-container">
        {/* Ornamen Ikon Patung saka assets/main */}
        <div className="hh-fs-patung-wrapper">
          <Image
            src="/assets/main/patung2.webp"
            alt="Ikon Patung Hana Hunt"
            width={240}
            height={240}
            priority
            className="hh-fs-patung-img"
          />
        </div>

        {/* Pituduh Perintah Basa Jawa */}
        <div className="hh-fs-content">
          <div className="hh-fs-badge">
            <Maximize2 className="hh-fs-icon-expand" />
            <span>{title}</span>
          </div>
       
        </div>
      </div>
    </aside>
  );
}
