const checkboxForm = document.querySelector(".chkbx-form");
const checkboxes = checkboxForm.querySelectorAll("[type='checkbox']");
let lastChecked;

checkboxForm.addEventListener("click", checkboxHandler);

function checkboxHandler(event){
	const targetChkbox = event.target.closest("[type='checkbox']");
	if(!targetChkbox) return;

	let inBetweenFlag = false;
	if(event.shiftKey && targetChkbox.checked){
		checkboxes.forEach(checkbox => {
			if(checkbox === targetChkbox || checkbox === lastChecked){
				inBetweenFlag = !inBetweenFlag;
			}
			if(inBetweenFlag){
				checkbox.checked = true;
			}
		});
	}
	lastChecked = targetChkbox;
}