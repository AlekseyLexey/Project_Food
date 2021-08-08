document.addEventListener('DOMContentLoaded', ()=> {

	// TABS

	const tabs						= document.querySelectorAll('.tabheader__item'),
			tabsContent				= document.querySelectorAll('.tabcontent'),
			tabsParent				= document.querySelector('.tabheader__items');

	function hideTabsContents() {

		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContents(i = 0) {
		tabs[i].classList.add('tabheader__item_active');
		tabsContent[i].classList.add('show');
		tabsContent[i].classList.remove('hide');
	}

	tabsParent.addEventListener('click', (e)=> {

		const target = e.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i)=> {
				if (target == item) {
					hideTabsContents();
					showTabContents(i);
				}
			});
		}
	});
	
	hideTabsContents();
	showTabContents();

	// TIMER

	const deadLine = '2021-08-10';

	function getTimeRemaining(endtime) {
		const timeLeft				= Date.parse(endtime) - Date.parse(new Date()),
				days					= Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
				hours					= Math.floor(timeLeft / (1000 * 60 * 60) % 24),
				minuets				= Math.floor(timeLeft / (1000 * 60) % 60),
				seconds				= Math.floor(timeLeft / 1000 % 60);

		return {
			'timeLeft': timeLeft,
			'days': days,
			'hours': hours,
			'minuets': minuets,
			'seconds': seconds,
		};
	}

	function setClock(selector, endtime) {
		const timer					= document.querySelector(selector),
				days					= timer.querySelector('#days'),
				hours					= timer.querySelector('#hours'),
				minuets				= timer.querySelector('#minutes'),
				seconds				= timer.querySelector('#seconds'),
				timeInterval		= setInterval(changeClock, 1000);

		changeClock();

		function getZero(num) {
			if (num >= 0 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}

		function changeClock() {
			const times					= getTimeRemaining(endtime);
			if (times.timeLeft > 0) {
				if (times.timeLeft <= 0) {
					clearInterval(timeInterval);
				}
				days.innerHTML			= getZero(times.days);
				hours.innerHTML		= getZero(times.hours);
				minuets.innerHTM		= getZero(times.minuets);
				seconds.innerHTML		= getZero(times.seconds);
			}
		}
	}

	setClock('.timer', deadLine);

	// MODALS

	const modalTrigger				= document.querySelectorAll('[data-modal]'),
			modalWindow					= document.querySelector('.modal'),
			modalSetTime				= setTimeout(modalOpen, 5000);


	function modalOpen() {
		modalWindow.classList.add('show');
		modalWindow.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalSetTime);
	}

	function modalClose() {
		const inputWindow				= modalWindow.querySelectorAll('.modal__input');

		modalWindow.classList.add('hide');
		modalWindow.classList.remove('show');
		document.body.style.overflow = '';
		inputWindow.forEach(item => {
			item.value = '';
		});
	}

	modalTrigger.forEach(item => {
		item.addEventListener('click', modalOpen);
	});

	modalWindow.addEventListener('click', (e)=> {
		if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
			modalClose();
		}
	});

	document.addEventListener('keydown', (e)=> {
		if (modalWindow.classList.contains('show') && e.code === 'Escape') {
			modalClose();
		}
	});


	function modalOpenByScrollToBottom() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			modalOpen();
			window.removeEventListener('scroll', modalOpenByScrollToBottom);
		}
	}

	window.addEventListener('scroll', modalOpenByScrollToBottom);

	// CLASS

	class MenuItem{
		constructor(img, alt, title, descr, price, parentSelectoor, ...classes) {
			this.img						= img;
			this.alt						= alt;
			this.title					= title;
			this.descr					= descr;
			this.price					= price;
			this.classes				= classes;
			this.parent					= document.querySelector(parentSelectoor);
			this.transfer				= 27;
			this.changeTooUAH();
		}

		changeTooUAH() {
			this.price					= this.price * this.transfer;
		}

		bildDivMenu() {
			const divMenuItem			= document.createElement('div');
			if (this.classes.length === 0) {
				this.classes = ['menu__item'];
				divMenuItem.classList.add(this.classes);
			} else {
				this.classes.forEach(className => divMenuItem.classList.add(className));
			}
			divMenuItem.innerHTML	= `<img src=${this.img} alt=${this.alt}>
												<h3 class="menu__item-subtitle">${this.title}</h3>
												<div class="menu__item-descr">${this.descr}</div>
												<div class="menu__item-divider"></div>
												<div class="menu__item-price">
													<div class="menu__item-cost">Цена:</div>
													<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
												</div>`;
			this.parent.append(divMenuItem);
		}
	}

	const getResurses = async (url)=> {

		const result					= await fetch(url);

		if (!result.ok) {
			throw new Error(`Could not fetch ${url}, status: ${result.status}`);
		}

		return await result.json();
	};

	getResurses('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuItem(img, altimg, title, descr, price, '.menu .container').bildDivMenu();
			});
		});

	// Forms

	const forms								= document.querySelectorAll('form'),
			message							= {
				loading: 'img/form/spinner.svg',
				success: 'Спасибо! Наша команда скоро свяжется с вами!',
				failure: 'Охх... Что-то пошло не так...'
			};

	forms.forEach(item => {
		postData(item);
	});

	const processingPostData = async (url, data)=> {

		const result						= await fetch(url, {
			method: "POST",
			headers: {
				 'Content-Type': 'application/json'
			},
			body: data
		});

		return await result.json();
	};

	function postData(form) {
		form.addEventListener('submit', (e)=> {
			e.preventDefault();
	
			const statusMessage			= document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData					= new FormData(form),
					json						= JSON.stringify(Object.fromEntries(formData));

			processingPostData('http://localhost:3000/requests', json)
			.then(data=> {
				console.log(data);
				showModalMessage(message.success);
				statusMessage.remove();
			})
			.catch(()=> {
				showModalMessage(message.failure);
				statusMessage.remove();
			})
			.finally(()=> {
				form.reset();
			});
		});
	}
	function showModalMessage(message) {
		const prevModalDiallog		= document.querySelector('.modal__dialog');

		prevModalDiallog.classList.add('hide');
		prevModalDiallog.classList.remove('show');
		modalOpen();

		const resultMessage			= document.createElement('div');
		resultMessage.classList.add('modal__dialog');
		resultMessage.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
		modalWindow.append(resultMessage);
		setTimeout(()=> {
			resultMessage.remove();
			prevModalDiallog.classList.add('show');
			prevModalDiallog.classList.remove('hide');
			modalClose();
		}, 4000);
	}

	// Old Slider
	
	// if (slides.length < 10) {
	// 	totalSlides.textContent = `0${slides.length}`;
	// } else {
	// 	totalSlides.textContent = slides.length;
	// }

	// showSlide();

	// function showSlide() {

	// 	if (slideIndex > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (slideIndex < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	if (slideIndex < 10) {
	// 		currentSlide.textContent = `0${slideIndex}`;
	// 	} else {
	// 		currentSlide.textContent = slideIndex;
	// 	}

	// 	slides.forEach(item => item.style.display = 'none');

	// 	slides[slideIndex - 1].style.display = 'block';
	// }

	// function plusSlider(n) {
	// 	showSlide(slideIndex += n);
	// }

	// prevButton.addEventListener('click', ()=> {
	// 	plusSlider(-1);
	// });

	// nextButton.addEventListener('click', ()=> {
	// 	plusSlider(1);
	// });

	// Slider

	const prevButton					= document.querySelector('.offer__slider-prev'),
			nextButton					= document.querySelector('.offer__slider-next'),
			slides						= document.querySelectorAll('.offer__slide'),
			currentSlide				= document.querySelector('#current'),
			totalSlides					= document.querySelector('#total'),
			sliderInner					= document.querySelector('.offer__slider-inner'),
			sliderWrapper				= document.querySelector('.offer__slider-wrapper'),
			width							= window.getComputedStyle(sliderWrapper).width;

	let slideIndex						= 1,
		 ofsset							= 0;

		 console.log(ofsset);

	if (slides.length < 10) {
		totalSlides.textContent = `0${slides.length}`;
		currentSlide.textContent = `0${slideIndex}`;
	} else {
		totalSlides.textContent = slides.length;
		currentSlide.textContent = slideIndex;
	}

	sliderWrapper.style.overflow = 'hidden';
	sliderInner.style.width = 100 * slides.length + '%';
	sliderInner.style.display = 'flex';
	sliderInner.style.transition = '0.5s all';

	nextButton.addEventListener('click', ()=> {
		
		if (ofsset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			ofsset = 0;
			slideIndex = 1;
		} else {
			ofsset += +width.slice(0, width.length - 2);
			slideIndex++;
		}

		if (slideIndex < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;
		}
		
		sliderInner.style.transform = `translateX(-${ofsset}px)`;
	});

	prevButton.addEventListener('click', ()=> {

		if (ofsset == 0) {
			ofsset = +width.slice(0, width.length - 2) * (slides.length - 1);
			slideIndex = slides.length;
		} else {
			ofsset -= +width.slice(0, width.length - 2);
			slideIndex--;
		}

		if (slideIndex < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;
		}
		
		sliderInner.style.transform = `translateX(-${ofsset}px)`;
	});


});