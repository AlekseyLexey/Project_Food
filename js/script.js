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

	const deadLine = '2021-07-26';

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
			modalExit					= modalWindow.querySelector('[data-close]'),
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

	modalExit.addEventListener('click', modalClose);

	modalWindow.addEventListener('click', (e)=> {
		if (e.target === modalWindow) {
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

	new MenuItem(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		`В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное 
		исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода 
		в ресторан!`,
		'16',
		'.menu .container').bildDivMenu();

	new MenuItem(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		`Меню "Фитнес" - это новый подход к приготовлению блюд: больше 
		свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт 
		с оптимальной ценой и высоким качеством!`,
		'6',
		'.menu .container',
		'menu__item').bildDivMenu();

	new MenuItem(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		`Меню “Постное” - это тщательный подбор ингредиентов: 
		полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, 
		правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
		'12',
		'.menu .container',
		'menu__item').bildDivMenu();

	// Forms

	const forms							= document.querySelectorAll('form'),
			message						= {
				loading: 'Загрузка...',
				success: 'Спасибо! Наша команда скоро свяжется с вами!',
				failure: 'Охх... Что-то пошло не так...'
			};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', (e)=> {
			e.preventDefault();
	
			const statusMessage			= document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent	= message.loading;
			form.append(statusMessage);

			const request					= new XMLHttpRequest();
			request.open('POST', 'server.php');

			request.setRequestHeader('Content-type', 'application/json');
			
			const formData					= new FormData(form);

			const object					= {};
			formData.forEach((value, key)=> {
				object[key] = value;
			});

			const jsonObject = JSON.stringify(object);

			request.send(formData);

			request.addEventListener('load', ()=> {
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
					form.reset();
					setTimeout(()=> {
						statusMessage.remove();
					}, 3000);
				} else {
					statusMessage.textContent = message.failure;
					setTimeout(()=> {
						statusMessage.remove();
					}, 5000);
				}
			});
		});
	}
});