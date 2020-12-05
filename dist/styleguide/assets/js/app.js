/*
* Menu collapse
*/
let nav_menu_button = document.getElementsByClassName('sg-menu__button');

for (var i = 0; i < nav_menu_button.length; i++) {
	nav_menu_button[i].addEventListener("click", function( event ) {
		if(this.classList.contains('sg-menu__button--active')) {
			this.classList.remove('sg-menu__button--active');
			this.setAttribute('aria-expanded', false);
			this.lastChild.innerHTML =" + ";
		} else {
			this.classList.add('sg-menu__button--active');
			this.setAttribute('aria-expanded', true);
			this.lastChild.innerHTML =" - ";
		}
	});
}



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