
function modalOpen(modalSelector, modalSetTime) {

	const modalWindow					= document.querySelector(modalSelector);

	modalWindow.classList.add('show');
	modalWindow.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	if (modalSetTime) {
		clearInterval(modalSetTime);
	}
}

function modalClose(modalSelector) {

	const modalWindow					= document.querySelector(modalSelector),
			inputWindow					= document.querySelectorAll('.modal__input');

	modalWindow.classList.add('hide');
	modalWindow.classList.remove('show');
	document.body.style.overflow = '';
	inputWindow.forEach(item => {
		item.value = '';
	});
}

function modals(modalData ,modalSelector, modalSetTime) {
	// MODALS

	const modalTrigger				= document.querySelectorAll(modalData),
			modalWindow					= document.querySelector(modalSelector);



	modalTrigger.forEach(item => {
		item.addEventListener('click', () => modalOpen(modalSelector, modalSetTime));
	});

	modalWindow.addEventListener('click', (e)=> {
		if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
			modalClose(modalSelector);
		}
	});

	document.addEventListener('keydown', (e)=> {
		if (modalWindow.classList.contains('show') && e.code === 'Escape') {
			modalClose(modalSelector);
		}
	});


	function modalOpenByScrollToBottom() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			modalOpen(modalSelector, modalSetTime);
			window.removeEventListener('scroll', modalOpenByScrollToBottom);
		}
	}

	window.addEventListener('scroll', modalOpenByScrollToBottom);
}

export default modals;
export {modalOpen, modalClose};