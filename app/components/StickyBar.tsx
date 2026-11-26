"use client";

interface Props {
  selected: number;
  onGenerate: () => void;
}

export default function StickyBar({ selected, onGenerate }: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 border-t border-[#2a2a3e] bg-[#0a0a0f]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="text-sm text-[#8b8ba0]">
          {selected === 0 ? (
            <span>Select tools above to get started</span>
          ) : (
            <span>
              <span className="text-white font-medium">{selected}</span> tool
              {selected !== 1 ? "s" : ""} selected
            </span>
          )}
        </div>
        <button
          onClick={onGenerate}
          disabled={selected === 0}
          className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all
            bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed
            text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          Generate Setup Script →
        </button>
      </div>
    </div>
  );
}
