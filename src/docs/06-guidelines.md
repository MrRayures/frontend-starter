---
title: Les principes à respecter
label: Guidelines
---


## Convention HTML/CSS

Rendez votre html/css lisible et maintenable pour votre vous du future !

De la lecture :

- [Google html/css guide (anglais)](https://google.github.io/styleguide/htmlcssguide.html)
- [Alsacreations html/css guide](https://google.github.io/styleguide/htmlcssguide.html)



### HTML
Votre HTML doit être semantique & accessible.
- [Mozzilla HTML guidelines (anglais)](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/HTML)

### CSS
Votre CSS doit être architecturé pour être facilement maintenable et compréhensible.

- [Mozzilla CSS guidelines (anglais)](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/CSS)
- [Create a maintainable CSS architecture ITCSS (anglais)](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture)

### Convention BEMIT
Vous devez utiliser la convention de nommage BEMIT.

- [BEMIT: Taking the BEM Naming Convention a Step Further (anglais)](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)


```scss
.person /* Un block lambda */
.person__hand /* Une partie de ce block */
.person--female /* Une variante de ce block */
.person--female__hand /* Une partie de la variante */
.person__hand--left /* Une variante de la partie */
```

** Exemple **
```html
<div class="card article sponsorised">
    <img class="img photo"/>
    <p class="text presentation">
        ...
    </p>
</div>
```
Deviendra
```html
<div class="card article article--sponsorised">
    <img class="card__img article__photo logo"/>
    <p class="card__text article__presentation">
        ...
    </p>
</div>
```
[Source des exemples](https://www.bearstudio.fr/blog/design-css/bemit)

### Nesting
3 levels maximums et ne pas abuser du `@extend`.


### Les outils

Editeur de code : [Visual studio](https://code.visualstudio.com/) 
Node.js manager : [Volta](https://volta.sh/) 

Configuration
```css
indent_style = space
indent_size = 4
```




### A11y
L'accessibilité est un vaste sujet mais gardez à l'esprit que mettre en place certains principes est assez facile.

[Introduction to Web Accessibility  (anglais)](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
[Patterns  (anglais)](https://www.w3.org/WAI/ARIA/apg/patterns/)
[Notices AcceDe Web](https://www.accede-web.com/)

### Ne faite surtout pas cela !

```scss
*:focus {
    outline: 0;
}
```
Personnalisez le pluôt :
```scss
*:focus {
    outline: 0;
}
*:focus-visible {
    outline: 2px dotted red;
}
```



## Convention Git 
Un projet ou un ticket = une branche de travail


Donc nous avons 2 cas de figures : 

### La branche de travail est lié à un ticket jira

Modèle :`[numero de ticket] Description du commit`

Exemple : `[BVA-5987] Stylisation parcours de connexion`

### La branche est lié à un projet sans ticket Jira

Modèle :`[projet] Description du commit`

Exemple : `[refonte DP] Correctifs / retours ui/ux`