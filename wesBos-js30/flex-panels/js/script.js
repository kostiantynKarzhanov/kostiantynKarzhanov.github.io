const panelContainer = document.querySelector(".panel-container");

panelContainer.addEventListener("click", showMore);

function showMore(event){
	const targetPanel = event.target.closest(".panel-container__item");
	if(!targetPanel) return;

	if(!targetPanel.hasAttribute("data-show-closer")){
		targetPanel.dataset.showCloser = "";
		targetPanel.addEventListener("transitionend", showCaption);
	} else {
		targetPanel.removeEventListener("transitionend", showCaption);
		delete targetPanel.dataset.showCaption;
		delete targetPanel.dataset.showCloser;
	}
}

function showCaption(event){
	if(event.propertyName.includes("flex")){
		this.dataset.showCaption = "";
	}
}
