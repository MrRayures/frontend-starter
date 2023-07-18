---
title: Frontend Starter
---

## Node
Testé avec la version **16.13.2** de nodeJS.

## Installation et lancement

```bash
git clone https://github.com/MrRayures/frontend-starter.git mon_projet
npm install
fractal start
npm run watch
```

### Liste des taches disponibles :

```bash
fractal start # Tache de travail : lance Fractal
npm run watch # Tache de travail : watch / build & refresh scss
npm run build # Build du projet : export du projet statique
```

---

## Gestion des images
L'appel des images se fait via la variable : `{% raw %}{{ '/chemin/vers/mon/image.svg' | path }}{% endraw %}`
### Assets
Exemple :
```
<img src="{% raw %}{{ '/images/loader.svg' | path }}{% endraw %}" alt="" >
```