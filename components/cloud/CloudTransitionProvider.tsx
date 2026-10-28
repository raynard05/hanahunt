"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import CloudTransition from "@/components/cloud/CloudTransition";

interface CloudTransitionContextType {
  triggerTransition: (onMidway?: () => void) => void;
}

const CloudTransitionContext = createContext<CloudTransitionContextType>({
  triggerTransition: () => {},
});

export function useCloudTransition() {
  return useContext(CloudTransitionContext);
}

export function CloudTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);
  const [midwayCallback, setMidwayCallback] = useState<(() => void) | null>(null);

  const triggerTransition = useCallback((onMidway?: () => void) => {
    if (onMidway) {
      setMidwayCallback(() => onMidway);
    }
    setIsActive(true);
  }, []);

  const handleCovered = useCallback(() => {
    if (midwayCallback) {
      midwayCallback();
      setMidwayCallback(null);
    }
  }, [midwayCallback]);

  const handleComplete = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <CloudTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <CloudTransition
        isActive={isActive}
        holdDurationMs={1600}
        onCovered={handleCovered}
        onComplete={handleComplete}
      />
    </CloudTransitionContext.Provider>
  );
}
