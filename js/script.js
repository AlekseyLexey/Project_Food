import tabs from './modules/tabs';
import timer from './modules/timer';
import modals from './modules/modals';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {modalOpen} from './modules/modals';

document.addEventListener('DOMContentLoaded', ()=> {

	const modalSetTime				= setTimeout(()=> modalOpen('.modal', modalSetTime), 5000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	timer('.timer', '2021-09-01');
	modals('[data-modal]', '.modal', modalSetTime);
	cards();
	forms(modalSetTime, 'form');
	slider({
		slider: '.offer__slider',
		nextBtn: '.offer__slider-next',
		prevBtn: '.offer__slider-prev',
		allSlide: '.offer__slide',
		currentCounter: '#current',
		totalCounter: '#total',
		inner: '.offer__slider-inner',
		wrapper: '.offer__slider-wrapper'
	});
	calc();
});