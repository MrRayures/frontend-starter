# :doughnut: Frontend starter
Testé avec la version **12.18.4** de nodeJS.

## Installation et lancement

```bash
git clone https://github.com/MrRayures/frontend-starter.git mon_projet
npm install
npm run watch
```

### Liste des taches disponibles :

```bash
npm run clean # Supression de dist/
npm run copy # Copie des dossiers 'assets/fonts' &  'assets/icons' dans dist/
npm run scss # Compilation de 'assets/styles/scss/app.scss'
npm run img # Copie du dossier 'assets/img' dans dist/
npm run html # Compilation des template HTML
npm run sprite # Création du sprite svg a partir des icônes du dossier "src/assets/icons/*.svg"
npm run js # Concatene les JS 'assets/js/*js' et copie app.js dans 'dist/assets/js/'
npm run jsMin # Minifie 'dist/assets/js/app.js'
npm run vendor # Copie les vendor css 'src/assets/styles/vendor/*' & js 'src/assets/js/vendor/*' dans 'dist/assets/css|js/vendor'
npm run watch # Tache de travail
npm run build # Build du projet : clean et lance toute les taches nécessaire à l'export pour démo
```


## Installation du styleguide (*optionnel*)

Installation de [Fractal](https://fractal.build/) et de [nunjucks pour Fractal](https://github.com/frctl/fractal/tree/main/packages/nunjucks).
Les fichiers du styleguide sont dans `src/styleguide/`

### Installation des dépendances
```bash
npm install -g @frctl/fractal
npm install --save @frctl/fractal
npm install --save @frctl/nunjucks
```

### Lancement pour travail

```bash
npm run fractal
```

### Mise à jour des styles du styleguide (*preview des composants et index des templates*)
```bash
npm run fractal-style
```

### Export HTML dans le dossier dist
```bash
npm run fractal-build
```

