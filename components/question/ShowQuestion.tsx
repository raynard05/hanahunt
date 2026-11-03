"use client";

import React from "react";
import Image from "next/image";
import "./show-question.css";

interface ShowQuestionProps {
  onClick: () => void;
  isOpen?: boolean;
  className?: string;
}

export default function ShowQuestion({
  onClick,
  isOpen = false,
  className = "",
}: ShowQuestionProps) {
  return (
    <button
      type="button"
      id="hh-btn-show-question"
      className={`hh-show-question-btn ${isOpen ? "is-open" : ""} ${className}`}
      onClick={onClick}
      aria-label="Tuduhake Soal Babak"
      title="Tuduhake Soal Babak"
    >
      <div className="hh-show-question-wrap">
        <Image
          src="/assets/babak1/kotak_pertanyaan.webp"
          alt="Ikon Pitakonan"
          width={152}
          height={152}
          priority
          className="hh-show-question-img"
        />
      </div>
    </button>
  );
}
