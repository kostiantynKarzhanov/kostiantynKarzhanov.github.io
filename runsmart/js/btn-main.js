const btn_main = document.querySelectorAll(".main-btn");

const modals = document.querySelector(".modals");
const callRequestForm = modals.querySelector(".modals__call-request");
const orderForm = modals.querySelector(".modals__order");

btn_main.forEach((button) => {
    button.addEventListener("click", () => {
        button.style.transform = "scale(1.03)";
        setTimeout(() => button.style.transform = null, 150);
        
        if(button.classList.contains("call-request-btn")){

            callRequestForm.showModal();

            closeModal(callRequestForm);

        } else if(button.classList.contains("buy-btn")){
            const currentButtonContainer = button.parentNode;
            const catalogItem = currentButtonContainer.parentNode;
            const chosenProductName = catalogItem.querySelector("h3").innerHTML;
            
            orderForm.showModal();
            orderForm.querySelector("span").innerHTML = chosenProductName;

            closeModal(orderForm);
        } 
    })
})

function closeModal(formName){
    const closeButton = formName.querySelector(".btn-close-modal");

    closeButton.addEventListener("click", () => {
        formName.close();
    })
}