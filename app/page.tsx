"use client";

import { useState, useEffect, useMemo } from "react";
import { Github, Mail, ArrowUpRight, Search, X, Sparkles } from "lucide-react";
import clsx from "clsx";
import { OS, CATEGORIES, PRESETS, Preset } from "@/app/lib/tools";
import { generateMarkdown } from "@/app/lib/generator";
import OSSelector from "@/app/components/OSSelector";
import ToolCatalog, { LevelFilter } from "@/app/components/ToolCatalog";
import OutputModal from "@/app/components/OutputModal";
import StickyBar from "@/app/components/StickyBar";

function detectOS(): OS {
  if (typeof window === "undefined") return "ubuntu";
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "macos";
  if (ua.includes("win")) return "windows";
  return "ubuntu";
}

const LEVEL_FILTERS: { id: LevelFilter; label: string }[] = [
  { id: "all", label: "All Levels" },
  { id: "beginner", label: "🌱 Beginner" },
  { id: "mid", label: "🚀 Mid-Level" },
  { id: "senior", label: "⚡ Senior" },
];

export default function HomePage() {
  const [os, setOs] = useState<OS>("ubuntu");
  const [detectedOs, setDetectedOs] = useState<OS | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const d = detectOS();
    setDetectedOs(d);
    setOs(d);
  }, []);

  const allTools = useMemo(() => CATEGORIES.flatMap((c) => c.tools), []);

  const toggle = (id: string) => {
    setActivePresetId(null);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = (categoryId: string, visibleToolIds?: string[]) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return;
    setActivePresetId(null);
    const allowed = visibleToolIds ? new Set(visibleToolIds) : null;
    setSelected((prev) => {
      const next = new Set(prev);
      cat.tools.forEach((t) => {
        if (allowed && !allowed.has(t.id)) return;
        if (t.commands[os] && t.commands[os]!.length > 0) next.add(t.id);
      });
      return next;
    });
  };

  const deselectAll = (categoryId: string, visibleToolIds?: string[]) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return;
    setActivePresetId(null);
    const allowed = visibleToolIds ? new Set(visibleToolIds) : null;
    setSelected((prev) => {
      const next = new Set(prev);
      cat.tools.forEach((t) => {
        if (!allowed || allowed.has(t.id)) next.delete(t.id);
      });
      return next;
    });
  };

  const applyPreset = (preset: Preset) => {
    const supportedIds = preset.toolIds.filter((id) => {
      const tool = allTools.find((t) => t.id === id);
      return !!(tool?.commands[os] && tool.commands[os]!.length > 0);
    });
    setSelected(new Set(supportedIds));
    setActivePresetId(preset.id);
  };

  const handleGenerate = () => {
    const md = generateMarkdown(selected, os);
    setMarkdown(md);
    setShowModal(true);
  };

  const totalTools = allTools.length;
  const levelCounts = useMemo(
    () => ({
      all: totalTools,
      beginner: allTools.filter((t) => t.level === "beginner").length,
      mid: allTools.filter((t) => t.level === "mid").length,
      senior: allTools.filter((t) => t.level === "senior").length,
    }),
    [allTools, totalTools]
  );

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
            setup script any AI agent can run — built for beginner, mid-level,
            and senior engineers.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[#8b8ba0]">
            <div>
              <span className="text-white font-semibold">{totalTools}</span> tools
            </div>
            <div>
              <span className="text-white font-semibold">
                {CATEGORIES.length}
              </span>{" "}
              categories
            </div>
            <div>
              <span className="text-white font-semibold">3</span> operating
              systems
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          {/* OS Section */}
          <div className="card-glow rounded-2xl bg-[#111118] border border-[#2a2a3e] p-5 sm:p-6 mb-6">
            <OSSelector
              selected={os}
              detected={detectedOs}
              onChange={(newOs) => {
                setOs(newOs);
                setActivePresetId(null);
                // Clear selections that aren't supported on the new OS
                setSelected((prev) => {
                  const next = new Set<string>();
                  prev.forEach((id) => {
                    const tool = allTools.find((t) => t.id === id);
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
                  [
                    "2. Pick preset or tools",
                    "Start with a role preset or filter by Beginner / Mid / Senior",
                  ],
                  [
                    "3. Generate & share",
                    "Copy or download the .md and share with any AI agent",
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="flex flex-col gap-1 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <span className="text-white font-medium text-xs">
                      {title}
                    </span>
                    <span>{desc}</span>
                  </div>
                ))}
              </ol>
            </div>
          </div>

          {/* Quick Stack Presets */}
          <div className="card-glow rounded-2xl bg-[#111118] border border-[#2a2a3e] p-5 sm:p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h2 className="text-base font-semibold text-white">
                  Quick Stack Presets
                </h2>
              </div>
              <span className="text-xs text-[#8b8ba0]">
                One-click starter stacks by experience & role — customize freely below
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PRESETS.map((preset) => {
                const supportedCount = preset.toolIds.filter((id) => {
                  const tool = allTools.find((t) => t.id === id);
                  return !!(tool?.commands[os] && tool.commands[os]!.length > 0);
                }).length;
                const isActive = activePresetId === preset.id;

                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={clsx(
                      "text-left p-3.5 rounded-xl border transition-all",
                      isActive
                        ? "bg-indigo-500/15 border-indigo-500/60 shadow-[0_0_0_1px_rgba(99,102,241,0.25)]"
                        : "bg-white/[0.02] border-[#2a2a3e] hover:border-indigo-500/40 hover:bg-indigo-500/5"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-white flex items-center gap-1.5">
                        <span>{preset.icon}</span>
                        <span>{preset.label}</span>
                      </span>
                      <span className="text-[11px] text-indigo-300 font-medium shrink-0">
                        {isActive ? "✓ Applied" : `${supportedCount} tools`}
                      </span>
                    </div>
                    <p className="text-xs text-[#8b8ba0] leading-relaxed">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Section */}
          <div className="card-glow rounded-2xl bg-[#111118] border border-[#2a2a3e] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
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
                  onClick={() => {
                    setSelected(new Set());
                    setActivePresetId(null);
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#2a2a3e] text-[#8b8ba0] hover:text-red-400 hover:border-red-500/30 transition-colors"
                >
                  Clear all ({selected.size})
                </button>
              )}
            </div>

            {/* Search & Level Filter Bar */}
            <div className="flex flex-col md:flex-row gap-3 mb-6 pb-5 border-b border-[#2a2a3e]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8b8ba0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools, stacks, or tags (e.g. docker, python, k8s, ai, security)..."
                  className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#0a0a0f] border border-[#2a2a3e] text-sm text-white placeholder-[#8b8ba0]/70 focus:outline-none focus:border-indigo-500/60 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b8ba0] hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {LEVEL_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setLevelFilter(f.id)}
                    className={clsx(
                      "px-3 py-2 rounded-xl text-xs font-medium border transition-all",
                      levelFilter === f.id
                        ? "bg-indigo-500/20 text-indigo-200 border-indigo-500/50"
                        : "bg-[#0a0a0f] text-[#8b8ba0] border-[#2a2a3e] hover:text-white hover:border-indigo-500/30"
                    )}
                  >
                    {f.label}{" "}
                    <span className="opacity-70">({levelCounts[f.id]})</span>
                  </button>
                ))}
              </div>
            </div>

            <ToolCatalog
              categories={CATEGORIES}
              selected={selected}
              os={os}
              searchQuery={searchQuery}
              levelFilter={levelFilter}
              onToggle={toggle}
              onSelectAll={selectAll}
              onDeselectAll={deselectAll}
              onResetFilters={() => {
                setSearchQuery("");
                setLevelFilter("all");
              }}
            />
          </div>
        </main>

        {/* Footer / Developer Credit */}
        <footer className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="card-glow rounded-2xl bg-[#111118] border border-[#2a2a3e] p-5 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">
                Built by{" "}
                <span className="gradient-text">mahamudulhasanmonir</span>
              </p>
              <p className="text-xs text-[#8b8ba0] mt-0.5">
                Questions, feedback, or tool requests? Reach out anytime.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full sm:w-auto">
              <a
                href="https://github.com/mahamudulhasanmonir"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-[#2a2a3e] hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Github className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-[#8b8ba0]">
                      GitHub
                    </div>
                    <div className="text-xs font-medium text-white truncate">
                      @mahamudulhasanmonir
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8b8ba0] group-hover:text-indigo-300 shrink-0 transition-colors" />
              </a>
              <a
                href="mailto:bd.mahamuduldev@gmail.com"
                className="group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-[#2a2a3e] hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-[#8b8ba0]">
                      Email
                    </div>
                    <div className="text-xs font-medium text-white truncate">
                      bd.mahamuduldev@gmail.com
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8b8ba0] group-hover:text-indigo-300 shrink-0 transition-colors" />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Sticky bottom bar */}
      <StickyBar selected={selected.size} onGenerate={handleGenerate} />

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
