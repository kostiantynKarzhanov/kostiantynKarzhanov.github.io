const catalog = document.querySelector(".catalog");
const catalog_list = catalog.querySelectorAll(".catalog__list");

catalog_list.forEach((list) => {
    let catalog_items = Array.from(list.children);

    catalog_items.forEach((catalog_item) => {
        let item_content = catalog_item.querySelector(".catalog__list__item__content");
        let btn_details = catalog_item.querySelector(".catalog__list__item__btn-details");

        btn_details.addEventListener("click", () => {
            if(!item_content.hasAttribute("data-more")){
                item_content.setAttribute("data-more", true);
                btn_details.innerHTML = "go back";
            } else {
                item_content.removeAttribute("data-more");
                btn_details.innerHTML = "learn more";
            }
        })
    })
})