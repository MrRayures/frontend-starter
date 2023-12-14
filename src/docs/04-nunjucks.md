---
title: Nunjucks
label: Nunjucks
---

# Documentation
- [Documentation officielle](https://mozilla.github.io/nunjucks/fr/templating.html)
- [Nunjucks advanced loops](https://giuliachiola.dev/posts/nunjucks-advanced-loops/)

# Data
Il est possible d'utiliser des variables réutilisables dans tous les templates.
Ces datas sont à renseigner dans la configuration nunjucks dans `fractal.config.js`.
### Exemple :
```
{% raw %}{{ project_name }}{% endraw %} = {{ project_name }}
{% raw %}{{ img_path }}{% endraw %} = {{ img_path }}

```

---


# Exemple de boucle


## Simple avec i et range
```js
{% raw %}{% for i in range(0, 5) -%}
  {{ i }}{% if not loop.last%}, {% endif %}
{%- endfor %}{% endraw %}
```
### Résultat :
```html
{% for i in range(0, 5) -%}
  {{ i }}{% if not loop.last%}, {% endif %}
{%- endfor %}
```

---

## Boucle avec data
```js
{% raw %}
{% set items = [
  {name:"Tomate", price:"1,20€"},
  {name:"Potiron", price:"2,50€"},
  {name:"Carotte", price:"0,60€"}, 
  {name:"Pomme de terre", price:"1,80€"}
]%}
{% endraw %}
```
```html
{% raw %}{% for item in items  %}
    {{item.name}} - {{item.price}}
{% endfor %}{% endraw %}
```
### Résultat :
```html
{% set items = [
  {name:"Tomate", price:"1,20€"},
  {name:"Potiron", price:"2,50€"},
  {name:"Carotte", price:"0,60€"}, 
  {name:"Pomme de terre", price:"1,80€"}
]%}{% for item in items  %}{{item.name}} - {{item.price}}
{% endfor %}
```

