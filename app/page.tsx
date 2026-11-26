"use client";

import { useState, useEffect } from "react";
import { OS, CATEGORIES } from "@/app/lib/tools";
import { generateMarkdown } from "@/app/lib/generator";
import OSSelector from "@/app/components/OSSelector";
import ToolCatalog from "@/app/components/ToolCatalog";
import OutputModal from "@/app/components/OutputModal";
import StickyBar from "@/app/components/StickyBar";

function detectOS(): OS {
  if (typeof window === "undefined") return "ubuntu";
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "macos";
  if (ua.includes("win")) return "windows";
  return "ubuntu";
}

export default function HomePage() {
  const [os, setOs] = useState<OS>("ubuntu");
  const [detectedOs, setDetectedOs] = useState<OS | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [markdown, setMarkdown] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const d = detectOS();
    setDetectedOs(d);
    setOs(d);
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const selectAll = (categoryId: string) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return;
    setSelected((prev) => {
      const next = new Set(prev);
      cat.tools.forEach((t) => {
        if (t.commands[os] && t.commands[os]!.length > 0) next.add(t.id);
      });
      return next;
    });
  };

  const deselectAll = (categoryId: string) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return;
    setSelected((prev) => {
      const next = new Set(prev);
      cat.tools.forEach((t) => next.delete(t.id));
      return next;
    });
  };

  const handleGenerate = () => {
    const md = generateMarkdown(selected, os);
    setMarkdown(md);
    setShowModal(true);
  };

  const totalTools = CATEGORIES.reduce((acc, c) => acc + c.tools.length, 0);

  return (
    <>
      <div className="relative min-h-screen">
        {/* Background glow */}
        <div className="hero-glow" />

        {/* Hero */}
        <header className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Free · Open source · No sign-up
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text">DevSetup</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#8b8ba0] max-w-2xl mx-auto leading-relaxed">
            Pick your OS, choose your tools, and get a{" "}
            <code className="text-indigo-400 font-mono text-base">.md</code>{" "}
            setup script any AI agent can run — no bloat, exact installs only.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[#8b8ba0]">
            <div>
              <span className="text-white font-semibold">{totalTools}</span> tools
            </div>
            <div>
              <span className="text-white font-semibold">{CATEGORIES.length}</span> categories
            </div>
            <div>
              <span className="text-white font-semibold">3</span> operating systems
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-32">
          {/* OS Section */}
          <div className="card-glow rounded-2xl bg-[#111118] border border-[#2a2a3e] p-5 sm:p-6 mb-6">
            <OSSelector
              selected={os}
              detected={detectedOs}
              onChange={(newOs) => {
                setOs(newOs);
                // Clear selections that aren't supported on the new OS
                setSelected((prev) => {
                  const next = new Set<string>();
                  prev.forEach((id) => {
                    const tool = CATEGORIES.flatMap((c) => c.tools).find(
                      (t) => t.id === id
                    );
                    if (tool?.commands[newOs]?.length) next.add(id);
                  });
                  return next;
                });
              }}
            />

            {/* How it works */}
            <div className="border-t border-[#2a2a3e] pt-5 mt-2">
              <h3 className="text-sm font-semibold text-white mb-3">
                💡 How it works
              </h3>
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#8b8ba0]">
                {[
                  ["1. Select OS", "Auto-detected above, or choose manually"],
                  ["2. Pick your tools", "Tick exactly what you need — no extras"],
                  ["3. Generate & share", "Copy or download the .md and share with any AI agent"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="flex flex-col gap-1 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <span className="text-white font-medium text-xs">{title}</span>
                    <span>{desc}</span>
                  </div>
                ))}
              </ol>
            </div>
          </div>

          {/* Tools Section */}
          <div className="card-glow rounded-2xl bg-[#111118] border border-[#2a2a3e] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  🧰 Software Catalog
                </h2>
                <p className="text-sm text-[#8b8ba0] mt-0.5">
                  Tick exactly what you need — only those commands will appear in
                  your script
                </p>
              </div>
              {selected.size > 0 && (
                <button
                  onClick={() => setSelected(new Set())}
                  className="text-xs text-[#8b8ba0] hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <ToolCatalog
              categories={CATEGORIES}
              selected={selected}
              os={os}
              onToggle={toggle}
              onSelectAll={selectAll}
              onDeselectAll={deselectAll}
            />
          </div>
        </main>
      </div>

      {/* Sticky bottom bar */}
      <StickyBar
          selected={selected.size}
        onGenerate={handleGenerate}
      />

      {/* Output modal */}
      {showModal && (
        <OutputModal
          markdown={markdown}
          count={selected.size}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
