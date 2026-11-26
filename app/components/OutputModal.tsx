"use client";
import { useState } from "react";
import { Copy, Check, Download, X } from "lucide-react";

interface Props {
  markdown: string;
  count: number;
  onClose: () => void;
}

export default function OutputModal({ markdown, count, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dev-setup.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-[#2a2a3e] bg-[#111118] shadow-2xl flex flex-col animate-slide-up"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2a2a3e]">
          <div>
            <h2 className="font-semibold text-white text-lg">
              🎉 Your Setup Script
            </h2>
            <p className="text-sm text-[#8b8ba0] mt-0.5">
              {count} tool{count !== 1 ? "s" : ""} selected · Share this{" "}
              <code className="text-indigo-400">.md</code> with any AI agent
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-[#8b8ba0] hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action bar */}
        <div className="flex gap-2 p-4 border-b border-[#2a2a3e]">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a2a3e] hover:bg-white/5 text-white text-sm font-medium transition-colors"
          >
            <Download size={15} />
            Download .md
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5">
          <pre className="font-mono text-xs text-[#c0c0d0] leading-relaxed whitespace-pre-wrap break-words">
            {markdown}
          </pre>
        </div>
      </div>
    </div>
  );
}
