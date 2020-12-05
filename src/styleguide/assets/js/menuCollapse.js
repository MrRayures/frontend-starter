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

