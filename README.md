# Invoice API

Une API REST pour gérer les factures clients avec **Express.js** et **MongoDB**.

---

## Prérequis
- Node.js >= 18
- MongoDB (local ou cloud)
- npm

---

## Installation

1. Cloner le dépôt :  
- git clone <URL_DU_REPO>
- cd <NOM_DU_REPO>

Installer les dépendances :
- npm install

Configuration
- Créer un fichier .env à la racine du projet avec les variables suivantes :

env
- PORT : le port sur lequel l’API va tourner (ex: 3000)
- MONGO_URI : URI de connexion à MongoDB (ex: mongodb+srv://user:password@cluster.mongodb.net/dbname)

Démarrage : Lancer l’API en mode développement :
- npm run start

L’API sera disponible à : http://localhost:PORT
