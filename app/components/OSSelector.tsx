"use client";
import { OS } from "@/app/lib/tools";
import clsx from "clsx";

interface Props {
  selected: OS;
  detected: OS | null;
  onChange: (os: OS) => void;
}

const OS_OPTIONS: { id: OS; label: string; icon: string; desc: string }[] = [
  { id: "ubuntu", label: "Ubuntu / Debian", icon: "🐧", desc: "apt-get · .deb packages" },
  { id: "macos", label: "macOS", icon: "🍎", desc: "Homebrew · brew install" },
  { id: "windows", label: "Windows 10/11", icon: "🪟", desc: "winget · PowerShell" },
];

export default function OSSelector({ selected, detected, onChange }: Props) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">💻</span>
        <div>
          <h2 className="text-lg font-semibold text-white">Target OS</h2>
          {detected ? (
            <p className="text-sm text-[#8b8ba0]">
              Auto-detected: <span className="text-indigo-400 font-medium">{OS_OPTIONS.find(o => o.id === detected)?.label}</span>
              {detected === selected && (
                <span className="ml-2 text-green-500 text-xs">✓ applied</span>
              )}
            </p>
          ) : (
            <p className="text-sm text-[#8b8ba0]">Select your target operating system</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OS_OPTIONS.map((os) => (
          <button
            key={os.id}
            onClick={() => onChange(os.id)}
            className={clsx(
              "os-btn flex items-center gap-3 px-4 py-3 rounded-xl border text-left",
              "border-[#2a2a3e] bg-[#111118] hover:border-indigo-500/50",
              selected === os.id && "active"
            )}
          >
            <span className="text-2xl">{os.icon}</span>
            <div>
              <div className="font-semibold text-sm text-white">{os.label}</div>
              <div className="text-xs text-[#8b8ba0] mt-0.5">{os.desc}</div>
            </div>
            {detected === os.id && (
              <span className="ml-auto tag bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                detected
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
