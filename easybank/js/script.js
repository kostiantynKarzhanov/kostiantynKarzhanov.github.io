const btn_hamburger = document.querySelector('#btn_hamburger');
const faded_elements = document.querySelectorAll('.has-fade');
const menu_item = document.querySelectorAll('.header__menu__item');
const body = document.querySelector('body');

btn_hamburger.addEventListener('click', function(){
    // console.log('click checked');
    if(btn_hamburger.classList.contains('header__hamburger-active')){
        btn_hamburger.classList.remove('header__hamburger-active');
        body.classList.remove('blocked-scroll-active');
        faded_elements.forEach(function(element){
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
        });
    } else {
        btn_hamburger.classList.add('header__hamburger-active');
        body.classList.add('blocked-scroll-active');
        faded_elements.forEach(function(element){
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        });
        menu_item.forEach(function(item){
            item.addEventListener('click', function(){
                btn_hamburger.classList.remove('header__hamburger-active');
                body.classList.remove('blocked-scroll-active');
                faded_elements.forEach(function(element){
                    element.classList.remove('fade-in');
                    element.classList.add('fade-out');
                });
            });
        });
    }
});
