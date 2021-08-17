function timer(id, deadLine) {
	// TIMER

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

	setClock(id , deadLine);
}

export default timer;