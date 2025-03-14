const btn_hamburger = document.querySelector("#btn_hamburger");
const nav_menu = document.querySelector(".header__nav__menu");
const nav_menu_item = nav_menu.querySelectorAll(".header__nav__menu__item");
const overlap = document.querySelector(".overlap");
const body = document.querySelector("body");

btn_hamburger.addEventListener("click", changeHamburgerCondition);

btn_hamburger.addEventListener("keydown", (event) => {
	// console.log(event.keyCode);
	const currentKey = event.keyCode;
	const enterKey = 13;
	const spaceKey = 32;
	const escapeKey = 27;

	if(currentKey === enterKey || currentKey === spaceKey){
		changeHamburgerCondition();
	} else if(currentKey === escapeKey){
		closeMenu();
	}
})

function changeHamburgerCondition(){
	const opened = btn_hamburger.getAttribute("data-opened");

	if(opened === "false"){
		openMenu();
	} else {
		closeMenu();
	}
}

function openMenu(){
	btn_hamburger.setAttribute("data-opened", true);
	btn_hamburger.setAttribute("aria-expanded", true);
	overlap.setAttribute("data-active", true);
	body.setAttribute("data-blocked-scroll", true);	
	nav_menu.setAttribute("data-visible", true);

	nav_menu.addEventListener("keydown", (event) => {
		const currentKey = event.keyCode;
		// console.log(currentKey);
		const escapeKey = 27;
		if(currentKey === escapeKey){
			closeMenu();
		}
	})

	nav_menu_item.forEach((item) => {
		item.addEventListener("click", closeMenu);
	})

}

function closeMenu(){
	btn_hamburger.setAttribute("data-opened", false);
	btn_hamburger.setAttribute("aria-expanded", false);
	overlap.setAttribute("data-active", false);
	body.setAttribute("data-blocked-scroll", false);
	nav_menu.setAttribute("data-visible", false);
}
