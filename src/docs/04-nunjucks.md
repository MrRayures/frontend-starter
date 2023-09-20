---
title: Nunjucks
label: Nunjucks
---

# Documentation
[https://mozilla.github.io/nunjucks/fr/templating.html](https://mozilla.github.io/nunjucks/fr/templating.html)

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

---

## Boucle avec data et include
demo-item.html
```html
{% raw %}<li class="{{product.class}}">
  {% if product.new %}[NEW] {% endif %}{{product.name}} - {{product.price}}
</li>{% endraw %}
```
Data
```js
{% raw %}{% set products = [
  {name:"Tomate", price:"1,20€", new:false},
  {name:"Potiron", price:"2,50€", new:false},
  {name:"Carotte", price:"0,60€", new:true, class:"product--new"}, 
  {name:"Pomme de terre", price:"1,80€", new:false}
]%}{% endraw %}
```
```js
{% raw %}<ul>
{% for product in products  %}
  {% include "components/_templates/components/demo-item.html" %}
{% endfor %}
</ul>{% endraw %}
```

### Résultat :
{% set products = [
  {name:"Tomate", price:"1,20€", new:false},
  {name:"Potiron", price:"2,50€", new:false},
  {name:"Carotte", price:"0,60€", new:true, class:"product--new"}, 
  {name:"Pomme de terre", price:"1,80€", new:false}
]%}
```html
<ul>
{% for product in products  %}{% include "components/_templates/components/demo-item.html" %}
{% endfor %}</ul>

```

