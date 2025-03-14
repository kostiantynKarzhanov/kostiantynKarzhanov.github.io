const controlsForm = document.querySelector(".controls");
const inputField = controlsForm.querySelector("#new-item");
const listOfItems = document.querySelector(".list");
const allButton = document.querySelector(".all-btn");
const LOCAL_STORAGE_LIST_KEY = "list.items";
const arrayOfItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

render(arrayOfItems, listOfItems);

controlsForm.addEventListener("submit", addListItem);
listOfItems.addEventListener("click", changeItemsState);
allButton.addEventListener("click", actionWithAllItems);

function addListItem(event){
    event.preventDefault();
    if(!inputField.value) return;
    
    const content = inputField.value;
    const item = {
        content,
        checked: false,
    }

    arrayOfItems.unshift(item);
    controlsForm.reset();
    saveAndRender(arrayOfItems, listOfItems);
}

function changeItemsState(event){
    const target = event.target.closest("[type='checkbox']");
    if(!target) return;

    const targetId = target.dataset.index;

    arrayOfItems[targetId].checked = !arrayOfItems[targetId].checked;

    // if(!arrayOfItems[targetId].checked){
    //     arrayOfItems[targetId].checked = true;
    // } else {
    //     arrayOfItems[targetId].checked = false;
    // }
    
    saveAndRender(arrayOfItems, listOfItems);
}

function render(arrayWithData = [], htmlToFeed){
    htmlToFeed.innerHTML = arrayWithData.map((item, index) => {
        return `<li class="list-item"><input id="item-${index}" type="checkbox" data-index=${index} ${item.checked ? "checked" : ""}><label for="item-${index}"><span class="chckbox"></span>${item.content}</label></li>`
    }).join("");
    // console.table(arrayWithData);
}

function save(arrayWithData){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(arrayWithData));
}

function saveAndRender(arrayWithData, htmlToFeed){
    save(arrayWithData);
    render(arrayWithData, htmlToFeed);
}

function actionWithAllItems(){
    if(allButton.textContent === "check all"){
        arrayOfItems.forEach(item => {
            item.checked = true;
        })
        allButton.textContent = "uncheck all";
    } else {
        arrayOfItems.forEach(item => {
            item.checked = false;
        })
        allButton.textContent = "check all";
    }
    saveAndRender(arrayOfItems, listOfItems);
}