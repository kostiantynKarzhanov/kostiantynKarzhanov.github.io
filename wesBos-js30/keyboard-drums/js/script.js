const buttons = document.querySelectorAll(".key");
const buttonsContainer = document.querySelector("#main");

buttonsContainer.addEventListener("click", clickPlay);
window.addEventListener("keydown", keyPlay);

function clickPlay(event){
    const targetButton = event.target.closest("[data-key]");
    if(!targetButton) return;

    styleAndPlay(targetButton);
}

function keyPlay(event){
    const targetKey = event.key;
    const targetKeyFormatted = targetKey.toLowerCase();

    const pressedKey = document.querySelector(`[data-key="${targetKeyFormatted}"]`);

    if(!pressedKey) return;

    styleAndPlay(pressedKey);
}

function styleAndPlay(target){
    styleButton(target);
    playSound(target);
}

function styleButton(parent){
    for(child of parent.children){
        if(child.tagName.toLowerCase() === "button"){
            child.dataset.playing = "true";
            child.focus()
        }
    }
}

function playSound(parent){
    for(child of parent.children){
        if(child.tagName.toLowerCase() === "audio"){
            child.currentTime = 0;
            child.play();
        }
    }
}

buttons.forEach((button) => {
    button.addEventListener("transitionend", removeAddedStyling);
})

function removeAddedStyling(e){
    if(e.propertyName !== "transform") return;
    delete this.dataset.playing;
}