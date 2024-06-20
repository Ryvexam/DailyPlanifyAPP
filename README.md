
# 🎉 DailyPlanify Projet Symfony 7 & React Vite TypeScript 🎉

Bienvenue dans le projet Symfony 7 pour le backend et React avec Vite et TypeScript pour le frontend. Ce document vous guidera pour lancer et configurer les deux parties du projet.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **PHP 8.2+**
- **Composer**
- **Node.js 20+**
- **npm**

## 🚀 Installation et Lancement

### 🛠 Backend Symfony 7

1. **Cloner le dépôt**
   ```bash
   git clone <url_du_depot_backend>
   cd <nom_du_dossier_backend>
   ```

2. **Installer les dépendances**
   ```bash
   composer install
   ```

3. **Configurer l'environnement**
    - Copiez le fichier d'exemple des variables d'environnement :
      ```bash
      cp .env.example .env
      ```
    - Modifiez le fichier `.env` selon vos besoins (base de données, email, etc.)

4. **Lancer le serveur de développement**
   ```bash
   symfony server:start
   ```

   Vous pouvez maintenant accéder à votre application Symfony sur `http://localhost:8000`.

### ⚛️ Frontend React Vite TypeScript

1. **Cloner le dépôt**
   ```bash
   git clone <url_du_depot_frontend>
   cd <nom_du_dossier_frontend>
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurer l'environnement**
    - Copiez le fichier d'exemple des variables d'environnement :
      ```bash
      cp .env.example .env
      ```
    - Modifiez le fichier `.env` selon vos besoins (API endpoints, clés, etc.)

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   Vous pouvez maintenant accéder à votre application React sur `http://localhost:3000`.

5. **Construire pour la production**
   ```bash
   npm run build
   # ou
   yarn build
   ```

## 📂 Structure des Dossiers

### Backend Symfony 7

```
<nom_du_dossier_backend>/
├── config/
├── public/
├── src/
├── templates/
├── tests/
├── var/
├── vendor/
├── .env
└── composer.json
```

### Frontend React Vite TypeScript

```
<nom_du_dossier_frontend>/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── App.tsx
├── .env
├── index.html
├── package.json
└── vite.config.ts
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou une pull request pour discuter des modifications que vous souhaitez apporter.

## 📄 Licence

Ce projet est sous licence [Nom de la Licence]. Consultez le fichier `LICENSE` pour plus de détails.

---

Si vous avez des questions ou des problèmes, n'hésitez pas à contacter l'équipe de développement.

Merci d'avoir utilisé notre projet ! 🙏
