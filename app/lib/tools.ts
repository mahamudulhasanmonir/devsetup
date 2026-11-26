// All available OS targets
export type OS = "ubuntu" | "macos" | "windows";

export interface Tool {
  id: string;
  name: string;
  description: string;
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

export const CATEGORIES: Category[] = [
  {
    id: "core",
    label: "Core Tools & Version Control",
    icon: "🔧",
    tools: [
      {
        id: "git",
        name: "Git",
        description: "Distributed version control system",
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
        description: "Manage PRs, issues, and repos from the terminal",
        tags: ["cli", "github"],
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
        name: "Build Essentials",
        description: "gcc, make, jq, tree, htop, unzip — compiler toolchain & utils",
        tags: ["build", "essential"],
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
        description: "Modern shell with plugins, themes, and autocomplete",
        tags: ["shell", "productivity"],
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
        description: "Version manager + latest LTS Node. Install first, then npm-based tools auto-work.",
        tags: ["node", "js", "essential"],
        note: "After install, restart your shell or run `source ~/.bashrc` / `source ~/.zshrc`.",
        commands: {
          ubuntu: [
            'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash',
            'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"',
            "nvm install --lts && nvm use --lts && nvm alias default lts/*",
          ],
          macos: [
            'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash',
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
        id: "pnpm",
        name: "pnpm",
        description: "Fast, disk-space-efficient package manager — standard for Next.js monorepos",
        tags: ["package-manager", "js"],
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
        tags: ["runtime", "js"],
        commands: {
          ubuntu: ["curl -fsSL https://bun.sh/install | bash"],
          macos: ["curl -fsSL https://bun.sh/install | bash"],
          windows: [
            "powershell -c \"irm bun.sh/install.ps1 | iex\"",
          ],
        },
      },
      {
        id: "yarn",
        name: "Yarn",
        description: "Alternative JavaScript package manager",
        tags: ["package-manager", "js"],
        commands: {
          ubuntu: ["npm install -g yarn@latest"],
          macos: ["npm install -g yarn@latest"],
          windows: ["npm install -g yarn@latest"],
        },
      },
      {
        id: "typescript",
        name: "TypeScript (global)",
        description: "Typed superset of JavaScript — global CLI for ts-node and type checking",
        tags: ["ts", "js"],
        commands: {
          ubuntu: ["npm install -g typescript ts-node"],
          macos: ["npm install -g typescript ts-node"],
          windows: ["npm install -g typescript ts-node"],
        },
      },
    ],
  },
  {
    id: "php",
    label: "PHP & WordPress",
    icon: "🐘",
    tools: [
      {
        id: "php",
        name: "PHP 8.3 + Extensions",
        description: "php-cli, fpm, mysql, curl, xml, mbstring, zip, gd, intl, soap, bcmath, imagick",
        tags: ["php", "backend"],
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
        tags: ["php", "package-manager"],
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
          windows: [
            "winget install --id Composer.Composer -e --source winget",
          ],
        },
      },
      {
        id: "wpcli",
        name: "WP-CLI",
        description: "Official command-line tool for managing WordPress sites",
        tags: ["wordpress", "cli"],
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
        id: "localwp",
        name: "LocalWP",
        description: "Local by Flywheel — GUI app for effortless local WordPress development",
        tags: ["wordpress", "gui"],
        note: "Download and install manually from https://localwp.com — no CLI installer available.",
        commands: {
          ubuntu: [
            "# Download from https://localwp.com/releases/",
            "# Then install the .deb: sudo dpkg -i Local-*.deb && sudo apt-get install -f",
          ],
          macos: [
            "# Download and install from https://localwp.com/releases/",
            "# Or via brew: brew install --cask local",
          ],
          windows: [
            "# Download and install from https://localwp.com/releases/",
          ],
        },
      },
      {
        id: "mariadb",
        name: "MariaDB / MySQL Server",
        description: "Standalone local database server (use if not using Docker or LocalWP)",
        tags: ["database", "mysql"],
        commands: {
          ubuntu: [
            "sudo apt-get install -y mariadb-server mariadb-client",
            "sudo systemctl enable mariadb && sudo systemctl start mariadb",
            "sudo mysql_secure_installation",
          ],
          macos: [
            "brew install mariadb",
            "brew services start mariadb",
          ],
          windows: [
            "winget install --id MariaDB.Server -e --source winget",
          ],
        },
      },
      {
        id: "nginx",
        name: "Nginx Web Server",
        description: "Native local web server for PHP/WordPress",
        tags: ["web-server", "backend"],
        commands: {
          ubuntu: [
            "sudo apt-get install -y nginx",
            "sudo systemctl enable nginx && sudo systemctl start nginx",
          ],
          macos: [
            "brew install nginx",
            "brew services start nginx",
          ],
          windows: [
            "winget install --id nginx.nginx -e --source winget",
          ],
        },
      },
    ],
  },
  {
    id: "containers",
    label: "Containerization & Infrastructure",
    icon: "🐳",
    tools: [
      {
        id: "docker",
        name: "Docker Engine + CLI",
        description: "Containerization platform — run isolated services and stacks",
        tags: ["docker", "devops", "essential"],
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
        tags: ["docker", "devops"],
        commands: {
          ubuntu: [
            'COMPOSE_VER=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d\\" -f4)',
            "sudo curl -L \"https://github.com/docker/compose/releases/download/${COMPOSE_VER}/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
            "sudo chmod +x /usr/local/bin/docker-compose",
          ],
          macos: ["brew install docker-compose"],
          windows: ["# Docker Desktop on Windows includes Compose — no extra install needed."],
        },
      },
      {
        id: "stripe-cli",
        name: "Stripe CLI",
        description: "Test Stripe webhooks and payment flows locally",
        tags: ["saas", "payments", "cli"],
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
    ],
  },
  {
    id: "databases",
    label: "Database GUI Clients",
    icon: "🗄️",
    tools: [
      {
        id: "beekeeper",
        name: "Beekeeper Studio",
        description: "Clean, modern GUI for MySQL, PostgreSQL, SQLite, MariaDB",
        tags: ["gui", "database"],
        commands: {
          ubuntu: [
            "wget -qO - https://deb.beekeeperstudio.io/beekeeper.key | sudo apt-key add -",
            'echo "deb https://deb.beekeeperstudio.io stable main" | sudo tee /etc/apt/sources.list.d/beekeeper-studio-app.list',
            "sudo apt update && sudo apt install beekeeper-studio -y",
          ],
          macos: ["brew install --cask beekeeper-studio"],
          windows: ["winget install --id BeekeeperStudio.BeekeeperStudio -e --source winget"],
        },
      },
      {
        id: "dbeaver",
        name: "DBeaver Community",
        description: "Powerful universal DB management with advanced schema tools",
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
      {
        id: "redis",
        name: "Redis",
        description: "In-memory data structure store — caching, sessions, queues",
        tags: ["database", "cache", "backend"],
        commands: {
          ubuntu: [
            "sudo apt-get install -y redis-server",
            "sudo systemctl enable redis-server && sudo systemctl start redis-server",
          ],
          macos: [
            "brew install redis",
            "brew services start redis",
          ],
          windows: [
            "winget install --id Memurai.Memurai -e --source winget",
          ],
        },
      },
    ],
  },
  {
    id: "api",
    label: "API Testing",
    icon: "🔌",
    tools: [
      {
        id: "bruno",
        name: "Bruno",
        description: "Lightweight, offline-first, Git-friendly API client (Postman alternative)",
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
        id: "postman",
        name: "Postman",
        description: "Full-featured platform for building, testing, and documenting APIs",
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
        tags: ["editor", "gui", "essential"],
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
        description: "AI-first code editor built on VS Code",
        tags: ["editor", "ai", "gui"],
        commands: {
          ubuntu: [
            "# Download from https://cursor.sh",
            "curl -L https://downloader.cursor.sh/linux/appImage/x64 -o /tmp/cursor.AppImage",
            "chmod +x /tmp/cursor.AppImage && sudo mv /tmp/cursor.AppImage /usr/local/bin/cursor",
          ],
          macos: ["brew install --cask cursor"],
          windows: ["winget install --id Anysphere.Cursor -e --source winget"],
        },
      },
      {
        id: "neovim",
        name: "Neovim",
        description: "Hyperextensible Vim-based text editor — for keyboard-driven workflows",
        tags: ["editor", "terminal", "vim"],
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
    id: "languages",
    label: "Languages & Runtimes",
    icon: "🦀",
    tools: [
      {
        id: "python",
        name: "Python 3 + pip + venv",
        description: "Latest Python with pip and virtualenv support",
        tags: ["python", "language"],
        commands: {
          ubuntu: [
            "sudo apt-get install -y python3 python3-pip python3-venv python3-dev",
          ],
          macos: ["brew install python@3.12"],
          windows: ["winget install --id Python.Python.3.12 -e --source winget"],
        },
      },
      {
        id: "rust",
        name: "Rust + Cargo",
        description: "Systems programming language — fast, safe, modern",
        tags: ["rust", "language"],
        commands: {
          ubuntu: [
            "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",
            "source $HOME/.cargo/env",
          ],
          macos: [
            "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",
            "source $HOME/.cargo/env",
          ],
          windows: [
            "winget install --id Rustlang.Rustup -e --source winget",
          ],
        },
      },
      {
        id: "go",
        name: "Go",
        description: "Fast, statically typed language from Google — great for APIs and CLIs",
        tags: ["go", "language"],
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
        id: "java",
        name: "Java (OpenJDK 21 LTS)",
        description: "OpenJDK 21 LTS — Android, Spring Boot, enterprise development",
        tags: ["java", "language"],
        commands: {
          ubuntu: ["sudo apt-get install -y openjdk-21-jdk"],
          macos: ["brew install openjdk@21"],
          windows: [
            "winget install --id EclipseAdoptium.Temurin.21.JDK -e --source winget",
          ],
        },
      },
    ],
  },
  {
    id: "devtools",
    label: "Developer Utilities",
    icon: "🛠️",
    tools: [
      {
        id: "ngrok",
        name: "ngrok",
        description: "Expose local servers to the internet for webhooks and testing",
        tags: ["tunnel", "networking"],
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
        id: "mkcert",
        name: "mkcert",
        description: "Create locally trusted HTTPS certificates with zero config",
        tags: ["ssl", "local-dev"],
        commands: {
          ubuntu: [
            "sudo apt-get install -y libnss3-tools",
            "curl -JLO https://dl.filippo.io/mkcert/latest?for=linux/amd64",
            "chmod +x mkcert-v*-linux-amd64 && sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert",
            "mkcert -install",
          ],
          macos: ["brew install mkcert && mkcert -install"],
          windows: ["winget install --id FiloSottile.mkcert -e --source winget"],
        },
      },
      {
        id: "kubectl",
        name: "kubectl",
        description: "Kubernetes command-line tool — manage clusters and deployments",
        tags: ["k8s", "devops", "cli"],
        commands: {
          ubuntu: [
            "curl -LO \"https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl\"",
            "sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl",
          ],
          macos: ["brew install kubectl"],
          windows: ["winget install --id Kubernetes.kubectl -e --source winget"],
        },
      },
      {
        id: "terraform",
        name: "Terraform",
        description: "Infrastructure as code — provision cloud resources declaratively",
        tags: ["devops", "iac", "cloud"],
        commands: {
          ubuntu: [
            "wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg",
            'echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list',
            "sudo apt update && sudo apt install terraform",
          ],
          macos: [
            "brew tap hashicorp/tap",
            "brew install hashicorp/tap/terraform",
          ],
          windows: ["winget install --id Hashicorp.Terraform -e --source winget"],
        },
      },
      {
        id: "aws-cli",
        name: "AWS CLI v2",
        description: "Manage AWS services from the terminal",
        tags: ["cloud", "aws", "cli"],
        commands: {
          ubuntu: [
            "curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o /tmp/awscliv2.zip",
            "unzip /tmp/awscliv2.zip -d /tmp/awscliv2",
            "sudo /tmp/awscliv2/aws/install",
          ],
          macos: ["brew install awscli"],
          windows: ["winget install --id Amazon.AWSCLI -e --source winget"],
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
        tags: ["vscode", "frontend", "react"],
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
        id: "ext-php",
        name: "PHP & WordPress Pack",
        description: "PHP Intelephense + WordPress Snippets & Gutenberg helpers",
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
        id: "ext-docker-git",
        name: "Docker & Git Pack",
        description: "Docker extension + GitLens for deep Git integration",
        tags: ["vscode", "docker", "git"],
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
    ],
  },
];
