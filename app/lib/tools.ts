// All available OS targets
export type OS = "ubuntu" | "macos" | "windows";

// Experience / complexity tier to help beginner, mid-level, and senior engineers navigate
export type SkillLevel = "beginner" | "mid" | "senior";

export interface Tool {
  id: string;
  name: string;
  description: string;
  level: SkillLevel;
  tags: string[];
  // Commands keyed by OS — only the exact command(s) needed
  commands: Partial<Record<OS, string[]>>;
  // Optional: post-install note shown in the MD
  note?: string;
  // Optional: check if already installed command
  checkCmd?: Partial<Record<OS, string>>;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  tools: Tool[];
}

export interface Preset {
  id: string;
  label: string;
  icon: string;
  level: SkillLevel;
  description: string;
  toolIds: string[];
}

export const PRESETS: Preset[] = [
  {
    id: "beginner-starter",
    label: "Beginner Web & Coding",
    icon: "🌱",
    level: "beginner",
    description: "Core essentials to start coding fast",
    toolIds: [
      "homebrew",
      "git",
      "gh",
      "vscode",
      "nvm",
      "python",
      "sqlite",
      "postman",
      "ext-frontend",
    ],
  },
  {
    id: "mid-fullstack",
    label: "Mid-Level Full-Stack",
    icon: "🚀",
    level: "mid",
    description: "Modern web, databases, containers & APIs",
    toolIds: [
      "homebrew",
      "git",
      "gh",
      "zsh-ohmyzsh",
      "starship",
      "vscode",
      "nvm",
      "pnpm",
      "typescript",
      "python",
      "uv",
      "postgresql",
      "redis",
      "beekeeper",
      "docker",
      "bruno",
      "ext-frontend",
      "ext-docker-git",
    ],
  },
  {
    id: "senior-devops",
    label: "Senior / DevOps & Cloud",
    icon: "⚡",
    level: "senior",
    description: "Kubernetes, IaC, security & terminal power-tools",
    toolIds: [
      "git",
      "gh",
      "build-essential",
      "tmux",
      "lazygit",
      "cli-search-pack",
      "direnv",
      "neovim",
      "docker",
      "compose",
      "lazydocker",
      "kubectl",
      "helm",
      "k9s",
      "terraform",
      "aws-cli",
      "trivy",
      "gitleaks",
      "k6",
      "act",
    ],
  },
  {
    id: "ai-python",
    label: "AI & Python Engineer",
    icon: "🤖",
    level: "mid",
    description: "Local LLMs, coding agents & fast Python tooling",
    toolIds: [
      "git",
      "gh",
      "vscode",
      "python",
      "uv",
      "ollama",
      "claude-code",
      "gemini-cli",
      "postgresql",
      "redis",
      "docker",
      "ext-python-ai",
    ],
  },
  {
    id: "php-wordpress",
    label: "PHP, Laravel & WordPress",
    icon: "🐘",
    level: "beginner",
    description: "Complete PHP, Composer, Laravel & WP stack",
    toolIds: [
      "git",
      "php",
      "composer",
      "wpcli",
      "laravel-installer",
      "localwp",
      "mariadb",
      "nginx",
      "beekeeper",
      "vscode",
      "ext-php",
    ],
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "core",
    label: "Core Tools & Terminal Productivity",
    icon: "🔧",
    tools: [
      {
        id: "homebrew",
        name: "Homebrew",
        description: "The missing package manager for macOS (and optional on Linux)",
        level: "beginner",
        tags: ["package-manager", "essential"],
        checkCmd: {
          ubuntu: "brew --version",
          macos: "brew --version",
        },
        commands: {
          ubuntu: [
            '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
          ],
          macos: [
            '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
          ],
        },
      },
      {
        id: "git",
        name: "Git",
        description: "Distributed version control system — mandatory for every engineer",
        level: "beginner",
        tags: ["vcs", "essential"],
        checkCmd: {
          ubuntu: "git --version",
          macos: "git --version",
          windows: "git --version",
        },
        commands: {
          ubuntu: ["sudo apt-get install -y git"],
          macos: ["brew install git"],
          windows: ["winget install --id Git.Git -e --source winget"],
        },
      },
      {
        id: "gh",
        name: "GitHub CLI (gh)",
        description: "Create PRs, review code, clone repos, and inspect CI from terminal",
        level: "beginner",
        tags: ["cli", "vcs", "essential"],
        checkCmd: {
          ubuntu: "gh --version",
          macos: "gh --version",
          windows: "gh --version",
        },
        commands: {
          ubuntu: [
            "(type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y))",
            "sudo mkdir -p -m 755 /etc/apt/keyrings",
            "out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg && cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null",
            "sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg",
            'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null',
            "sudo apt update && sudo apt install gh -y",
          ],
          macos: ["brew install gh"],
          windows: ["winget install --id GitHub.cli -e --source winget"],
        },
      },
      {
        id: "build-essential",
        name: "Build Essentials & Core Utils",
        description: "gcc, make, jq, tree, htop, unzip — compiler toolchain & shell utilities",
        level: "beginner",
        tags: ["build", "cli", "essential"],
        checkCmd: {
          ubuntu: "gcc --version && jq --version",
          macos: "jq --version",
          windows: "jq --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y build-essential gcc make jq tree htop unzip curl wget",
          ],
          macos: [
            "xcode-select --install 2>/dev/null || true",
            "brew install jq tree htop",
          ],
          windows: [
            "winget install --id ezwinports.make -e --source winget",
            "winget install --id jqlang.jq -e --source winget",
          ],
        },
      },
      {
        id: "zsh-ohmyzsh",
        name: "Zsh + Oh My Zsh",
        description: "Modern shell with plugins, git status themes, and smart autocomplete",
        level: "mid",
        tags: ["shell", "terminal"],
        checkCmd: {
          ubuntu: "zsh --version",
          macos: "zsh --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y zsh",
            'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended',
            "chsh -s $(which zsh)",
          ],
          macos: [
            "brew install zsh",
            'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended',
          ],
        },
      },
      {
        id: "starship",
        name: "Starship Prompt",
        description: "Minimal, blazing-fast cross-shell prompt showing git, node, python & k8s",
        level: "mid",
        tags: ["shell", "terminal", "cli"],
        note: 'Add `eval "$(starship init bash)"` or `eval "$(starship init zsh)"` to your shell config.',
        checkCmd: {
          ubuntu: "starship --version",
          macos: "starship --version",
          windows: "starship --version",
        },
        commands: {
          ubuntu: ["curl -sS https://starship.rs/install.sh | sh -s -- -y"],
          macos: ["brew install starship"],
          windows: ["winget install --id Starship.Starship -e --source winget"],
        },
      },
      {
        id: "cli-search-pack",
        name: "Modern CLI Pack (ripgrep + fzf + bat)",
        description: "Fast regex code search (rg), fuzzy finder (fzf), and syntax-highlighted cat (bat)",
        level: "senior",
        tags: ["cli", "terminal"],
        checkCmd: {
          ubuntu: "rg --version && fzf --version",
          macos: "rg --version && fzf --version && bat --version",
          windows: "rg --version && fzf --version && bat --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y ripgrep fzf bat",
            "mkdir -p ~/.local/bin && ln -sf /usr/bin/batcat ~/.local/bin/bat",
          ],
          macos: ["brew install ripgrep fzf bat"],
          windows: [
            "winget install --id BurntSushi.ripgrep.MSVC -e --source winget",
            "winget install --id junegunn.fzf -e --source winget",
            "winget install --id sharkdp.bat -e --source winget",
          ],
        },
      },
      {
        id: "lazygit",
        name: "LazyGit",
        description: "Interactive terminal UI for staging hunks, interactive rebase & diffing",
        level: "mid",
        tags: ["vcs", "cli", "terminal"],
        checkCmd: {
          ubuntu: "lazygit --version",
          macos: "lazygit --version",
          windows: "lazygit --version",
        },
        commands: {
          ubuntu: [
            'LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po \'"tag_name": *"v\\K[^"]*\')',
            'curl -Lo /tmp/lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/download/v${LAZYGIT_VERSION}/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"',
            "sudo tar xf /tmp/lazygit.tar.gz -C /usr/local/bin lazygit && rm -f /tmp/lazygit.tar.gz",
          ],
          macos: ["brew install lazygit"],
          windows: ["winget install --id JesseDuffield.lazygit -e --source winget"],
        },
      },
      {
        id: "tmux",
        name: "tmux",
        description: "Terminal multiplexer for persistent remote sessions and split panes",
        level: "senior",
        tags: ["terminal", "cli"],
        checkCmd: {
          ubuntu: "tmux -V",
          macos: "tmux -V",
        },
        commands: {
          ubuntu: ["sudo apt-get install -y tmux"],
          macos: ["brew install tmux"],
        },
      },
      {
        id: "direnv",
        name: "direnv",
        description: "Automatically load and unload per-project `.envrc` environment variables",
        level: "senior",
        tags: ["cli", "shell", "devops"],
        note: 'Hook into shell with `eval "$(direnv hook bash)"` or `eval "$(direnv hook zsh)"`.',
        checkCmd: {
          ubuntu: "direnv --version",
          macos: "direnv --version",
        },
        commands: {
          ubuntu: ["sudo apt-get install -y direnv"],
          macos: ["brew install direnv"],
        },
      },
    ],
  },
  {
    id: "editors",
    label: "Editors & IDEs",
    icon: "✍️",
    tools: [
      {
        id: "vscode",
        name: "VS Code",
        description: "Most popular code editor — fast, extensible, free",
        level: "beginner",
        tags: ["editor", "gui", "essential"],
        checkCmd: {
          ubuntu: "code --version",
          macos: "code --version",
          windows: "code --version",
        },
        commands: {
          ubuntu: [
            "wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg",
            "sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg",
            'sudo sh -c \'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list\'',
            "sudo apt update && sudo apt install code -y",
          ],
          macos: ["brew install --cask visual-studio-code"],
          windows: ["winget install --id Microsoft.VisualStudioCode -e --source winget"],
        },
      },
      {
        id: "cursor",
        name: "Cursor",
        description: "AI-first code editor built on VS Code with agentic multi-file editing",
        level: "mid",
        tags: ["editor", "ai", "gui"],
        commands: {
          ubuntu: [
            "curl -L https://downloader.cursor.sh/linux/appImage/x64 -o /tmp/cursor.AppImage",
            "chmod +x /tmp/cursor.AppImage && sudo mv /tmp/cursor.AppImage /usr/local/bin/cursor",
          ],
          macos: ["brew install --cask cursor"],
          windows: ["winget install --id Anysphere.Cursor -e --source winget"],
        },
      },
      {
        id: "zed",
        name: "Zed",
        description: "High-performance multiplayer code editor written in Rust with AI support",
        level: "mid",
        tags: ["editor", "gui", "ai"],
        commands: {
          ubuntu: ["curl -f https://zed.dev/install.sh | sh"],
          macos: ["brew install --cask zed"],
          windows: ["winget install --id ZedIndustries.Zed -e --source winget"],
        },
      },
      {
        id: "sublime-text",
        name: "Sublime Text 4",
        description: "Lightweight, instant-startup code & large-file editor",
        level: "beginner",
        tags: ["editor", "gui"],
        commands: {
          ubuntu: [
            "wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/sublimehq-archive.gpg > /dev/null",
            'echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list',
            "sudo apt-get update && sudo apt-get install -y sublime-text",
          ],
          macos: ["brew install --cask sublime-text"],
          windows: ["winget install --id SublimeHQ.SublimeText.4 -e --source winget"],
        },
      },
      {
        id: "jetbrains-toolbox",
        name: "JetBrains Toolbox",
        description: "Manage IntelliJ IDEA, PyCharm, WebStorm, GoLand & PhpStorm IDEs",
        level: "mid",
        tags: ["editor", "gui", "java"],
        commands: {
          ubuntu: [
            "# Download Linux .tar.gz from https://www.jetbrains.com/toolbox-app/",
            "# Extract and run: tar -xzf jetbrains-toolbox-*.tar.gz && ./jetbrains-toolbox-*/jetbrains-toolbox",
          ],
          macos: ["brew install --cask jetbrains-toolbox"],
          windows: ["winget install --id JetBrains.Toolbox -e --source winget"],
        },
      },
      {
        id: "neovim",
        name: "Neovim",
        description: "Hyperextensible Vim-based text editor for keyboard-driven workflows",
        level: "senior",
        tags: ["editor", "terminal"],
        checkCmd: {
          ubuntu: "nvim --version",
          macos: "nvim --version",
          windows: "nvim --version",
        },
        commands: {
          ubuntu: [
            "sudo add-apt-repository -y ppa:neovim-ppa/unstable",
            "sudo apt-get update && sudo apt-get install -y neovim",
          ],
          macos: ["brew install neovim"],
          windows: ["winget install --id Neovim.Neovim -e --source winget"],
        },
      },
    ],
  },
  {
    id: "node",
    label: "JavaScript / TypeScript & Frontend",
    icon: "⚡",
    tools: [
      {
        id: "nvm",
        name: "NVM + Node.js LTS",
        description: "Version manager + latest LTS Node. Install first, then npm tools auto-work.",
        level: "beginner",
        tags: ["node", "js", "essential"],
        note: "After install, restart your shell or run `source ~/.bashrc` / `source ~/.zshrc`.",
        checkCmd: {
          ubuntu: "node -v && npm -v",
          macos: "node -v && npm -v",
          windows: "node -v && npm -v",
        },
        commands: {
          ubuntu: [
            "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash",
            'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"',
            "nvm install --lts && nvm use --lts && nvm alias default lts/*",
          ],
          macos: [
            "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash",
            'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"',
            "nvm install --lts && nvm use --lts && nvm alias default lts/*",
          ],
          windows: [
            "winget install --id CoreyButler.NVMforWindows -e --source winget",
            "# After install, open a new terminal, then run:",
            "nvm install lts && nvm use lts",
          ],
        },
      },
      {
        id: "fnm",
        name: "fnm (Fast Node Manager)",
        description: "Ultra-fast Rust-based Node.js version manager with auto `.nvmrc` switching",
        level: "mid",
        tags: ["node", "js", "cli"],
        checkCmd: {
          ubuntu: "fnm --version",
          macos: "fnm --version",
          windows: "fnm --version",
        },
        commands: {
          ubuntu: ["curl -fsSL https://fnm.vercel.app/install | bash"],
          macos: ["brew install fnm"],
          windows: ["winget install --id Schniz.fnm -e --source winget"],
        },
      },
      {
        id: "pnpm",
        name: "pnpm",
        description: "Fast, disk-space-efficient package manager — standard for Next.js monorepos",
        level: "mid",
        tags: ["package-manager", "js"],
        checkCmd: {
          ubuntu: "pnpm --version",
          macos: "pnpm --version",
          windows: "pnpm --version",
        },
        commands: {
          ubuntu: ["npm install -g pnpm@latest"],
          macos: ["npm install -g pnpm@latest"],
          windows: ["npm install -g pnpm@latest"],
        },
      },
      {
        id: "bun",
        name: "Bun",
        description: "Ultra-fast all-in-one JS runtime, bundler, test runner & package manager",
        level: "mid",
        tags: ["runtime", "js"],
        checkCmd: {
          ubuntu: "bun --version",
          macos: "bun --version",
          windows: "bun --version",
        },
        commands: {
          ubuntu: ["curl -fsSL https://bun.sh/install | bash"],
          macos: ["curl -fsSL https://bun.sh/install | bash"],
          windows: ['powershell -c "irm bun.sh/install.ps1 | iex"'],
        },
      },
      {
        id: "yarn",
        name: "Yarn",
        description: "Alternative JavaScript package manager",
        level: "mid",
        tags: ["package-manager", "js"],
        checkCmd: {
          ubuntu: "yarn --version",
          macos: "yarn --version",
          windows: "yarn --version",
        },
        commands: {
          ubuntu: ["npm install -g yarn@latest"],
          macos: ["npm install -g yarn@latest"],
          windows: ["npm install -g yarn@latest"],
        },
      },
      {
        id: "deno",
        name: "Deno",
        description: "Secure-by-default TypeScript & JavaScript runtime with built-in linter/formatter",
        level: "mid",
        tags: ["runtime", "ts"],
        checkCmd: {
          ubuntu: "deno --version",
          macos: "deno --version",
          windows: "deno --version",
        },
        commands: {
          ubuntu: ["curl -fsSL https://deno.land/install.sh | sh"],
          macos: ["brew install deno"],
          windows: ["winget install --id DenoLand.Deno -e --source winget"],
        },
      },
      {
        id: "typescript",
        name: "TypeScript (global)",
        description: "Typed superset of JavaScript — global CLI for tsc and ts-node",
        level: "mid",
        tags: ["ts", "js"],
        checkCmd: {
          ubuntu: "tsc --version",
          macos: "tsc --version",
          windows: "tsc --version",
        },
        commands: {
          ubuntu: ["npm install -g typescript ts-node"],
          macos: ["npm install -g typescript ts-node"],
          windows: ["npm install -g typescript ts-node"],
        },
      },
      {
        id: "turbo",
        name: "Turborepo CLI",
        description: "High-performance build system & task caching for JS/TS monorepos",
        level: "senior",
        tags: ["build", "ts", "cli"],
        checkCmd: {
          ubuntu: "turbo --version",
          macos: "turbo --version",
          windows: "turbo --version",
        },
        commands: {
          ubuntu: ["npm install -g turbo"],
          macos: ["npm install -g turbo"],
          windows: ["npm install -g turbo"],
        },
      },
      {
        id: "vercel-cli",
        name: "Vercel CLI",
        description: "Preview deployments, pull env vars, and deploy Next.js apps from terminal",
        level: "mid",
        tags: ["cloud", "cli", "js"],
        checkCmd: {
          ubuntu: "vercel --version",
          macos: "vercel --version",
          windows: "vercel --version",
        },
        commands: {
          ubuntu: ["npm install -g vercel"],
          macos: ["npm install -g vercel"],
          windows: ["npm install -g vercel"],
        },
      },
    ],
  },
  {
    id: "languages",
    label: "Languages, Runtimes & SDKs",
    icon: "🦀",
    tools: [
      {
        id: "python",
        name: "Python 3 + pip + venv",
        description: "Latest Python with pip and virtualenv — great for beginners, APIs & AI",
        level: "beginner",
        tags: ["python", "language", "essential"],
        checkCmd: {
          ubuntu: "python3 --version",
          macos: "python3 --version",
          windows: "python --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y python3 python3-pip python3-venv python3-dev",
          ],
          macos: ["brew install python@3.12"],
          windows: ["winget install --id Python.Python.3.12 -e --source winget"],
        },
      },
      {
        id: "uv",
        name: "uv (Astral Python Manager)",
        description: "Blazing-fast Python package, virtualenv & Python version manager in Rust",
        level: "mid",
        tags: ["python", "package-manager", "cli"],
        checkCmd: {
          ubuntu: "uv --version",
          macos: "uv --version",
          windows: "uv --version",
        },
        commands: {
          ubuntu: ["curl -LsSf https://astral.sh/uv/install.sh | sh"],
          macos: ["brew install uv"],
          windows: ["winget install --id astral-sh.uv -e --source winget"],
        },
      },
      {
        id: "go",
        name: "Go",
        description: "Fast, statically typed language from Google — ideal for APIs, CLIs & infra",
        level: "mid",
        tags: ["go", "language"],
        checkCmd: {
          ubuntu: "go version",
          macos: "go version",
          windows: "go version",
        },
        commands: {
          ubuntu: [
            "GO_VER=$(curl -s https://go.dev/VERSION?m=text | head -1)",
            "wget -O /tmp/go.tar.gz https://go.dev/dl/${GO_VER}.linux-amd64.tar.gz",
            "sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf /tmp/go.tar.gz",
            'echo \'export PATH=$PATH:/usr/local/go/bin\' >> ~/.bashrc && source ~/.bashrc',
          ],
          macos: ["brew install go"],
          windows: ["winget install --id GoLang.Go -e --source winget"],
        },
      },
      {
        id: "rust",
        name: "Rust + Cargo",
        description: "Systems programming language — memory safety, zero-cost abstractions & Wasm",
        level: "senior",
        tags: ["rust", "language"],
        checkCmd: {
          ubuntu: "rustc --version && cargo --version",
          macos: "rustc --version && cargo --version",
          windows: "rustc --version && cargo --version",
        },
        commands: {
          ubuntu: [
            "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",
            "source $HOME/.cargo/env",
          ],
          macos: [
            "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",
            "source $HOME/.cargo/env",
          ],
          windows: ["winget install --id Rustlang.Rustup -e --source winget"],
        },
      },
      {
        id: "java",
        name: "Java (OpenJDK 21 LTS)",
        description: "OpenJDK 21 LTS — Android, Spring Boot, and enterprise development",
        level: "mid",
        tags: ["java", "language"],
        checkCmd: {
          ubuntu: "java -version",
          macos: "java -version",
          windows: "java -version",
        },
        commands: {
          ubuntu: ["sudo apt-get install -y openjdk-21-jdk"],
          macos: ["brew install openjdk@21"],
          windows: [
            "winget install --id EclipseAdoptium.Temurin.21.JDK -e --source winget",
          ],
        },
      },
      {
        id: "dotnet",
        name: ".NET 8 LTS SDK",
        description: "Cross-platform C#, F#, ASP.NET Core & microservices SDK",
        level: "mid",
        tags: ["dotnet", "language"],
        checkCmd: {
          ubuntu: "dotnet --version",
          macos: "dotnet --version",
          windows: "dotnet --version",
        },
        commands: {
          ubuntu: ["sudo apt-get update && sudo apt-get install -y dotnet-sdk-8.0"],
          macos: ["brew install --cask dotnet-sdk"],
          windows: ["winget install --id Microsoft.DotNet.SDK.8 -e --source winget"],
        },
      },
      {
        id: "flutter",
        name: "Flutter SDK",
        description: "Google's cross-platform UI SDK for iOS, Android, web, and desktop",
        level: "mid",
        tags: ["mobile", "language"],
        note: "Run `flutter doctor` after installation to check platform-specific dependencies.",
        checkCmd: {
          ubuntu: "flutter --version",
          macos: "flutter --version",
          windows: "flutter --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get update && sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa clang cmake ninja-build pkg-config libgtk-3-dev",
            "git clone https://github.com/flutter/flutter.git -b stable ~/flutter",
            'echo \'export PATH="$HOME/flutter/bin:$PATH"\' >> ~/.bashrc && source ~/.bashrc',
          ],
          macos: ["brew install --cask flutter"],
          windows: [
            "git clone https://github.com/flutter/flutter.git -b stable C:\\src\\flutter",
            "# Add C:\\src\\flutter\\bin to your Windows PATH environment variable",
          ],
        },
      },
      {
        id: "cmake",
        name: "CMake",
        description: "Cross-platform C/C++ build system generator for native libraries",
        level: "senior",
        tags: ["build", "language"],
        checkCmd: {
          ubuntu: "cmake --version",
          macos: "cmake --version",
          windows: "cmake --version",
        },
        commands: {
          ubuntu: ["sudo apt-get install -y cmake"],
          macos: ["brew install cmake"],
          windows: ["winget install --id Kitware.CMake -e --source winget"],
        },
      },
      {
        id: "mise",
        name: "mise (Polyglot Version Manager)",
        description: "Manage Node, Python, Go, Rust & env vars across projects in one fast CLI",
        level: "senior",
        tags: ["cli", "runtime", "devops"],
        note: 'Activate in your shell with `eval "$(~/.local/bin/mise activate bash)"` or `zsh`.',
        checkCmd: {
          ubuntu: "mise --version",
          macos: "mise --version",
          windows: "mise --version",
        },
        commands: {
          ubuntu: ["curl -fsSL https://mise.run | sh"],
          macos: ["brew install mise"],
          windows: ["winget install --id jdx.mise -e --source winget"],
        },
      },
    ],
  },
  {
    id: "php",
    label: "PHP, Laravel & WordPress",
    icon: "🐘",
    tools: [
      {
        id: "php",
        name: "PHP 8.3 + Extensions",
        description: "php-cli, fpm, mysql, curl, xml, mbstring, zip, gd, intl, soap, bcmath, imagick",
        level: "beginner",
        tags: ["php", "backend"],
        checkCmd: {
          ubuntu: "php -v",
          macos: "php -v",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y software-properties-common",
            "sudo add-apt-repository -y ppa:ondrej/php",
            "sudo apt-get update",
            "sudo apt-get install -y php8.3 php8.3-cli php8.3-fpm php8.3-mysql php8.3-curl php8.3-xml php8.3-mbstring php8.3-zip php8.3-gd php8.3-intl php8.3-soap php8.3-bcmath php8.3-imagick",
          ],
          macos: [
            "brew tap shivammathur/php",
            "brew install shivammathur/php/php@8.3",
            "brew link --overwrite --force php@8.3",
          ],
        },
      },
      {
        id: "composer",
        name: "Composer",
        description: "PHP dependency and package manager",
        level: "beginner",
        tags: ["php", "package-manager"],
        checkCmd: {
          ubuntu: "composer --version",
          macos: "composer --version",
          windows: "composer --version",
        },
        commands: {
          ubuntu: [
            "curl -sS https://getcomposer.org/installer | php",
            "sudo mv composer.phar /usr/local/bin/composer",
            "sudo chmod +x /usr/local/bin/composer",
          ],
          macos: [
            "curl -sS https://getcomposer.org/installer | php",
            "sudo mv composer.phar /usr/local/bin/composer",
            "sudo chmod +x /usr/local/bin/composer",
          ],
          windows: ["winget install --id Composer.Composer -e --source winget"],
        },
      },
      {
        id: "wpcli",
        name: "WP-CLI",
        description: "Official command-line tool for managing WordPress sites",
        level: "mid",
        tags: ["wordpress", "cli"],
        checkCmd: {
          ubuntu: "wp --info",
          macos: "wp --info",
        },
        commands: {
          ubuntu: [
            "curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar",
            "chmod +x wp-cli.phar && sudo mv wp-cli.phar /usr/local/bin/wp",
          ],
          macos: [
            "curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar",
            "chmod +x wp-cli.phar && sudo mv wp-cli.phar /usr/local/bin/wp",
          ],
          windows: [
            "# Download wp-cli.phar from https://wp-cli.org and place in PATH",
            "curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar",
          ],
        },
      },
      {
        id: "laravel-installer",
        name: "Laravel Installer CLI",
        description: "Scaffold new Laravel PHP applications quickly (`laravel new app`)",
        level: "mid",
        tags: ["php", "cli"],
        note: "Requires PHP + Composer installed. Add Composer global vendor/bin to PATH.",
        checkCmd: {
          ubuntu: "laravel --version",
          macos: "laravel --version",
          windows: "laravel --version",
        },
        commands: {
          ubuntu: ["composer global require laravel/installer"],
          macos: ["composer global require laravel/installer"],
          windows: ["composer global require laravel/installer"],
        },
      },
      {
        id: "localwp",
        name: "LocalWP",
        description: "Local by Flywheel — GUI app for effortless local WordPress development",
        level: "beginner",
        tags: ["wordpress", "gui"],
        note: "Download and install manually from https://localwp.com if no package manager is listed.",
        commands: {
          ubuntu: [
            "# Download from https://localwp.com/releases/",
            "# Then install the .deb: sudo dpkg -i Local-*.deb && sudo apt-get install -f",
          ],
          macos: ["brew install --cask local"],
          windows: ["# Download and install from https://localwp.com/releases/"],
        },
      },
      {
        id: "mariadb",
        name: "MariaDB / MySQL Server",
        description: "Standalone local database server (use if not using Docker or LocalWP)",
        level: "beginner",
        tags: ["database", "mysql"],
        checkCmd: {
          ubuntu: "mariadb --version",
          macos: "mariadb --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y mariadb-server mariadb-client",
            "sudo systemctl enable mariadb && sudo systemctl start mariadb",
            "sudo mysql_secure_installation",
          ],
          macos: ["brew install mariadb", "brew services start mariadb"],
          windows: ["winget install --id MariaDB.Server -e --source winget"],
        },
      },
      {
        id: "nginx",
        name: "Nginx Web Server",
        description: "High-performance local web server & reverse proxy",
        level: "mid",
        tags: ["web-server", "backend"],
        checkCmd: {
          ubuntu: "nginx -v",
          macos: "nginx -v",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y nginx",
            "sudo systemctl enable nginx && sudo systemctl start nginx",
          ],
          macos: ["brew install nginx", "brew services start nginx"],
          windows: ["winget install --id nginx.nginx -e --source winget"],
        },
      },
    ],
  },
  {
    id: "databases",
    label: "Databases, Caches & GUI Clients",
    icon: "🗄️",
    tools: [
      {
        id: "sqlite",
        name: "SQLite 3 CLI",
        description: "Zero-config embedded SQL database — ideal for beginners & local prototyping",
        level: "beginner",
        tags: ["database", "cli"],
        checkCmd: {
          ubuntu: "sqlite3 --version",
          macos: "sqlite3 --version",
          windows: "sqlite3 --version",
        },
        commands: {
          ubuntu: ["sudo apt-get install -y sqlite3"],
          macos: ["brew install sqlite"],
          windows: ["winget install --id SQLite.SQLite -e --source winget"],
        },
      },
      {
        id: "postgresql",
        name: "PostgreSQL + psql",
        description: "Industry-standard relational database for full-stack apps & SaaS",
        level: "mid",
        tags: ["database", "backend"],
        checkCmd: {
          ubuntu: "psql --version",
          macos: "psql --version",
          windows: "psql --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y postgresql postgresql-contrib",
            "sudo systemctl enable postgresql && sudo systemctl start postgresql",
          ],
          macos: ["brew install postgresql@16", "brew services start postgresql@16"],
          windows: [
            "winget install --id PostgreSQL.PostgreSQL.16 -e --source winget",
          ],
        },
      },
      {
        id: "redis",
        name: "Redis",
        description: "In-memory data structure store — caching, sessions, queues & pub/sub",
        level: "mid",
        tags: ["database", "cache", "backend"],
        checkCmd: {
          ubuntu: "redis-cli --version",
          macos: "redis-cli --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y redis-server",
            "sudo systemctl enable redis-server && sudo systemctl start redis-server",
          ],
          macos: ["brew install redis", "brew services start redis"],
          windows: ["winget install --id Memurai.Memurai -e --source winget"],
        },
      },
      {
        id: "mongosh",
        name: "MongoDB Shell (mongosh)",
        description: "Modern interactive CLI shell for querying and administering MongoDB",
        level: "mid",
        tags: ["database", "cli"],
        checkCmd: {
          ubuntu: "mongosh --version",
          macos: "mongosh --version",
          windows: "mongosh --version",
        },
        commands: {
          ubuntu: [
            "curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor",
            'echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list',
            "sudo apt-get update && sudo apt-get install -y mongodb-mongosh",
          ],
          macos: ["brew install mongosh"],
          windows: ["winget install --id MongoDB.Shell -e --source winget"],
        },
      },
      {
        id: "mongodb-compass",
        name: "MongoDB Compass",
        description: "Official GUI for exploring MongoDB collections, aggregations & indexes",
        level: "beginner",
        tags: ["database", "gui"],
        commands: {
          ubuntu: [
            "wget -O /tmp/mongodb-compass.deb https://downloads.mongodb.com/compass/mongodb-compass_1.44.4_amd64.deb",
            "sudo apt install -y /tmp/mongodb-compass.deb && rm -f /tmp/mongodb-compass.deb",
          ],
          macos: ["brew install --cask mongodb-compass"],
          windows: ["winget install --id MongoDB.Compass.Full -e --source winget"],
        },
      },
      {
        id: "beekeeper",
        name: "Beekeeper Studio",
        description: "Clean, modern GUI for MySQL, PostgreSQL, SQLite, MariaDB",
        level: "beginner",
        tags: ["gui", "database"],
        commands: {
          ubuntu: [
            "wget -qO - https://deb.beekeeperstudio.io/beekeeper.key | sudo apt-key add -",
            'echo "deb https://deb.beekeeperstudio.io stable main" | sudo tee /etc/apt/sources.list.d/beekeeper-studio-app.list',
            "sudo apt update && sudo apt install beekeeper-studio -y",
          ],
          macos: ["brew install --cask beekeeper-studio"],
          windows: [
            "winget install --id BeekeeperStudio.BeekeeperStudio -e --source winget",
          ],
        },
      },
      {
        id: "dbeaver",
        name: "DBeaver Community",
        description: "Powerful universal DB management with ER diagrams & schema tools",
        level: "mid",
        tags: ["gui", "database"],
        commands: {
          ubuntu: [
            "wget -O /tmp/dbeaver.deb https://dbeaver.io/files/dbeaver-ce_latest_amd64.deb",
            "sudo apt install /tmp/dbeaver.deb -y",
          ],
          macos: ["brew install --cask dbeaver-community"],
          windows: ["winget install --id dbeaver.dbeaver -e --source winget"],
        },
      },
    ],
  },
  {
    id: "api",
    label: "API Testing & HTTP Clients",
    icon: "🔌",
    tools: [
      {
        id: "postman",
        name: "Postman",
        description: "Full-featured platform for building, testing, and documenting APIs",
        level: "beginner",
        tags: ["api", "testing", "gui"],
        commands: {
          ubuntu: [
            "curl -o /tmp/postman.tar.gz https://dl.pstmn.io/download/latest/linux64",
            "sudo tar -xzf /tmp/postman.tar.gz -C /opt",
            "sudo ln -sf /opt/Postman/Postman /usr/local/bin/postman",
          ],
          macos: ["brew install --cask postman"],
          windows: ["winget install --id Postman.Postman -e --source winget"],
        },
      },
      {
        id: "bruno",
        name: "Bruno",
        description: "Lightweight, offline-first, Git-friendly API client (collections in repo)",
        level: "mid",
        tags: ["api", "testing", "gui"],
        commands: {
          ubuntu: [
            "sudo mkdir -p /etc/apt/keyrings",
            "sudo gpg --no-default-keyring --keyring /etc/apt/keyrings/bruno.gpg --keyserver keyserver.ubuntu.com --recv-keys 9FA6017ECABE0266",
            'echo "deb [signed-by=/etc/apt/keyrings/bruno.gpg] http://debian.usebruno.com/ bruno stable" | sudo tee /etc/apt/sources.list.d/bruno.list',
            "sudo apt update && sudo apt install bruno",
          ],
          macos: ["brew install --cask bruno"],
          windows: ["winget install --id Bruno.Bruno -e --source winget"],
        },
      },
      {
        id: "insomnia",
        name: "Insomnia",
        description: "Open-source REST, GraphQL, WebSocket & gRPC API testing client",
        level: "mid",
        tags: ["api", "testing", "gui"],
        commands: {
          ubuntu: [
            "curl -1sLf 'https://packages.konghq.com/public/insomnia/setup.deb.sh' | sudo -E distro=ubuntu codename=$(lsb_release -cs) bash",
            "sudo apt-get update && sudo apt-get install -y insomnia",
          ],
          macos: ["brew install --cask insomnia"],
          windows: ["winget install --id Kong.Insomnia -e --source winget"],
        },
      },
      {
        id: "httpie",
        name: "HTTPie CLI",
        description: "Human-friendly terminal HTTP client with colorized JSON output",
        level: "mid",
        tags: ["api", "cli", "testing"],
        checkCmd: {
          ubuntu: "http --version",
          macos: "http --version",
        },
        commands: {
          ubuntu: ["sudo apt-get install -y httpie"],
          macos: ["brew install httpie"],
          windows: ["winget install --id HTTPie.HTTPie -e --source winget"],
        },
      },
      {
        id: "grpcurl",
        name: "grpcurl",
        description: "Command-line tool like curl for interacting with gRPC microservices",
        level: "senior",
        tags: ["api", "cli", "backend"],
        checkCmd: {
          ubuntu: "grpcurl --version",
          macos: "grpcurl --version",
          windows: "grpcurl --version",
        },
        commands: {
          ubuntu: [
            'GRPCURL_VER=$(curl -s "https://api.github.com/repos/fullstorydev/grpcurl/releases/latest" | grep -Po \'"tag_name": *"v\\K[^"]*\')',
            'curl -Lo /tmp/grpcurl.tar.gz "https://github.com/fullstorydev/grpcurl/releases/download/v${GRPCURL_VER}/grpcurl_${GRPCURL_VER}_linux_x86_64.tar.gz"',
            "sudo tar xf /tmp/grpcurl.tar.gz -C /usr/local/bin grpcurl && rm -f /tmp/grpcurl.tar.gz",
          ],
          macos: ["brew install grpcurl"],
          windows: ["go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest"],
        },
      },
    ],
  },
  {
    id: "containers",
    label: "Containers & Kubernetes",
    icon: "🐳",
    tools: [
      {
        id: "docker",
        name: "Docker Engine + CLI",
        description: "Containerization platform — run isolated databases, apps, and stacks",
        level: "mid",
        tags: ["docker", "devops", "essential"],
        checkCmd: {
          ubuntu: "docker --version",
          macos: "docker --version",
          windows: "docker --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y ca-certificates curl gnupg lsb-release",
            "sudo mkdir -p /etc/apt/keyrings",
            "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg",
            'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null',
            "sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin",
            "sudo usermod -aG docker $USER",
            'echo "Log out and back in for Docker group changes to take effect."',
          ],
          macos: [
            "brew install --cask docker",
            "# Then open Docker.app to complete setup",
          ],
          windows: [
            "winget install --id Docker.DockerDesktop -e --source winget",
          ],
        },
        note: "On Ubuntu, log out and back in after install so your user has Docker permissions.",
      },
      {
        id: "compose",
        name: "Docker Compose (standalone)",
        description: "Multi-container orchestration — WordPress + MySQL + Redis stacks",
        level: "mid",
        tags: ["docker", "devops"],
        checkCmd: {
          ubuntu: "docker-compose --version",
          macos: "docker-compose --version",
          windows: "docker compose version",
        },
        commands: {
          ubuntu: [
            'COMPOSE_VER=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d\\" -f4)',
            'sudo curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VER}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose',
            "sudo chmod +x /usr/local/bin/docker-compose",
          ],
          macos: ["brew install docker-compose"],
          windows: [
            "# Docker Desktop on Windows includes Compose — no extra install needed.",
          ],
        },
      },
      {
        id: "podman",
        name: "Podman",
        description: "Daemonless, rootless OCI container engine (drop-in Docker alternative)",
        level: "senior",
        tags: ["docker", "devops", "security"],
        checkCmd: {
          ubuntu: "podman --version",
          macos: "podman --version",
          windows: "podman --version",
        },
        commands: {
          ubuntu: ["sudo apt-get update && sudo apt-get install -y podman"],
          macos: ["brew install podman"],
          windows: ["winget install --id RedHat.Podman -e --source winget"],
        },
      },
      {
        id: "lazydocker",
        name: "LazyDocker",
        description: "Simple terminal UI for managing Docker containers, logs & images",
        level: "mid",
        tags: ["docker", "terminal", "cli"],
        checkCmd: {
          ubuntu: "lazydocker --version",
          macos: "lazydocker --version",
          windows: "lazydocker --version",
        },
        commands: {
          ubuntu: [
            'LAZYDOCKER_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazydocker/releases/latest" | grep -Po \'"tag_name": *"v\\K[^"]*\')',
            'curl -Lo /tmp/lazydocker.tar.gz "https://github.com/jesseduffield/lazydocker/releases/download/v${LAZYDOCKER_VERSION}/lazydocker_${LAZYDOCKER_VERSION}_Linux_x86_64.tar.gz"',
            "sudo tar xf /tmp/lazydocker.tar.gz -C /usr/local/bin lazydocker && rm -f /tmp/lazydocker.tar.gz",
          ],
          macos: ["brew install lazydocker"],
          windows: [
            "winget install --id JesseDuffield.Lazydocker -e --source winget",
          ],
        },
      },
      {
        id: "kubectl",
        name: "kubectl",
        description: "Kubernetes command-line tool — inspect pods, logs, and deployments",
        level: "senior",
        tags: ["k8s", "devops", "cli"],
        checkCmd: {
          ubuntu: "kubectl version --client",
          macos: "kubectl version --client",
          windows: "kubectl version --client",
        },
        commands: {
          ubuntu: [
            'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"',
            "sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl",
          ],
          macos: ["brew install kubectl"],
          windows: [
            "winget install --id Kubernetes.kubectl -e --source winget",
          ],
        },
      },
      {
        id: "helm",
        name: "Helm",
        description: "Kubernetes package manager for templating and releasing Helm charts",
        level: "senior",
        tags: ["k8s", "devops", "cli"],
        checkCmd: {
          ubuntu: "helm version",
          macos: "helm version",
          windows: "helm version",
        },
        commands: {
          ubuntu: [
            "curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash",
          ],
          macos: ["brew install helm"],
          windows: ["winget install --id Helm.Helm -e --source winget"],
        },
      },
      {
        id: "k9s",
        name: "k9s",
        description: "Interactive terminal dashboard to navigate & troubleshoot Kubernetes clusters",
        level: "senior",
        tags: ["k8s", "devops", "terminal"],
        checkCmd: {
          ubuntu: "k9s version",
          macos: "k9s version",
          windows: "k9s version",
        },
        commands: {
          ubuntu: [
            'K9S_VERSION=$(curl -s "https://api.github.com/repos/derailed/k9s/releases/latest" | grep -Po \'"tag_name": *"v\\K[^"]*\')',
            'curl -Lo /tmp/k9s.tar.gz "https://github.com/derailed/k9s/releases/download/v${K9S_VERSION}/k9s_Linux_amd64.tar.gz"',
            "sudo tar xf /tmp/k9s.tar.gz -C /usr/local/bin k9s && rm -f /tmp/k9s.tar.gz",
          ],
          macos: ["brew install k9s"],
          windows: ["winget install --id Derailed.k9s -e --source winget"],
        },
      },
      {
        id: "kind",
        name: "kind (Kubernetes in Docker)",
        description: "Spin up local multi-node Kubernetes clusters in seconds using Docker",
        level: "senior",
        tags: ["k8s", "docker", "testing"],
        checkCmd: {
          ubuntu: "kind version",
          macos: "kind version",
          windows: "kind version",
        },
        commands: {
          ubuntu: [
            'KIND_VER=$(curl -s "https://api.github.com/repos/kubernetes-sigs/kind/releases/latest" | grep -Po \'"tag_name": *"\\K[^"]*\')',
            'curl -Lo ./kind "https://kind.sigs.k8s.io/dl/${KIND_VER}/kind-linux-amd64"',
            "chmod +x ./kind && sudo mv ./kind /usr/local/bin/kind",
          ],
          macos: ["brew install kind"],
          windows: ["winget install --id Kubernetes.kind -e --source winget"],
        },
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud, IaC & Platform Engineering",
    icon: "☁️",
    tools: [
      {
        id: "aws-cli",
        name: "AWS CLI v2",
        description: "Manage AWS infrastructure, S3, IAM, EKS & ECS from the terminal",
        level: "mid",
        tags: ["cloud", "aws", "cli"],
        checkCmd: {
          ubuntu: "aws --version",
          macos: "aws --version",
          windows: "aws --version",
        },
        commands: {
          ubuntu: [
            "curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o /tmp/awscliv2.zip",
            "unzip -q /tmp/awscliv2.zip -d /tmp/awscliv2",
            "sudo /tmp/awscliv2/aws/install",
          ],
          macos: ["brew install awscli"],
          windows: ["winget install --id Amazon.AWSCLI -e --source winget"],
        },
      },
      {
        id: "gcloud",
        name: "Google Cloud CLI (gcloud)",
        description: "Manage GCP projects, Cloud Run, GKE, BigQuery & IAM",
        level: "mid",
        tags: ["cloud", "cli"],
        checkCmd: {
          ubuntu: "gcloud version",
          macos: "gcloud version",
          windows: "gcloud version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates gnupg curl",
            "curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg",
            'echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list',
            "sudo apt-get update && sudo apt-get install -y google-cloud-cli",
          ],
          macos: ["brew install --cask google-cloud-sdk"],
          windows: ["winget install --id Google.CloudSDK -e --source winget"],
        },
      },
      {
        id: "azure-cli",
        name: "Azure CLI (az)",
        description: "Manage Microsoft Azure resources, AKS, Key Vault & App Services",
        level: "mid",
        tags: ["cloud", "cli"],
        checkCmd: {
          ubuntu: "az version",
          macos: "az version",
          windows: "az version",
        },
        commands: {
          ubuntu: ["curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash"],
          macos: ["brew install azure-cli"],
          windows: [
            "winget install --id Microsoft.AzureCLI -e --source winget",
          ],
        },
      },
      {
        id: "terraform",
        name: "Terraform",
        description: "HashiCorp Infrastructure as Code — provision cloud resources declaratively",
        level: "senior",
        tags: ["devops", "iac", "cloud"],
        checkCmd: {
          ubuntu: "terraform -version",
          macos: "terraform -version",
          windows: "terraform -version",
        },
        commands: {
          ubuntu: [
            "wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg",
            'echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list',
            "sudo apt update && sudo apt install -y terraform",
          ],
          macos: [
            "brew tap hashicorp/tap",
            "brew install hashicorp/tap/terraform",
          ],
          windows: [
            "winget install --id Hashicorp.Terraform -e --source winget",
          ],
        },
      },
      {
        id: "opentofu",
        name: "OpenTofu",
        description: "Open-source Terraform-compatible Infrastructure as Code engine",
        level: "senior",
        tags: ["devops", "iac", "cloud"],
        checkCmd: {
          ubuntu: "tofu version",
          macos: "tofu version",
          windows: "tofu version",
        },
        commands: {
          ubuntu: [
            "curl --proto '=https' --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh -o /tmp/install-opentofu.sh",
            "chmod +x /tmp/install-opentofu.sh && /tmp/install-opentofu.sh --install-method deb",
            "rm -f /tmp/install-opentofu.sh",
          ],
          macos: ["brew install opentofu"],
          windows: ["winget install --id OpenTofu.Tofu -e --source winget"],
        },
      },
      {
        id: "pulumi",
        name: "Pulumi",
        description: "Modern Infrastructure as Code written in TypeScript, Python, Go, or C#",
        level: "senior",
        tags: ["devops", "iac", "cloud"],
        checkCmd: {
          ubuntu: "pulumi version",
          macos: "pulumi version",
          windows: "pulumi version",
        },
        commands: {
          ubuntu: ["curl -fsSL https://get.pulumi.com | sh"],
          macos: ["brew install pulumi/tap/pulumi"],
          windows: ["winget install --id Pulumi.Pulumi -e --source winget"],
        },
      },
      {
        id: "ansible",
        name: "Ansible",
        description: "Agentless IT automation, server provisioning & configuration management",
        level: "senior",
        tags: ["devops", "iac", "cli"],
        checkCmd: {
          ubuntu: "ansible --version",
          macos: "ansible --version",
        },
        commands: {
          ubuntu: ["sudo apt-get update && sudo apt-get install -y ansible"],
          macos: ["brew install ansible"],
        },
      },
    ],
  },
  {
    id: "ai",
    label: "AI Coding & Local LLMs",
    icon: "🤖",
    tools: [
      {
        id: "ollama",
        name: "Ollama",
        description: "Run open-source LLMs (Llama, Qwen, DeepSeek, Gemma) locally & offline",
        level: "beginner",
        tags: ["ai", "cli"],
        checkCmd: {
          ubuntu: "ollama --version",
          macos: "ollama --version",
          windows: "ollama --version",
        },
        commands: {
          ubuntu: ["curl -fsSL https://ollama.com/install.sh | sh"],
          macos: ["brew install ollama"],
          windows: ["winget install --id Ollama.Ollama -e --source winget"],
        },
      },
      {
        id: "gemini-cli",
        name: "Gemini CLI",
        description: "Google's open-source agentic AI coding assistant right in your terminal",
        level: "beginner",
        tags: ["ai", "cli"],
        note: "Requires Node.js installed first.",
        checkCmd: {
          ubuntu: "gemini --version",
          macos: "gemini --version",
          windows: "gemini --version",
        },
        commands: {
          ubuntu: ["npm install -g @google/gemini-cli"],
          macos: ["npm install -g @google/gemini-cli"],
          windows: ["npm install -g @google/gemini-cli"],
        },
      },
      {
        id: "claude-code",
        name: "Claude Code",
        description: "Anthropic's agentic terminal assistant for multi-file codebase work",
        level: "mid",
        tags: ["ai", "cli"],
        note: "Requires Node.js installed first.",
        checkCmd: {
          ubuntu: "claude --version",
          macos: "claude --version",
          windows: "claude --version",
        },
        commands: {
          ubuntu: ["npm install -g @anthropic-ai/claude-code"],
          macos: ["npm install -g @anthropic-ai/claude-code"],
          windows: ["npm install -g @anthropic-ai/claude-code"],
        },
      },
      {
        id: "codex-cli",
        name: "OpenAI Codex CLI",
        description: "OpenAI's lightweight terminal coding agent for editing & running tasks",
        level: "mid",
        tags: ["ai", "cli"],
        note: "Requires Node.js installed first.",
        checkCmd: {
          ubuntu: "codex --version",
          macos: "codex --version",
          windows: "codex --version",
        },
        commands: {
          ubuntu: ["npm install -g @openai/codex"],
          macos: ["npm install -g @openai/codex"],
          windows: ["npm install -g @openai/codex"],
        },
      },
      {
        id: "aider",
        name: "Aider",
        description: "AI pair programming in your terminal with clean Git commits & repo map",
        level: "senior",
        tags: ["ai", "python", "cli"],
        note: "Installs cleanly in an isolated env using `uv` (or `pipx`).",
        checkCmd: {
          ubuntu: "aider --version",
          macos: "aider --version",
          windows: "aider --version",
        },
        commands: {
          ubuntu: ["uv tool install aider-chat"],
          macos: ["uv tool install aider-chat"],
          windows: ["uv tool install aider-chat"],
        },
      },
    ],
  },
  {
    id: "devtools",
    label: "Networking, Security & Testing Utilities",
    icon: "🛠️",
    tools: [
      {
        id: "ngrok",
        name: "ngrok",
        description: "Expose local servers to the internet for webhooks and quick demos",
        level: "beginner",
        tags: ["tunnel", "networking"],
        checkCmd: {
          ubuntu: "ngrok version",
          macos: "ngrok version",
          windows: "ngrok version",
        },
        commands: {
          ubuntu: [
            "curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null",
            'echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list',
            "sudo apt update && sudo apt install ngrok",
          ],
          macos: ["brew install ngrok"],
          windows: ["winget install --id ngrok.ngrok -e --source winget"],
        },
      },
      {
        id: "cloudflared",
        name: "Cloudflared (Cloudflare Tunnel)",
        description: "Expose localhost apps securely without opening firewall ports",
        level: "mid",
        tags: ["tunnel", "networking", "cloud"],
        checkCmd: {
          ubuntu: "cloudflared --version",
          macos: "cloudflared --version",
          windows: "cloudflared --version",
        },
        commands: {
          ubuntu: [
            "sudo mkdir -p --mode=0755 /usr/share/keyrings",
            "curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null",
            'echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflared.list',
            "sudo apt-get update && sudo apt-get install -y cloudflared",
          ],
          macos: ["brew install cloudflared"],
          windows: [
            "winget install --id Cloudflare.cloudflared -e --source winget",
          ],
        },
      },
      {
        id: "mkcert",
        name: "mkcert",
        description: "Create locally trusted HTTPS certificates with zero configuration",
        level: "mid",
        tags: ["ssl", "security", "local-dev"],
        checkCmd: {
          ubuntu: "mkcert --version",
          macos: "mkcert --version",
          windows: "mkcert --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y libnss3-tools",
            "curl -JLO https://dl.filippo.io/mkcert/latest?for=linux/amd64",
            "chmod +x mkcert-v*-linux-amd64 && sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert",
            "mkcert -install",
          ],
          macos: ["brew install mkcert && mkcert -install"],
          windows: [
            "winget install --id FiloSottile.mkcert -e --source winget",
          ],
        },
      },
      {
        id: "stripe-cli",
        name: "Stripe CLI",
        description: "Forward Stripe webhooks and test SaaS payment events locally",
        level: "mid",
        tags: ["saas", "payments", "cli"],
        checkCmd: {
          ubuntu: "stripe --version",
          macos: "stripe --version",
          windows: "stripe --version",
        },
        commands: {
          ubuntu: [
            "curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg",
            'echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee /etc/apt/sources.list.d/stripe.list',
            "sudo apt update && sudo apt install stripe",
          ],
          macos: ["brew install stripe/stripe-cli/stripe"],
          windows: ["winget install --id Stripe.StripeCLI -e --source winget"],
        },
      },
      {
        id: "tailscale",
        name: "Tailscale",
        description: "Zero-config WireGuard mesh VPN to reach dev servers, DBs & staging",
        level: "senior",
        tags: ["networking", "security"],
        checkCmd: {
          ubuntu: "tailscale version",
          macos: "tailscale version",
        },
        commands: {
          ubuntu: ["curl -fsSL https://tailscale.com/install.sh | sh"],
          macos: ["brew install --cask tailscale"],
          windows: [
            "winget install --id Tailscale.Tailscale -e --source winget",
          ],
        },
      },
      {
        id: "k6",
        name: "Grafana k6",
        description: "Developer-centric JavaScript load & performance testing CLI",
        level: "senior",
        tags: ["testing", "cli"],
        checkCmd: {
          ubuntu: "k6 version",
          macos: "k6 version",
          windows: "k6 version",
        },
        commands: {
          ubuntu: [
            "sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69",
            'echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list',
            "sudo apt-get update && sudo apt-get install -y k6",
          ],
          macos: ["brew install k6"],
          windows: ["winget install --id k6.k6 -e --source winget"],
        },
      },
      {
        id: "act",
        name: "act (Local GitHub Actions)",
        description: "Run and debug `.github/workflows` locally in Docker before pushing",
        level: "senior",
        tags: ["devops", "testing", "cli"],
        checkCmd: {
          ubuntu: "act --version",
          macos: "act --version",
          windows: "act --version",
        },
        commands: {
          ubuntu: [
            "curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash -s -- -b /usr/local/bin",
          ],
          macos: ["brew install act"],
          windows: ["winget install --id nektos.act -e --source winget"],
        },
      },
      {
        id: "trivy",
        name: "Trivy",
        description: "All-in-one vulnerability scanner for containers, filesystems & IaC",
        level: "senior",
        tags: ["security", "devops", "cli"],
        checkCmd: {
          ubuntu: "trivy --version",
          macos: "trivy --version",
          windows: "trivy --version",
        },
        commands: {
          ubuntu: [
            "sudo apt-get install -y wget apt-transport-https gnupg lsb-release",
            "wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null",
            'echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/trivy.list',
            "sudo apt-get update && sudo apt-get install -y trivy",
          ],
          macos: ["brew install trivy"],
          windows: [
            "winget install --id AquaSecurity.Trivy -e --source winget",
          ],
        },
      },
      {
        id: "gitleaks",
        name: "Gitleaks",
        description: "Scan Git commits and repos for accidentally leaked secrets & API keys",
        level: "senior",
        tags: ["security", "vcs", "cli"],
        checkCmd: {
          ubuntu: "gitleaks version",
          macos: "gitleaks version",
          windows: "gitleaks version",
        },
        commands: {
          ubuntu: [
            'GITLEAKS_VERSION=$(curl -s "https://api.github.com/repos/gitleaks/gitleaks/releases/latest" | grep -Po \'"tag_name": *["v]?\\K[^"]*\')',
            'curl -Lo /tmp/gitleaks.tar.gz "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz"',
            "sudo tar xf /tmp/gitleaks.tar.gz -C /usr/local/bin gitleaks && rm -f /tmp/gitleaks.tar.gz",
          ],
          macos: ["brew install gitleaks"],
          windows: [
            "winget install --id Gitleaks.Gitleaks -e --source winget",
          ],
        },
      },
      {
        id: "sops",
        name: "SOPS (Encrypted Secrets)",
        description: "Encrypt `.env`, YAML & JSON secrets safely in Git with KMS or age keys",
        level: "senior",
        tags: ["security", "devops", "cli"],
        checkCmd: {
          ubuntu: "sops --version",
          macos: "sops --version",
          windows: "sops --version",
        },
        commands: {
          ubuntu: [
            'SOPS_VERSION=$(curl -s "https://api.github.com/repos/getsops/sops/releases/latest" | grep -Po \'"tag_name": *"v\\K[^"]*\')',
            'curl -Lo /tmp/sops "https://github.com/getsops/sops/releases/download/v${SOPS_VERSION}/sops-v${SOPS_VERSION}.linux.amd64"',
            "chmod +x /tmp/sops && sudo mv /tmp/sops /usr/local/bin/sops",
          ],
          macos: ["brew install sops"],
          windows: [
            "winget install --id SecretsOPerationS.SOPS -e --source winget",
          ],
        },
      },
    ],
  },
  {
    id: "vscode-ext",
    label: "VS Code Extension Packs",
    icon: "🧩",
    tools: [
      {
        id: "ext-frontend",
        name: "Frontend & Tailwind Pack",
        description: "Tailwind IntelliSense, ESLint, Prettier, ES7+ React/Redux snippets",
        level: "beginner",
        tags: ["vscode", "js", "ts"],
        commands: {
          ubuntu: [
            "code --install-extension bradlc.vscode-tailwindcss",
            "code --install-extension dbaeumer.vscode-eslint",
            "code --install-extension esbenp.prettier-vscode",
            "code --install-extension dsznajder.es7-react-js-snippets",
          ],
          macos: [
            "code --install-extension bradlc.vscode-tailwindcss",
            "code --install-extension dbaeumer.vscode-eslint",
            "code --install-extension esbenp.prettier-vscode",
            "code --install-extension dsznajder.es7-react-js-snippets",
          ],
          windows: [
            "code --install-extension bradlc.vscode-tailwindcss",
            "code --install-extension dbaeumer.vscode-eslint",
            "code --install-extension esbenp.prettier-vscode",
            "code --install-extension dsznajder.es7-react-js-snippets",
          ],
        },
      },
      {
        id: "ext-python-ai",
        name: "Python & Data/AI Pack",
        description: "Python, Pylance, Ruff linter/formatter, and Jupyter notebooks",
        level: "beginner",
        tags: ["vscode", "python", "ai"],
        commands: {
          ubuntu: [
            "code --install-extension ms-python.python",
            "code --install-extension ms-python.vscode-pylance",
            "code --install-extension charliermarsh.ruff",
            "code --install-extension ms-toolsai.jupyter",
          ],
          macos: [
            "code --install-extension ms-python.python",
            "code --install-extension ms-python.vscode-pylance",
            "code --install-extension charliermarsh.ruff",
            "code --install-extension ms-toolsai.jupyter",
          ],
          windows: [
            "code --install-extension ms-python.python",
            "code --install-extension ms-python.vscode-pylance",
            "code --install-extension charliermarsh.ruff",
            "code --install-extension ms-toolsai.jupyter",
          ],
        },
      },
      {
        id: "ext-php",
        name: "PHP & WordPress Pack",
        description: "PHP Intelephense + WordPress Snippets & Gutenberg helpers",
        level: "beginner",
        tags: ["vscode", "php", "wordpress"],
        commands: {
          ubuntu: [
            "code --install-extension bmewburn.vscode-intelephense-client",
            "code --install-extension johnbillion.vscode-wordpress-hooks",
          ],
          macos: [
            "code --install-extension bmewburn.vscode-intelephense-client",
            "code --install-extension johnbillion.vscode-wordpress-hooks",
          ],
          windows: [
            "code --install-extension bmewburn.vscode-intelephense-client",
            "code --install-extension johnbillion.vscode-wordpress-hooks",
          ],
        },
      },
      {
        id: "ext-go-rust",
        name: "Go & Rust Pack",
        description: "Official Go extension + rust-analyzer for systems & backend work",
        level: "mid",
        tags: ["vscode", "go", "rust"],
        commands: {
          ubuntu: [
            "code --install-extension golang.go",
            "code --install-extension rust-lang.rust-analyzer",
          ],
          macos: [
            "code --install-extension golang.go",
            "code --install-extension rust-lang.rust-analyzer",
          ],
          windows: [
            "code --install-extension golang.go",
            "code --install-extension rust-lang.rust-analyzer",
          ],
        },
      },
      {
        id: "ext-docker-git",
        name: "Docker & Git Pack",
        description: "Docker extension + GitLens for deep Git history and blame",
        level: "mid",
        tags: ["vscode", "docker", "vcs"],
        commands: {
          ubuntu: [
            "code --install-extension ms-azuretools.vscode-docker",
            "code --install-extension eamodio.gitlens",
          ],
          macos: [
            "code --install-extension ms-azuretools.vscode-docker",
            "code --install-extension eamodio.gitlens",
          ],
          windows: [
            "code --install-extension ms-azuretools.vscode-docker",
            "code --install-extension eamodio.gitlens",
          ],
        },
      },
      {
        id: "ext-remote-collab",
        name: "Remote & Senior Workflow Pack",
        description: "Remote - SSH, Dev Containers, Error Lens, and YAML/Terraform support",
        level: "senior",
        tags: ["vscode", "devops", "docker"],
        commands: {
          ubuntu: [
            "code --install-extension ms-vscode-remote.remote-ssh",
            "code --install-extension ms-vscode-remote.remote-containers",
            "code --install-extension usernamehw.errorlens",
            "code --install-extension redhat.vscode-yaml",
          ],
          macos: [
            "code --install-extension ms-vscode-remote.remote-ssh",
            "code --install-extension ms-vscode-remote.remote-containers",
            "code --install-extension usernamehw.errorlens",
            "code --install-extension redhat.vscode-yaml",
          ],
          windows: [
            "code --install-extension ms-vscode-remote.remote-ssh",
            "code --install-extension ms-vscode-remote.remote-containers",
            "code --install-extension usernamehw.errorlens",
            "code --install-extension redhat.vscode-yaml",
          ],
        },
      },
    ],
  },
];
