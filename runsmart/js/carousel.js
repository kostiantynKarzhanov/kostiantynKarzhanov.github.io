const carousel = document.querySelector(".carousel");

const carousel_list = carousel.querySelector(".carousel__list");
const carousel_items = carousel_list.querySelectorAll(".carousel__list__item");

const previous_btn = carousel.querySelector(".carousel__btn-previous");
const next_btn = carousel.querySelector(".carousel__btn-next");

const carousel_nav = carousel.querySelector(".carousel__nav");

// const carousel_indicators = Array.from(carousel_nav.children);
const carousel_indicators = carousel_nav.querySelectorAll(".carousel__nav__indicator");

// const current_item_width = carousel_items[0].clientWidth;
// const current_item_width = carousel_items[0].getBoundingClientRect().width; 
let current_item_width = carousel_list.querySelector(".current-slide").offsetWidth


carousel_items.forEach(setItemPosition);

window.addEventListener("resize", () => {
    current_item_width = carousel_list.querySelector(".current-slide").offsetWidth
    carousel_items.forEach(setItemPosition);
})

previous_btn.addEventListener("click", () => {
    previous_btn.style.left = "-5px";
    setTimeout(() => {previous_btn.style.left = null}, 150);
    
    showPrevSlide();
});

next_btn.addEventListener("click", () => {
    next_btn.style.right = "-5px";
    setTimeout(() => {next_btn.style.right = null}, 150);

    showNextSlide();
});

carousel.addEventListener("keydown", changeSlideWithButton);

carousel_nav.addEventListener("click", changeSlideWithIndicator);

function changeSlideWithIndicator(event){
    const target_indicator = event.target.closest("button");
    if(!target_indicator) return;

    const current_slide = carousel_list.querySelector(".current-slide");

    const current_indicator = carousel_nav.querySelector(".current-slide");

    let target_indicatorIndex;

    // if "carousel_indicators" was an Array
    // const target_indicatorIndex = carousel_indicators.findIndex(indicator => indicator === target_indicator)

    carousel_indicators.forEach((indicator, index) => {
        if(indicator === target_indicator){
            target_indicatorIndex = index;
        }
    })

    targetSlide = carousel_items[target_indicatorIndex];

    moveToSlide(current_slide, targetSlide, current_indicator, target_indicator);
} 

function setItemPosition(item, index){
    item.style.left = `${current_item_width * index}px`;
}

function showPrevSlide(){
    const current_slide = carousel_list.querySelector(".current-slide");

    const current_indicator = carousel_nav.querySelector(".current-slide");

    let prevSlide = current_slide.previousElementSibling;

    let prevIndicator = current_indicator.previousElementSibling;

    if(prevSlide === null){
        prevSlide = carousel_items[carousel_items.length - 1];

        prevIndicator = carousel_indicators[carousel_indicators.length - 1];

        turnOffTransition();
    }

    moveToSlide(current_slide, prevSlide, current_indicator, prevIndicator);
}

function showNextSlide(){
    const current_slide = carousel_list.querySelector(".current-slide");

    const current_indicator = carousel_nav.querySelector(".current-slide");

    let nextSlide = current_slide.nextElementSibling;

    let nextIndicator = current_indicator.nextElementSibling;

    if(nextSlide === null){
        nextSlide = carousel_items[0];

        nextIndicator = carousel_indicators[0];
        
        turnOffTransition();
    }

    moveToSlide(current_slide, nextSlide, current_indicator, nextIndicator);
}


function changeSlideWithButton(event){
    // console.log(event.keyCode);
    const currentKey = event.keyCode;

    const arrowLeft = 37;
    const arrowRight = 39;

    if(currentKey === arrowLeft || currentKey === arrowRight){
        
        if(currentKey == arrowLeft){
            previous_btn.focus();
            showPrevSlide();
        } else if(currentKey == arrowRight) {
            next_btn.focus();
            showNextSlide();
        }
    }
}

function turnOffTransition(){
    carousel_list.style.transition = "none"
    setTimeout(() => { carousel_list.style.transition = null }, 1);
}

function moveToSlide(current_slide, targetSlide, current_indicator, target_indicator){

    carousel_list.style.transform = `translate(-${targetSlide.style.left})`;

    current_slide.classList.remove("current-slide");
    // current_slide.setAttribute("data-faded", true);

    targetSlide.classList.add("current-slide");
    // targetSlide.removeAttribute("data-faded");

    current_indicator.classList.remove("current-slide");

    target_indicator.classList.add("current-slide");

}