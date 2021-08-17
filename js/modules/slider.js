function slider({slider, nextBtn, prevBtn, allSlide, currentCounter, totalCounter, inner, wrapper}) {
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

	// Slider + Dotts

	const sliderAll					= document.querySelector(slider),
			prevButton					= document.querySelector(prevBtn),
			nextButton					= document.querySelector(nextBtn),
			slides						= document.querySelectorAll(allSlide),
			currentSlide				= document.querySelector(currentCounter),
			totalSlides					= document.querySelector(totalCounter),
			sliderInner					= document.querySelector(inner),
			sliderWrapper				= document.querySelector(wrapper),
			width							= window.getComputedStyle(sliderWrapper).width;

	let slideIndex						= 1,
		 ofsset							= 0;

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
	sliderAll.style.position = 'relative';

	const dotts							= document.createElement('ol'),
			dottsArray					= [];

	dotts.classList.add('carousel-indicators');
	sliderAll.append(dotts);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-dot-id', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = '1';
		}
		dotts.append(dot);
		dottsArray.push(dot);
	}

	slides.forEach(item => {
		item.style.width = width;
	});

	function dottsOpacity(array) {
		array.forEach(dot => dot.style.opacity = '.5');
		array[slideIndex - 1].style.opacity = '1';
	}

	function currentZeroSlide(current) {
		if (slideIndex < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function sliderTransform(elem) {
		elem.style.transform = `translateX(-${ofsset}px)`;
	}

	function translationIntoNumber(string) {
		return +string.replace(/\D/g, '');
	}

	nextButton.addEventListener('click', ()=> {
		
		if (ofsset == translationIntoNumber(width) * (slides.length - 1)) {
			ofsset = 0;
			slideIndex = 1;
		} else {
			ofsset += translationIntoNumber(width);
			slideIndex++;
		}

		currentZeroSlide(currentSlide);
		
		sliderTransform(sliderInner);

		dottsOpacity(dottsArray);
	});

	prevButton.addEventListener('click', ()=> {

		if (ofsset == 0) {
			ofsset = translationIntoNumber(width) * (slides.length - 1);
			slideIndex = slides.length;
		} else {
			ofsset -= translationIntoNumber(width);
			slideIndex--;
		}

		currentZeroSlide(currentSlide);
		
		sliderTransform(sliderInner);

		dottsOpacity(dottsArray);
	});

	dottsArray.forEach(dot => {
		dot.addEventListener('click', (e)=> {
			const slideTo = e.target.getAttribute('data-dot-id');

			slideIndex = slideTo;

			ofsset = translationIntoNumber(width) * (slideTo - 1);
			sliderTransform(sliderInner);

			currentZeroSlide(currentSlide);

			dottsOpacity(dottsArray);
		});
	});
}

export default slider;