# Setup

## Backend

### Prerequisites

| What | Minimum | Check | Required env vars | Install if missing |
|---|---|---|---|---|
| .NET SDK | 9.0.100 | `dotnet --version` → must start with `9.` | `DOTNET_ROOT` (Windows only) | see Install steps below |
| Homebrew (macOS only) | any | `brew --version` | — | `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` |

### Install steps

**Linux (Ubuntu/Debian — apt)**
```sh
sudo apt-get update
sudo apt-get install -y dotnet-sdk-9.0
# dotnet is added to PATH automatically — no env var needed on Linux
```

**macOS (Homebrew — install Homebrew first if missing, see Prerequisites)**
```sh
brew install --cask dotnet-sdk
# dotnet is added to PATH automatically by the cask — no env var needed on macOS
```

**Windows**
```powershell
winget install Microsoft.DotNet.SDK.9
# DOTNET_ROOT must be set — required for dotnet commands in new shells
[System.Environment]::SetEnvironmentVariable("DOTNET_ROOT", "$env:ProgramFiles\dotnet", "Machine")
[System.Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:ProgramFiles\dotnet", "Machine")
# Restart terminal after setting env vars
```

### Known issues

| Exact error | Fix |
|---|---|
| `Unable to locate package dotnet-sdk-9.0` | `wget https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/packages-microsoft-prod.deb -O pkg.deb && sudo dpkg -i pkg.deb && sudo apt-get update && sudo apt-get install -y dotnet-sdk-9.0` |
| `SSL connection could not be established` | `sudo apt-get install -y ca-certificates` |
| `dotnet: command not found` after Linux install | `export PATH="$PATH:/usr/share/dotnet" && echo 'export PATH="$PATH:/usr/share/dotnet"' >> ~/.bashrc` |
| `DOTNET_ROOT not set` on Windows | `[System.Environment]::SetEnvironmentVariable("DOTNET_ROOT","$env:ProgramFiles\dotnet","Machine")` |
| `error MSB4236: SDK 'Microsoft.NET.Sdk.Web' not found` | `sudo apt-get install -y dotnet-sdk-9.0` (SDK, not runtime) |
| `brew: command not found` on macOS | Install Homebrew first — run the install command in Prerequisites table |

### Validation gate

```sh
dotnet --version    # must output 9.x.x
dotnet build src/   # must exit 0
```

## Frontend

### Prerequisites

| What | Minimum | Check | Required env vars | Install if missing |
|---|---|---|---|---|
| curl (Linux only) | any | `curl --version` | — | `sudo apt-get install -y curl` |
| nvm | any | `nvm --version` | `NVM_DIR=$HOME/.nvm` (macOS — set in shell config) | see Install steps below |
| Node.js (via nvm) | 20.19.0 or 22.12.0 | `node --version` → `^20.19` or `^22.12` | — (nvm manages PATH) | `nvm install 20.19.0 && nvm use 20.19.0` |
| npm | 10.x (bundled with Node) | `npm --version` → `10.x` | `PATH` includes `$APPDATA\npm` (Windows) | bundled with Node — reinstall Node if missing |
| Angular CLI | 20.x | `ng version` → `20.x` | — | `npm install -g @angular/cli@20` |
| Homebrew (macOS only) | any | `brew --version` | — | `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` |

> ⚠️ Angular 20 requires Node **20.19.0+** or **22.12.0+**. Node 20.18.x and 22.9.x both fail — exact patch version matters.

### Install steps

**Linux (nvm)**
```sh
sudo apt-get install -y curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
# NVM_DIR and PATH are written to ~/.bashrc by the installer — source to apply now
source ~/.bashrc
nvm install 20.19.0
nvm use 20.19.0
npm install -g @angular/cli@20
```

**macOS (Homebrew → nvm — install Homebrew first if missing, see Prerequisites)**
```sh
brew install nvm
mkdir -p ~/.nvm
# NVM_DIR must be set and nvm.sh sourced — Homebrew does not do this automatically
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$(brew --prefix nvm)/nvm.sh" ] && \. "$(brew --prefix nvm)/nvm.sh"' >> ~/.zshrc
source ~/.zshrc
nvm install 20.19.0
nvm use 20.19.0
npm install -g @angular/cli@20
```

**Windows**
```powershell
winget install CoreyButler.NVMforWindows
# Restart terminal — PATH and nvm env vars are not available until new shell
nvm install 20.19.0
nvm use 20.19.0
npm install -g @angular/cli@20
# npm global bin must be on PATH — required or ng command not found
[System.Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:APPDATA\npm", "User")
# Restart terminal after setting PATH
```

### Known issues

| Exact error | Fix |
|---|---|
| `curl: command not found` on Linux | `sudo apt-get install -y curl` |
| `nvm: command not found` after Linux install | `source ~/.bashrc` (nvm install only adds to `.bashrc`, not current shell) |
| `nvm: command not found` after macOS install | `source ~/.zshrc` (Homebrew nvm requires manual shell config — see macOS steps above) |
| `The Angular CLI requires a minimum Node.js version of v20.19 or v22.12` | `nvm install 20.19.0 && nvm use 20.19.0` |
| `npm ERR! engine unsupported` with Node 22.9.x | `nvm install 22.12.0 && nvm use 22.12.0` |
| `ng: command not found` after `npm install -g` on Linux/macOS | `export PATH="$PATH:$(npm root -g)/../.bin"` |
| `EACCES: permission denied` on global npm install | `npm install -g @angular/cli@20 --prefix ~/.npm-global && export PATH="$PATH:~/.npm-global/bin"` |
| `Cannot find module '@angular/compiler-cli'` | `cd frontend && npm install` |
| `brew: command not found` on macOS | Install Homebrew first — run the install command in Prerequisites table |

### Validation gate

```sh
node --version                           # must be ^20.19 or ^22.12
ng version                               # must show Angular CLI 20.x
cd frontend && npm install && ng build   # must exit 0
```
