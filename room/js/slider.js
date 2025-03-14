const slider = document.querySelector(".hero__slider");
const slider_buttons = slider.querySelectorAll(".hero__slider__btn");
const previous_btn = document.querySelector(".previous");
const next_btn = document.querySelector(".next");

const bg_box = document.querySelector(".hero__bg-box");
const bg_pictures = bg_box.querySelectorAll(".hero__bg-box__picture");

const info_box = document.querySelector(".hero__info-box");
const info_item = info_box.querySelectorAll(".hero__info-box-item");

let current_slide = 0;

previous_btn.addEventListener("click", prevSlide);
next_btn.addEventListener("click", nextSlide);

slider_buttons.forEach((item) => {
    item.addEventListener("keydown", changeSlideUsingButton);
})

function changeSlideUsingButton(event){
    const currentKey = event.keyCode;

    const arrowLeft = 37;
    const arrowRight =39;

    if(currentKey === arrowLeft || currentKey === arrowRight){
        if(currentKey === arrowLeft){
            previous_btn.focus();
            prevSlide();
        } else {
            next_btn.focus();
            nextSlide();            
        }
    }
}

function prevSlide(){
    hideContent();

    current_slide--;

    if(current_slide < 0){
        current_slide = bg_pictures.length - 1;
    }

    previous_btn.style.outline = "2px solid black";
    setTimeout(() => previous_btn.style.outline = null, 150);

    showContent();
}

function nextSlide(){
    hideContent();  

    current_slide++;

    if(current_slide >= bg_pictures.length){
        current_slide = 0;
    }

    next_btn.style.outline = "2px solid black";
    setTimeout(() => next_btn.style.outline = null, 150);

    showContent();
}

function hideContent(){
    bg_box
    .querySelector("[aria-selected='true']")
    .setAttribute("data-hidden-bg", true);

    bg_box
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);

    info_box
    .querySelector("[aria-selected='true']")
    .setAttribute("data-hidden-info", true);

    info_box
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);
}

function showContent(){
    bg_pictures[current_slide].setAttribute("aria-selected", true);
    bg_pictures[current_slide].removeAttribute("data-hidden-bg");

    info_item[current_slide].setAttribute("aria-selected", true);
    info_item[current_slide].removeAttribute("data-hidden-info");
}