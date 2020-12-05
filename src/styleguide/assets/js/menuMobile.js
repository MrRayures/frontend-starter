
/*
* Navigation mobile
*/
let nav = document.getElementById('nav');
let nav_open = document.getElementById('nav_open');
let nav_close = document.getElementById('nav_close');
let nav_submenu_link = document.getElementsByClassName('sg-submenu__link');

nav_open.addEventListener("click", function( event ) {
	nav.classList.add('sg-nav--open');
});

nav_close.addEventListener("click", function( event ) {
	nav.classList.remove('sg-nav--open');
});

for (var i = 0; i < nav_link.length; i++) {
	nav_link[i].addEventListener("click", function( event ) {
		nav.classList.remove('sg-nav--open');
	});
}