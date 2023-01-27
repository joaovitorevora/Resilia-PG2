// Func to Init AOS and Counters effect on page load

$(document).ready(() => {
	if ('AOS' in window) {
		AOS.init();
	}

	let numberBusiness = Number($('#numberBusiness').text());
	numberBusiness = 480;
	let numberBusinessInterval = setInterval(() => {
		numberBusiness += 1;
		$('#numberBusiness').text(`+${numberBusiness}`);
		if (numberBusiness >= 500) {
			clearInterval(numberBusinessInterval);
		}
	}, 80);

});
// Contato -----------
const card = document.querySelector('.card')
card.addEventListener("click",(e)=>{
	card.classList.toggle("flip")
})


