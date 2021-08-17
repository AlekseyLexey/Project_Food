import {modalOpen, modalClose} from './modals';

function forms(modalSetTime, processingPostData) {
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
		modalOpen('.modal', modalSetTime);

		const resultMessage			= document.createElement('div');
		resultMessage.classList.add('modal__dialog');
		resultMessage.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
		document.querySelector('.modal').append(resultMessage);
		setTimeout(()=> {
			resultMessage.remove();
			prevModalDiallog.classList.add('show');
			prevModalDiallog.classList.remove('hide');
			modalClose('.modal');
		}, 4000);
	}
}

export default forms;