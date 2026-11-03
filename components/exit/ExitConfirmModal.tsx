"use client";

import React from "react";
import Image from "next/image";
import "./exit-confirm-modal.css";

interface ExitConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: ExitConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="hh-exit-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hh-exit-modal-title"
    >
      <div className="hh-exit-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Ikon Tandha Pitakon / Kawigaten */}
        <div className="hh-exit-modal-icon-wrap">
          <Image
            src="/assets/babak1/kotak_pertanyaan.webp"
            alt="Pitakon Metu"
            width={72}
            height={72}
            priority
            className="hh-exit-modal-icon"
          />
        </div>

        {/* Irah-irahan (Judul) Jawa Ngoko */}
        <h2 id="hh-exit-modal-title" className="hh-exit-modal-title">
          Metu Saka Game?
        </h2>

        {/* Pesen Konfirmasi Jawa Ngoko */}
        <p className="hh-exit-modal-desc">
          Apa kowe yakin pengin metu saka game?
          <br />
          <strong>Progres sesimu bakal di-reset!</strong>
        </p>

        {/* Tombol Pilihan Jawa Ngoko: Iyo (Ya) & Ora (Tidak) */}
        <div className="hh-exit-modal-actions">
          <button
            type="button"
            id="hh-exit-btn-cancel"
            className="hh-exit-modal-btn hh-exit-btn-no"
            onClick={onCancel}
            autoFocus
          >
            Ora
          </button>
          <button
            type="button"
            id="hh-exit-btn-confirm"
            className="hh-exit-modal-btn hh-exit-btn-yes"
            onClick={onConfirm}
          >
            Iyo
          </button>
        </div>
      </div>
    </div>
  );
}
