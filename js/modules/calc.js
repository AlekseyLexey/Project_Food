function calc() {
	// Clacl

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = localStorage.setItem('sex', 'female');
		sex = localStorage.getItem('sex');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = localStorage.setItem('ratio', 1.375);
		ratio = localStorage.getItem('ratio');
	}

	const calcResult					= document.querySelector('.calculating__result span');

	function initLocalStorage(selector, specialclass) {
		const elements 					= document.querySelectorAll(`${selector} div`);

		elements.forEach(item => {
			item.classList.remove(specialclass);
			if (item.getAttribute('id') === localStorage.getItem('sex')) {
				item.classList.add(specialclass);
			}
			if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				item.classList.add(specialclass);
			}
		});

	}

	initLocalStorage('#gender', 'calculating__choose-item_active');
	initLocalStorage('.calculating__choose_big', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			calcResult.textContent = '____';
			return;
		}

		if (sex === 'male') {
			calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		} else {
			calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		}
		console.log(sex);
	}

	calcTotal();

	function getStaticValue(selector, specialclass) {

		const elements 					= document.querySelectorAll(`${selector} div`);

		document.querySelector(selector).addEventListener('click', (e)=> {
			if (e.target.classList.contains('calculating__choose-item')) {
				elements.forEach(item => item.classList.remove(specialclass));
				e.target.classList.add(specialclass);
	
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}
			}

			calcTotal();
		});
	}

	getStaticValue('.calculating__choose_big', 'calculating__choose-item_active');
	getStaticValue('#gender', 'calculating__choose-item_active');
	getDynamicValue('#height');
	getDynamicValue('#weight');
	getDynamicValue('#age');

	function getDynamicValue(selector) {

		const input							= document.querySelector(selector);

		input.addEventListener('input', ()=> {
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
				switch (input.getAttribute('id')) {
					case 'height':
						height = +input.value;
						break;
					case 'weight':
						weight = +input.value;
						break;
					case 'age':
						age = +input.value;
						break;
				}
			}

			calcTotal();
		});
	}
}

module.exports = calc;