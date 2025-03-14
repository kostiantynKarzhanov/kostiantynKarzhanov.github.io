const images = document.querySelectorAll(".slide-in");

window.addEventListener("scroll", debounce(slideImage));

function slideImage(){
	images.forEach((image) => {
		const slideInAt = (window.pageYOffset + document.documentElement.clientHeight) - image.height / 2;
		const imageFromTopToBottom = image.offsetTop + image.height;
		const isHalfPassed = slideInAt > image.offsetTop;
		const isBottomNotPassed = window.pageYOffset < imageFromTopToBottom;
		 
		if(isHalfPassed && isBottomNotPassed){
			image.classList.add("active");
		} else if(image.classList.contains("active")){
			image.classList.remove("active");
		}
	})
}

function debounce(func, wait = 20, immediate = true) {
	let timeout;
	return function() {
	  let context = this;
	  let args = arguments;
	  let later = function() {
		timeout = null;
		if (!immediate) func.apply(context, args);
	  };
	  let callNow = immediate && !timeout;
	  clearTimeout(timeout);
	  timeout = setTimeout(later, wait);
	  if (callNow) func.apply(context, args);
	};
}