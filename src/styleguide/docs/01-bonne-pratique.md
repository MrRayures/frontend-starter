---
title: Bonnes pratiques
---
*A traduire*

Make it human readable, maintainable

Be curious, if you have doubt seek the answer, someone has probably asked the question! And there is no secret you have to read ^^).
Google have some good starting HTML/CSS guidelines : https://google.github.io/styleguide/htmlcssguide.html.
Alsacreations have also some good guidelines in french : https://github.com/alsacreations/guidelines.
Html

Mozzilla HTML guidelines https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/HTML.
Create semantic and accessible HTML, exemple :



<span style="color:green">Conseillé</span>
```
<button type="button">My button</button>
```

<span style="color:red">A éviter</span>
```
<div onclick="myfunction();" class="button">My button</div>
```

## CSS

Create a maintainable CSS architecture with ITCSS and BEMIT naming convention.
Mozzilla CSS guidelines https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/CSS.

CSS indent :
```
indent_style = space
indent_size = 2
```

Nesting 3 level MAX and don't abuse of sass @extend

<span style="color:green">Conseillé</span>
```
.c-media {}
.c-media__title {}
.c-media--primary {}
```

<span style="color:red">A éviter</span>
```
.c-media {
 &__title {}
 &--primary {}
}
```
## Accessibility

Check some good practice & tips on https://a11yproject.com/ & https://www.accede-web.com/notices/.
Never remove :focus on focusable elements, redesgn it :

<span style="color:green">Conseillé</span>
```
*:focus {
 outline: 2px dotted red;
 outline-offset: 2px;
}
```

<span style="color:red">A éviter</span>
```
*:focus {
 outline: 0;
}
```
