---
title: Gestion des assets
label: Assets
---

# Images
L'appel des images se fait via la variable : `{% raw %}{{ '/chemin/vers/mon/image.svg' | path }}{% endraw %}`
Exemple :
```
<img src="{% raw %}{{ '/images/loader.svg' | path }}{% endraw %}" alt="" >
```

# SVG
Markup conseillé
```html
{% raw %}<svg class="c-icon" aria-hidden="true" focusable="false" width="48" height="48" viewBox="0 0 48 48">
    <path d="M45 38.329L30.449 23.963 44.799 9.47 38.329 3 23.958 17.556 9.415 3.201 3 9.617l14.562 14.42L3.201 38.585 9.617 45l14.415-14.557L38.53 44.799l6.47-6.47z"/>
</svg>{% endraw %}
```

## Include
```js
{% raw %}{% include 'assets/icons/chevron-droite.svg' %}{% endraw %}
```
### Résultat :
{% set svg = {class:"hello", width:"16", height:"16"} %}
{% include 'assets/icons/chevron-droite.svg' %}


## Sprite SVG
```html
{% raw %}<svg class="c-icon" width="32" height="32">
  <use xlink:href="{{ '/icons/sprite/icons.svg#chevron-droite' | path }}" />
</svg>{% endraw %}
```
### Résultat :
<svg class="c-icon" width="32" height="32">
  <use xlink:href="{{ '/icons/sprite/icons.svg#chevron-droite' | path }}" />
</svg>



