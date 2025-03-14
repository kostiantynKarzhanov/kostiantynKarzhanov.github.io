const controlsContainer = document.querySelector(".controls");
const controls = document.querySelectorAll(".controls input");

controlsContainer.addEventListener("mousemove", changeControlsValue);
controlsContainer.addEventListener("change", changeControlsValue);

function changeControlsValue(event){
    const targetElement = event.target.closest("input");
    if(!targetElement) return;

    const suffix = targetElement.dataset.valueSuffix || "";
    document.documentElement.style.setProperty(`--${targetElement.id}`, `${targetElement.value + suffix}`);
}
