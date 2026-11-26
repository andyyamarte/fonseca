"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

export interface QuoteManifestItem {
  id: string;
  title: string;
  code: string;
  image: string;
}

interface QuoteManifestContextValue {
  items: QuoteManifestItem[];
  addItem: (item: QuoteManifestItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  hasItem: (id: string) => boolean;
  manifestOpen: boolean;
  setManifestOpen: (open: boolean) => void;
  adminDialogOpen: boolean;
  setAdminDialogOpen: (open: boolean) => void;
}

const QuoteManifestContext = createContext<QuoteManifestContextValue | null>(null);

export function QuoteManifestProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteManifestItem[]>([]);
  const [manifestOpen, setManifestOpen] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);

  const addItem = useCallback((item: QuoteManifestItem) => {
    setItems((prev) => {
      if (prev.some((existing) => existing.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const hasItem = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  return (
    <QuoteManifestContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearItems,
        hasItem,
        manifestOpen,
        setManifestOpen,
        adminDialogOpen,
        setAdminDialogOpen,
      }}
    >
      {children}
    </QuoteManifestContext.Provider>
  );
}

export function useQuoteManifest() {
  const ctx = useContext(QuoteManifestContext);
  if (!ctx) {
    throw new Error("useQuoteManifest must be used within QuoteManifestProvider");
  }
  return ctx;
}
