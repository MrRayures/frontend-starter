---
title: Breakpoints
label: Breakpoints
---


# Utilisation 

## max-width
```scss
@include mq(max, bp(lg)) {}
```
### Résultat :
```css
@media only screen and (max-width: 1280px) {}
```

---

## min-width
```scss
@include mq(min, bp(lg)) {}
```
### Résultat :
```css
@media only screen and (min-width: 1280.2px) {}
```

---

## min-width & max-width
```scss
@include mq(minmax, bp(md), bp(lg)) {}
```
### Résultat :
```css
@media only screen and (min-width: 960.2px) and (max-width: 1280px) {}
```
