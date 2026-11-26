"use client";
import { Category, OS, SkillLevel } from "@/app/lib/tools";
import clsx from "clsx";

export type LevelFilter = "all" | SkillLevel;

interface Props {
  categories: Category[];
  selected: Set<string>;
  os: OS;
  searchQuery: string;
  levelFilter: LevelFilter;
  onToggle: (id: string) => void;
  onSelectAll: (categoryId: string, visibleToolIds?: string[]) => void;
  onDeselectAll: (categoryId: string, visibleToolIds?: string[]) => void;
  onResetFilters: () => void;
}

const LEVEL_BADGE: Record<SkillLevel, { label: string; className: string }> = {
  beginner: {
    label: "Beginner",
    className:
      "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  },
  mid: {
    label: "Mid",
    className: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  },
  senior: {
    label: "Senior",
    className: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
  },
};

const TAG_COLORS: Record<string, string> = {
  essential: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  cli: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  gui: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  vcs: "bg-green-500/20 text-green-300 border border-green-500/30",
  node: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  js: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  ts: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  php: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  docker: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
  k8s: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  devops: "bg-red-500/20 text-red-300 border border-red-500/30",
  iac: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  database: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
  ai: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  cloud: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  security: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  testing: "bg-lime-500/20 text-lime-300 border border-lime-500/30",
  python: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  go: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  rust: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  terminal: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
  default: "bg-white/5 text-[#8b8ba0] border border-white/10",
};

function getTagColor(tag: string) {
  return TAG_COLORS[tag] || TAG_COLORS.default;
}

export default function ToolCatalog({
  categories,
  selected,
  os,
  searchQuery,
  levelFilter,
  onToggle,
  onSelectAll,
  onDeselectAll,
  onResetFilters,
}: Props) {
  const query = searchQuery.trim().toLowerCase();

  const filteredCategories = categories
    .map((cat) => {
      const visibleTools = cat.tools.filter((tool) => {
        if (levelFilter !== "all" && tool.level !== levelFilter) return false;
        if (!query) return true;
        return (
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          cat.label.toLowerCase().includes(query)
        );
      });
      return { ...cat, visibleTools };
    })
    .filter((cat) => cat.visibleTools.length > 0);

  if (filteredCategories.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-[#2a2a3e] rounded-xl bg-white/[0.01]">
        <p className="text-sm text-white font-medium mb-1">
          No tools matched your filters
        </p>
        <p className="text-xs text-[#8b8ba0] mb-4">
          Try clearing your search query or switching back to All levels.
        </p>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {filteredCategories.map((cat) => {
        const supportedVisible = cat.visibleTools.filter(
          (t) => t.commands[os] && t.commands[os]!.length > 0
        );
        const visibleIds = cat.visibleTools.map((t) => t.id);
        const catSelected = cat.visibleTools.filter((t) =>
          selected.has(t.id)
        ).length;
        const allSelected =
          supportedVisible.length > 0 &&
          supportedVisible.every((t) => selected.has(t.id));

        return (
          <section key={cat.id} className="animate-slide-up">
            {/* Category header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  {cat.label}
                </h3>
                <span className="text-xs text-[#8b8ba0]">
                  ({cat.visibleTools.length})
                </span>
                {catSelected > 0 && (
                  <span className="tag bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {catSelected}/{cat.visibleTools.length} selected
                  </span>
                )}
              </div>
              {supportedVisible.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      allSelected
                        ? onDeselectAll(cat.id, visibleIds)
                        : onSelectAll(cat.id, visibleIds)
                    }
                    className="text-xs text-[#8b8ba0] hover:text-indigo-400 transition-colors"
                  >
                    {allSelected ? "Deselect all" : "Select all"}
                  </button>
                </div>
              )}
            </div>

            {/* Tools grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.visibleTools.map((tool) => {
                const isSelected = selected.has(tool.id);
                const isSupported = !!(
                  tool.commands[os] && tool.commands[os]!.length > 0
                );
                const levelInfo = LEVEL_BADGE[tool.level];

                return (
                  <label
                    key={tool.id}
                    className={clsx(
                      "tool-card flex gap-3 items-start p-3 rounded-xl border cursor-pointer",
                      "border-[#2a2a3e]",
                      isSelected && "selected",
                      !isSupported && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="checkbox-custom mt-0.5"
                      checked={isSelected}
                      disabled={!isSupported}
                      onChange={() => isSupported && onToggle(tool.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                        <span className="text-sm font-medium text-white leading-tight">
                          {tool.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className={`tag text-[10px] ${levelInfo.className}`}
                          >
                            {levelInfo.label}
                          </span>
                          {!isSupported && (
                            <span className="tag bg-red-500/15 text-red-400 border border-red-500/20 text-[10px]">
                              unavailable on {os}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#8b8ba0] leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={`tag ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
