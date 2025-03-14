const tabList = document.querySelector("[role='tablist']");
const tabItems = tabList.querySelectorAll("[role='tab']");

tabList.addEventListener('keydown', changeTabFocus);
tabItems.forEach((tab) => {
    tab.addEventListener('click', changePanelFocus);
});

let focusedTab = 0;
function changeTabFocus(event){
    const currentKey = event.keyCode;
    const arrowLeft = 37;
    const arrowRight = 39;

    if(currentKey === arrowLeft || currentKey === arrowRight){        
        tabItems[focusedTab].setAttribute("tabindex", -1);

        if(currentKey == arrowLeft){
            focusedTab--;

            if(focusedTab < 0){
                focusedTab = tabItems.length - 1;
            }
        } else {
            focusedTab++;
    
            if(focusedTab >= tabItems.length){
                focusedTab = 0;
            }
        } 
    } 
    tabItems[focusedTab].setAttribute("tabindex", 0);
    tabItems[focusedTab].focus();
}

function changePanelFocus(event){
    const targetTab = event.target;
    const clickedTab = targetTab.getAttribute("aria-controls");
    const clickedTabImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);

    targetTab
    .setAttribute("aria-selected", true);

    hideContent(mainContainer, "[role='tabpanel']");
    showContent(mainContainer, `#${clickedTab}`);

    hideContent(mainContainer, "picture");
    showContent(mainContainer, `#${clickedTabImage}`);
}

function hideContent(parent, contentToHide){
    parent.querySelectorAll(contentToHide).forEach((item) => {
        item.setAttribute("data-hidden", true);
    });
}

function showContent(parent, contentToShow){
    parent.querySelector(contentToShow).removeAttribute("data-hidden");
}
