
# 🌟 DailyPlanify

## 📝 Description

DailyPlanify est un projet réalisé durant mon année de Bachelor 3eme année au sein de l'école Hesias.
C'est une application de gestion du quotidien avec un calendrier, des évenements, une liste de tâches et une section de notes.

## 🚀 Prérequis

Assurez-vous d'avoir les éléments suivants installés :
- 🐳 Docker
- 🧰 Composer
- 🐘 PHP
- 📦 Node.js et npm
- 🌐 Symfony CLI
- 🦀 Rust (nécessaire pour Tauri)
- 🚀 Tauri CLI

## ⚙️ Instructions de configuration

Suivez ces étapes pour configurer et exécuter le projet.

### 🖥️ Installation des dépendances

#### Pour Linux

1. **Installer Symfony CLI :**
   ```bash
   curl -sS https://get.symfony.com/cli/installer | bash
   export PATH="$HOME/.symfony/bin:$PATH"
   ```

2. **Installer Node.js et npm :**
   Suivez les instructions sur le [site officiel de Node.js](https://nodejs.org/) pour installer la version appropriée pour votre système.

3. **Installer Rust :**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source $HOME/.cargo/env
   ```

4. **Installer Tauri CLI :**
   ```bash
   npm install -g @tauri-apps/cli
   ```

#### Pour Windows

1. **Installer Symfony CLI :**
   Téléchargez et exécutez l'installateur depuis [Symfony CLI](https://get.symfony.com/cli/setup.exe).

2. **Installer Node.js et npm :**
   Téléchargez et installez depuis le [site officiel de Node.js](https://nodejs.org/).

3. **Installer Rust :**
   Téléchargez et exécutez l'installateur depuis [Rust](https://www.rust-lang.org/tools/install).

4. **Installer Tauri CLI :**
   ```bash
   npm install -g @tauri-apps/cli
   ```

### 🖥️ Backend (Symfony)

1. **Démarrer les conteneurs Docker :**
   ```bash
   docker-compose up -d
   ```

2. **Installer les dépendances Composer :**
   ```bash
   cd Backend/
   composer install
   ```

3. **Mettre à jour le schéma de la base de données :**
   ```bash
   php bin/console doctrine:schema:update --force
   ```

4. **Démarrer le serveur Symfony :**
   Ouvrez une nouvelle fenêtre/onglet de terminal et exécutez :
   ```bash
   symfony serve
   ```

### 🌐 Frontend (React Vite TypeScript)

1. **Naviguer vers le répertoire Frontend :**
   ```bash
   cd Frontend/
   ```

2. **Installer les packages npm :**
   ```bash
   npm install
   ```

3. **Exécuter le serveur de développement :**
   ```bash
   npm run dev -- --host
   ```

### 🖥️ Session Desktop Tauri

1. **Pour démarrer une session Tauri Desktop :**
   - Pour créer un fichier exécutable (.exe) :
     ```bash
     npx tauri build
     ```
   - Pour démarrer en mode développement :
     ```bash
     npx tauri dev
     ```

### 📱 Android

1. **Pour démarrer une session Android :**
   - Pour créer un fichier APK :
     ```bash
     npx tauri android build
     ```
   - Pour démarrer en mode développement (recommandé pour les tests car la signature n'est pas nécessaire) :
     ```bash
     npx tauri android dev
     ```

## 💡 Notes supplémentaires

- Remplacez `/Backend/` et `/Frontend/` par les chemins réels de vos répertoires backend et frontend.
- Assurez-vous que Docker est en cours d'exécution et accessible avant de commencer la configuration du backend.
- Symfony CLI (`symfony serve`) est supposé être disponible globalement.

## 🛠️ Dépannage

- Assurez-vous que les ports utilisés par Docker et le serveur Symfony ne sont pas bloqués par des pare-feux ou d'autres services.

## 📜 Licence

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
