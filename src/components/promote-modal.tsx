"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface PromoteModalProps {
  onClose: () => void;
}

export function PromoteModal({ onClose }: PromoteModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8 flex flex-col gap-5">
        <h2 className="text-xl font-medium text-charcoal text-center">
          Dziękujemy za zgłoszenie!
        </h2>
        <p className="text-sm text-warm-gray text-center leading-relaxed">
          Odezwiemy się wkrótce z informacją o możliwościach promowania produktu
          w katalogu FashionHero.
        </p>
        <Button variant="outline" size="lg" onClick={onClose} className="w-full mt-1">
          Zamknij
        </Button>
      </div>
    </div>
  );
}
