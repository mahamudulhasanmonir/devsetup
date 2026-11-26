"use client";
import { Category, OS } from "@/app/lib/tools";
import clsx from "clsx";

interface Props {
  categories: Category[];
  selected: Set<string>;
  os: OS;
  onToggle: (id: string) => void;
  onSelectAll: (categoryId: string) => void;
  onDeselectAll: (categoryId: string) => void;
}

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
  devops: "bg-red-500/20 text-red-300 border border-red-500/30",
  database: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
  ai: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  cloud: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  default: "bg-white/5 text-[#8b8ba0] border border-white/10",
};

function getTagColor(tag: string) {
  return TAG_COLORS[tag] || TAG_COLORS.default;
}

export default function ToolCatalog({
  categories,
  selected,
  os,
  onToggle,
  onSelectAll,
  onDeselectAll,
}: Props) {
  return (
    <div className="space-y-8">
      {categories.map((cat) => {
        const catSelected = cat.tools.filter((t) => selected.has(t.id)).length;
        const allSelected = catSelected === cat.tools.length;

        return (
          <section key={cat.id} className="animate-slide-up">
            {/* Category header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  {cat.label}
                </h3>
                {catSelected > 0 && (
                  <span className="tag bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {catSelected}/{cat.tools.length}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    allSelected ? onDeselectAll(cat.id) : onSelectAll(cat.id)
                  }
                  className="text-xs text-[#8b8ba0] hover:text-indigo-400 transition-colors"
                >
                  {allSelected ? "Deselect all" : "Select all"}
                </button>
              </div>
            </div>

            {/* Tools grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.tools.map((tool) => {
                const isSelected = selected.has(tool.id);
                const isSupported = !!(
                  tool.commands[os] && tool.commands[os]!.length > 0
                );

                return (
                  <label
                    key={tool.id}
                    className={clsx(
                      "tool-card flex gap-3 items-start p-3 rounded-xl border cursor-pointer",
                      "border-[#2a2a3e]",
                      isSelected && "selected",
                      !isSupported && "opacity-50"
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
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-sm font-medium text-white leading-tight">
                          {tool.name}
                        </span>
                        {!isSupported && (
                          <span className="tag bg-red-500/15 text-red-400 border border-red-500/20 text-[10px]">
                            unavailable on this OS
                          </span>
                        )}
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
