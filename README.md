# La Nuit des Voleurs

Cette application web progressive permet de participer au jeu d'évasion développé par l'équipe Pièce Maîtresse en tant que projet de fin d'études à l'Université du Québec en Abitibi-Témiscamingue.

L'application est séparée en 2 sections distinctes, **Mobile** et **Desktop**, qui sont utilisées conjointement par les joueurs pendant l'expérience.

La section **Mobile** simule un logiciel de piratage utilisé par les participants. Elle sert à accéder aux _comptes bancaires_ d'une compagnie (objectif du jeu d'évasion), à les pirater, puis à les envoyer à la partie **Desktop**.

La section **Desktop** simule un logiciel de comptabilité installé sur des ordinateurs disponibles dans l'aire de jeu. Elle est utilisée par les participants pour faire des virements à partir des **comptes bancaires** piratés via la section **Mobile**.

## Installation

Ces instructions permettent d'installer une copie de l'application de façon locale à des fins de développement.

### NPM

```
npm install
```

### Vue CLI

```
npm install -g @vue/cli-service-global
```

### Firebase

```
npm i firebase
```

Dans **src**, créer le fichier **firebase.js** et y inclure les lignes suivantes :

```
import firebase from "firebase";
require("firebase/firestore");

var config = {
  apiKey: "REMPLIR AVEC LES INFORMATIONS DE VOTRE PROJET",
  authDomain: "REMPLIR AVEC LES INFORMATIONS DE VOTRE PROJET",
  databaseURL: "REMPLIR AVEC LES INFORMATIONS DE VOTRE PROJET",
  projectId: "REMPLIR AVEC LES INFORMATIONS DE VOTRE PROJET",
  storageBucket: "REMPLIR AVEC LES INFORMATIONS DE VOTRE PROJET",
  messagingSenderId: "REMPLIR AVEC LES INFORMATIONS DE VOTRE PROJET"
};

const fb = firebase.initializeApp(config);
const db = firebase.firestore();

export { fb, db };
```

Par la suite, dans le fichier où firebase doit être utilisé, l'importer avec :

```
import { fb, db } from "../firebase";
```

### Element UI

```
npm i element-ui
```

Dans **main.js**, inclure les lignes suivantes :

```
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./registerServiceWorker";

Vue.use(ElementUI);
```

## Développement

### Aperçu en direct dans le navigateur

```
npm run serve
```

### Compiler et minifier pour la production

```
npm run build
```

### Linter et fixer

```
npm run lint
```
