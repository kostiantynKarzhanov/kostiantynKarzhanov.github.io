const btn_hamburger = document.querySelector("#btn_hamburger");
const nav_menu = document.querySelector(".header__nav__menu");
const nav_menu_item = document.querySelectorAll(".header__nav__menu__item");
const overlap = document.querySelector(".overlap");
const body = document.querySelector("body");

btn_hamburger.addEventListener("click", hamburgerActivity);

btn_hamburger.addEventListener("keydown", (event) => {
    const currentKey = event.keyCode;
    const enterKey = 13;
    const spaceKey = 32;
    if(currentKey === enterKey || currentKey === spaceKey){
        hamburgerActivity();
    }
});

function hamburgerActivity(){
    const opened = btn_hamburger.getAttribute("data-opened");

    if(opened === "false"){
        btn_hamburger.setAttribute("data-opened", true);
        nav_menu.setAttribute("data-visible", true);
        overlap.setAttribute("data-active", true);
        body.setAttribute("data-blocked-scroll", true);
        btn_hamburger.setAttribute("aria-expanded", true);

        nav_menu_item.forEach((item) => {
            item.addEventListener("click", () => {
                btn_hamburger.setAttribute("data-opened", false);
                nav_menu.setAttribute("data-visible", false);
                overlap.setAttribute("data-active", false);
                body.setAttribute("data-blocked-scroll", false);
                btn_hamburger.setAttribute("aria-expanded", false);
            });
        });
    } else {
        btn_hamburger.setAttribute("data-opened", false);
        nav_menu.setAttribute("data-visible", false);
        overlap.setAttribute("data-active", false);
        body.setAttribute("data-blocked-scroll", false);
        btn_hamburger.setAttribute("aria-expanded", false);
    }
}