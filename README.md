# :doughnut: Frontend starter
Testé avec la version **12.18.4** de nodeJS.

## Installation et lancement

```bash
git clone https://github.com/MrRayures/frontend-starter.git mon_projet
npm install
npm run watch
```

### Liste des taches disponible :

```bash
npm run clean # Supression de dist/
npm run copy # Copie des dossier assets/fonts &  assets/icons dans dist/
npm run scss # Compilation de assets/styles/scss/app.scss
npm run img # Copie du dossier assets/img dans dist/
npm run html # Compilation des template HTML
npm run sprite # Création du sprite svg a partir des icônes du dossier "src/assets/icons/*.svg"
npm run sassInlineSvg
npm run js # Concatene les JS(assets/js/*js) et copie app.js dans dist/assets/js/
npm run jsMin # Minifie dist/assets/js/app.js
npm run vendor # Copie les vendor css(src/assets/styles/vendor/*) & js (src/assets/js/vendor/*) dans dist/assets/css|js/vendor
npm run watch # Tache de travail
npm run build # Build du projet : clean et lance toute les taches nécessaire à l'export pour démo
```



## Installation du styleguide (*optionnel*)

Installation de [Fractal](https://fractal.build/) et de [nunjucks pour Fractal](https://github.com/frctl/fractal/tree/main/packages/nunjucks).

### Récupération du projet
Télécharger l'archive du projet à ladresse suivante : https://github.com/MrRayures/frontend-starter-styleguide et copier/coller  les fichiers suivants à la racine du projet :
- src/*
- fractal.config.js

### Installation des dépendances
```bash
npm install -g @frctl/fractal
npm install --save @frctl/fractal
npm install --save @frctl/nunjucks
```
### installation et mise à jour des styles pour le styleguide
```bash
npm run styleguide # src/assets/styles/scss/styleguide.scss
```

### Lancement pour travail

```bash
fractal start --sync
```

### Export HTML dans le dossier dist
```bash
fractal build
```

