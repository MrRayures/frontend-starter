---
title: Exemple Nunjucks
---

#Icônes



##Sprite SVG

<svg class="c-icon">
  <use xlink:href="{{ '/icons/sprite/icons.svg#cross' | path }}" />
</svg>


```html
<svg class="c-icon">
  <use xlink:href="assets/icons/sprite/icons.svg#cross" />
</svg>
```

##Include SVG


##Nunjucks

```html


<br><br>
<h3>Sprite SVG</h3>

<svg class="c-icon">
  <use xlink:href="assets/icons/sprite/icons.svg#cross" />
</svg>
<svg role="img" class="c-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/icons/sprite/icons.svg#menu" />
</svg>


<br><br>
<h3>Include SVG</h3>
{% set svg = {class:"hello", width:"16", height:"16"} %}
{% include 'assets/icons/cross.svg' %}

<br><br><br>
<h2>Nunjucks</h2>
<p>Documentation : <a href="https://mozilla.github.io/nunjucks/fr/templating.html">https://mozilla.github.io/nunjucks/fr/templating.html</a></p>

<br><br>
<h3>Boucle for simple</h3>
<p><code>for i in range(0, 5)</code></p>
{% for i in range(0, 5) -%}
  {{ i }},
{%- endfor %}

<br><br>
<h3>Boucle for avec data</h3>
{% set items = [
  {name:"Tomate", price:"1,20€"},
  {name:"Potiron", price:"2,50€"},
  {name:"Carotte", price:"0,60€"}, 
  {name:"Pomme de terre", price:"1,80€"}
]%}
<ul>
{% for item in items  %}
  <li>{{item.name}} - {{item.price}}</li>
{% endfor %}
</ul>

<br><br>
<h3>Boucle for avec data et template include</h3>
{% set products = [
  {name:"Tomate", price:"1,20€", new:false},
  {name:"Potiron", price:"2,50€", new:false},
  {name:"Carotte", price:"0,60€", new:true}, 
  {name:"Pomme de terre", price:"1,80€", new:false}
]%}
<ul>
{% for product in products  %}
  {% include "components/_templates/components/demo-item.html" %}
{% endfor %}
</ul>

<br><br>
<h3>Data</h3>
<p>Il est possible d'utiliser des variables réutilisables dans tous les templates. <br>
Ces datas sont à renseigner dans <code>config.nunjucks.js</code></p>
<p>Exemple : <br>
<code>{% raw %}{{ project_name }}{% endraw %} = {{ project_name }}</code><br>
<code>{% raw %}{{ img_path }}{% endraw %} = {{ img_path }}</code> 
</p>

```